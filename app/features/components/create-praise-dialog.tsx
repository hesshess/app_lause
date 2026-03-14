import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";

export default function CreatePraiseDialog() {
  const [rating, setRating] = useState<number>(0);
  const [hoveredHeart, setHoveredHeart] = useState<number>(0);
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl">
          Share your praise
        </DialogTitle>
        <DialogDescription>
          Let the person know how their good deed inspired you.
        </DialogDescription>
      </DialogHeader>
      <Form className="space-y-10">
        <div>
          <Label className="flex flex-col gap-1">
            Rating
            <small className="text-muted-foreground">
              How much do you appreciate this good deed?
            </small>
          </Label>
          <div className="flex gap-2 mt-5">
            {[1, 2, 3, 4, 5].map((heart) => (
              <label
                key={heart}
                className="relative"
                onMouseEnter={() => setHoveredHeart(heart)}
                onMouseLeave={() => setHoveredHeart(0)}
              >
                <HeartIcon
                  className="size-5 text-violet-400"
                  fill={
                    hoveredHeart >= heart || rating >= heart ? "currentColor" : "none"
                  }
                />
                <input
                  type="radio"
                  value="heart"
                  name="rating"
                  required
                  className="opacity-0 h-px w-px absolute"
                  onChange={() => setRating(heart)}
                />
              </label>
            ))}
          </div>
        </div>
        <InputPair
          textArea
          label="Praise"
          placeholder="Write a message of appreciation or encouragementd"
          description="Maximum 1000 characters"
        />
        <DialogFooter>
          <Button type="submit">Submit praise</Button>
        </DialogFooter>
      </Form>
    </DialogContent>
  );
}
