import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/settings-page";
import SelectPair from "~/common/components/select-pair";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
import { useState, type ChangeEvent } from "react";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserById } from "../queries";
import { updateUser, updateUserAvatar } from "../mutations";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "~/common/components/ui/alert";
import z from "zod";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Settings | app_lause" },
    {
      name: "description",
      content: "Manage your self-growth profile and preferences",
    },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const user = await getUserById(client, { id: userId });
  return { user };
};

const formSchema = z.object({
  name: z.string().min(3),
  role: z.string(),
  headline: z.string().optional().default(""),
  bio: z.string().optional().default(""),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const formData = await request.formData();
  const avatar = formData.get("avatar");
  if (avatar && avatar instanceof File) {
    if (avatar.size <= 2097152 && avatar.type.startsWith("image/")) {
      const { data, error } = await client.storage
        .from("avatars")
        .upload(`${userId}/${Date.now()}`, avatar, {
          contentType: avatar.type,
          upsert: false,
        });
      if (error) {
        console.log(error);
        return { formErrors: { avatar: ["Failed to upload avatar"] } };
      }
      const {
        data: { publicUrl },
      } = await client.storage.from("avatars").getPublicUrl(data.path);
      await updateUserAvatar(client, {
        id: userId,
        avatarUrl: publicUrl,
      });
    } else {
      return { formErrors: { avatar: ["Invalid file size or type"] } };
    }
  } else {
    const { success, error, data } = formSchema.safeParse(
      Object.fromEntries(formData),
    );
    if (!success) {
      return { formErrors: error.flatten().fieldErrors };
    }

    const { name, role, headline, bio } = data;
    await updateUser(client, {
      id: userId,
      name,
      role: role as
        | "habit-builder"
        | "mindful-learner"
        | "accountability-partner"
        | "growth-coach"
        | "reflective-writer"
        | "other",
      headline,
      bio,
    });
    return {
      ok: true,
    };
  }
};

export default function SettingsPage({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const [avatar, setAvatar] = useState<string | null>(loaderData.user.avatar);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      setAvatar(URL.createObjectURL(file));
    }
  };
  return (
    <div className="space-y-20 ">
      <div className="grid grid-cols-1 gap-10 xl:grid-cols-6 xl:gap-20">
        <div className="flex flex-col gap-10 xl:col-span-4">
          {actionData?.ok ? (
            <Alert>
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your profile has been updated.
              </AlertDescription>
            </Alert>
          ) : null}
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold">Edit growth profile</h2>
            <p className="text-muted-foreground">
              Help others understand what you are building, practicing, and
              improving.
            </p>
          </div>
          <Form
            className="flex w-full flex-col gap-5 lg:w-2/3 xl:w-1/2"
            method="post"
          >
            <InputPair
              label="Name"
              description="Your public display name"
              required
              id="name"
              defaultValue={loaderData.user.name}
              name="name"
              placeholder="i.e Alex Kim"
            />
            {actionData?.formErrors && "name" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.name?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <SelectPair
              label="Growth identity"
              defaultValue={loaderData.user.role}
              description="Choose the identity that best describes your current focus"
              name="role"
              placeholder="Select your growth identity"
              options={[
                { label: "Habit Builder", value: "habit-builder" },
                { label: "Mindful Learner", value: "mindful-learner" },
                {
                  label: "Accountability Partner",
                  value: "accountability-partner",
                },
                { label: "Growth Coach", value: "growth-coach" },
                { label: "Reflective Writer", value: "reflective-writer" },
                { label: "Other", value: "other" },
              ]}
            />
            {actionData?.formErrors && "role" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.role?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Headline"
              description="A short summary of your current growth focus"
              required
              defaultValue={loaderData.user.headline ?? ""}
              id="headline"
              name="headline"
              placeholder="i.e Building calmer mornings and a consistent writing habit."
              textArea
            />
            {actionData?.formErrors && "headline" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.headline?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <InputPair
              label="Bio"
              description="Share your current growth goal or routine"
              required
              id="bio"
              defaultValue={loaderData.user.bio ?? ""}
              name="bio"
              placeholder="i.e I am building a consistent morning routine and practicing weekly reflection."
              textArea
            />
            {actionData?.formErrors && "bio" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors?.bio?.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <Button className="w-full">Save growth profile</Button>
          </Form>
        </div>
        <Form
          className="col-span-2 p-6 rounded-lg border shadow-md"
          method="post"
          encType="multipart/form-data"
        >
          <Label className="flex flex-col gap-1">
            Profile photo
            <small className="text-muted-foreground pb-5">
              This appears on your public growth profile.
            </small>
          </Label>
          <div className="space-y-5">
            <div className="size-32 overflow-hidden rounded-full shadow-xl sm:size-40">
              {avatar ? (
                <img
                  src={avatar}
                  alt="Selected profile preview"
                  className="object-cover w-full h-full"
                />
              ) : null}
            </div>
            <Input
              type="file"
              className="w-full sm:w-1/2"
              onChange={onChange}
              required
              name="avatar"
            />
            {actionData?.formErrors && "avatar" in actionData?.formErrors ? (
              <Alert>
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {actionData.formErrors.avatar.join(", ")}
                </AlertDescription>
              </Alert>
            ) : null}
            <div className="flex flex-col text-xs">
              <span className=" text-muted-foreground">
                Recommended size: 128x128px
              </span>
              <span className=" text-muted-foreground">
                Allowed formats: PNG, JPEG
              </span>
              <span className=" text-muted-foreground">Max file size: 1MB</span>
            </div>
            <Button className="w-full">Update profile photo</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
