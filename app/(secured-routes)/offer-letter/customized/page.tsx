"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ArrowRightIcon, CheckIcon, CopyIcon } from "lucide-react";
import { useId, useState } from "react";

const Customized = () => {
  const id = useId();
  const [loading, setLoading] = useState(false);
  const [sendNew, setSendNew] = useState(false);
  const [copied, setCopied] = useState<boolean>(false);
  const email = "kalyanyama@gmail.com";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500); // Reset after 1.5s
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-12">
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="flex items-center gap-2 cursor-pointer border w-fit py-2 px-4 rounded-full"
              onClick={handleCopy}
            >
              <span>{email}</span>
              <Button
                variant="outline"
                size="icon"
                className="relative disabled:opacity-100"
                aria-label={copied ? "Copied" : "Copy to clipboard"}
                disabled={copied}
              >
                <div
                  className={cn(
                    "transition-all",
                    copied ? "scale-100 opacity-100" : "scale-0 opacity-0"
                  )}
                >
                  <CheckIcon
                    className="stroke-emerald-500"
                    size={16}
                    aria-hidden="true"
                  />
                </div>
                <div
                  className={cn(
                    "absolute transition-all",
                    copied ? "scale-0 opacity-0" : "scale-100 opacity-100"
                  )}
                >
                  <CopyIcon size={16} aria-hidden="true" />
                </div>
              </Button>
            </div>
          </TooltipTrigger>
          <TooltipContent className="px-2 py-1 text-xs">
            Click to copy
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <div className="group relative">
        <label
          htmlFor={id}
          className="absolute left-1 top-0 z-10 -translate-y-1/2 bg-background px-2 text-xs font-medium"
        >
          Enter Custom Document ID
        </label>
        <Input id={id} className="h-10" placeholder="Enter document ID" />
        <small className="text-xs text-muted-foreground">
          Note: Ensure the field names in your document match the input labels
          below.
        </small>
      </div>

      <div className="space-y-4">
        <p className="uppercase text-xs opacity-50">
          Enter field details here.
        </p>
        <div className="mt-2">
          <Label htmlFor={`${id}-fullname`}>Full name</Label>
          <Input
            id={`${id}-fullname`}
            placeholder="Kalyan yama."
            required
            className="mt-2"
          />
        </div>
        <div className="mt-2">
          <Label htmlFor={`${id}-annual-package`}>
            Annual Compensation (INR)
          </Label>
          <div className="flex mt-2 rounded-md shadow-xs">
            <span className="inline-flex items-center rounded-s-md border bg-background px-3 text-sm text-muted-foreground">
              ₹
            </span>
            <Input
              id={`${id}-annual-package`}
              className="-ms-px rounded-s-none shadow-none"
              placeholder="e.g., 500000"
              type="number"
              required
            />
          </div>
        </div>

        <div className="mt-2">
          <Label htmlFor={`${id}-address`}>Work Location / Address</Label>
          <Textarea
            id={`${id}-address`}
            placeholder="Enter the official work location"
            required
            className="mt-2"
          />
        </div>
        <div className="sm:text-end">
          <Button variant={"link"} className="p-0">
            Add field ?
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
        <Button variant="secondary" type="button">
          Cancel
        </Button>
        {sendNew ? (
          <Button onClick={clearAndCreateNew}>
            Clear & Create new
            <ArrowRightIcon
              className="-me-1 ml-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Button>
        ) : (
          <Button type="submit">
            {loading ? "Loading..." : "Generate Offer Letter"}
            <ArrowRightIcon
              className="-me-1 ml-2 opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </Button>
        )}
      </div>
    </div>
  );
};

export default Customized;
