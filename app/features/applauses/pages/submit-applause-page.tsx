import { Hero } from "~/common/components/hero";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { useState } from "react";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/submit-applause-page";
import z from "zod";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { createApplause } from "../mutations";
import { getCategories } from "../queries";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Applause | app_lause" },
    { name: "description", content: "Submit your applauses" },
  ];
};

const formSchema = z.object({
  name: z.string().min(1),
  tagline: z.string().min(1),
  url: z.string().min(1),
  description: z.string().min(1),
  category: z.coerce.number(),
  icon: z.instanceof(File).refine((file) => {
    return file.size <= 2097152 && file.type.startsWith("image/");
  }),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const { data, success, error } = formSchema.safeParse(
    Object.fromEntries(formData),
  );
  if (!success) {
    return { formErrors: error.flatten().fieldErrors };
  }
  const { icon, ...rest } = data;
  const { data: uploadData, error: uploadError } = await client.storage
    .from("icons")
    .upload(`${userId}/${Date.now()}`, icon, {
      contentType: icon.type,
      upsert: false,
    });
  if (uploadError) {
    return { formErrors: { icon: ["Failed to upload icon"] } };
  }
  const {
    data: { publicUrl },
  } = await client.storage.from("icons").getPublicUrl(uploadData.path);
  const applauseId = await createApplause(client, {
    name: rest.name,
    tagline: rest.tagline,
    description: rest.description,
    url: rest.url,
    iconUrl: publicUrl,
    categoryId: rest.category,
    userId,
  });
  return redirect(`/applauses/${applauseId}`);
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const categories = await getCategories(client);
  return { categories };
};

export default function SubmitPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      setIcon(URL.createObjectURL(file));
    }
  };
  return (
    <div>
      <Hero
        title="Share Your Action"
        description="Share a habit, action, or routine that helped you grow"
      />
      <Form
        className="mx-auto grid max-w-2xl grid-cols-1 gap-10 lg:grid-cols-2"
        method="post"
        encType="multipart/form-data"
      >
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your applause"
            id="name"
            name="name"
            type="text"
            placeholder="Name of your action or routine"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.name && (
              <p className="text-red-500">{actionData.formErrors.name}</p>
            )}
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise summary of the action you took"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.tagline && (
              <p className="text-red-500">{actionData.formErrors.tagline}</p>
            )}
          <InputPair
            label="URL"
            description="An optional link related to your action"
            id="url"
            name="url"
            required
            type="url"
            placeholder="https://example.com"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.url && (
              <p className="text-red-500">{actionData.formErrors.url}</p>
            )}
          <InputPair
            textArea
            label="Description"
            description="A detailed description of your applause"
            id="description"
            name="description"
            required
            type="text"
            placeholder="A detailed description of your applause"
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.description && (
              <p className="text-red-500">
                {actionData.formErrors.description}
              </p>
            )}
          <SelectPair
            label="Category"
            description="The category of your applause"
            name="category"
            required
            placeholder="Select a category"
            options={loaderData.categories.map((category) => ({
              label: category.name,
              value: category.category_id.toString(),
            }))}
          />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.category && (
              <p className="text-red-500">{actionData.formErrors.category}</p>
            )}
        </div>
        <div className="flex flex-col space-y-3">
          <div className="mb-10 size-32 overflow-hidden rounded-4xl shadow-2xl sm:size-40">
            {icon ? (
              <img src={icon} className="object-cover w-full h-full" />
            ) : null}
          </div>
          <Label className="flex flex-col gap-1">
            Icon
            <small className="text-muted-foreground">
              This is the image shown for your action.
            </small>
          </Label>
          <Input type="file" onChange={onChange} required name="icon" />
          {actionData &&
            "formErrors" in actionData &&
            actionData?.formErrors?.icon && (
              <p className="text-red-500">{actionData.formErrors.icon}</p>
            )}
          <div className="flex flex-col text-xs text-muted-foreground">
            <span>Recomended size: 128x128px</span>
            <span>Allowed formats: PNG, JPEG</span>
            <span>Max file size: 1MB</span>
          </div>
          <Button type="submit" className="w-full sm:w-auto" size="lg">
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
