"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  ArrowRightIcon,
  Briefcase,
  CalendarIcon,
  FileText,
  GraduationCap,
  LoaderCircleIcon,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { FormEvent, FormEventHandler, useId, useState } from "react";

const offerLetterTemplates = [
  {
    id: "standard-offer",
    title: "Standard Employment Offer",
    description:
      "A formal offer letter for full-time roles detailing responsibilities, compensation, and benefits.",
    icon: FileText,
  },
  {
    id: "internship-offer",
    title: "Internship Offer Letter",
    description:
      "Structured for internship roles, including tenure, stipend (if applicable), and learning objectives.",
    icon: GraduationCap,
  },
  {
    id: "freelance-contract-offer",
    title: "Freelance / Contract Agreement",
    description:
      "Outlines freelance or contractual terms such as compensation, scope of work, and duration.",
    icon: Briefcase,
  },
  {
    id: "startup-style-offer",
    title: "Startup Offer Format",
    description:
      "A flexible format tailored for startups, often including equity, dynamic roles, or hybrid models.",
    icon: Rocket,
  },
];

const OfferLetterPage = () => {
  const id = useId();
  const [fullName, setFullName] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState<Date>();
  const [position, setPosition] = useState("Full-stack Developer");
  const [address, setAddress] = useState("Hyderabad, Telangana.");
  const [salaryPackage, setSalaryPackage] = useState("500000");
  const [isLoading, setIsLoading] = useState(false);
  const [sendNew, setSendNew] = useState(false);

  const handleGenerate: FormEventHandler = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const response = await fetch("/api/generate-doc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: {
          name: fullName,
          position,
          address,
          salaryPackage,
          dateOfJoining,
          company: "Propulsion AI",
        },
        templateID: "1KCY2aaWNDiKPEPhGSC0_hq0NbE2VCEE4sWRlKuj9CrA",
      }),
    });
    if (!response.ok) {
      console.error("Failed to generate document");
      setLoading(false);
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fullName || "Offer-Letter"}.pdf`; // use name input as file name
    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);

    // const { pdf, docLink } = await response.json();

    // // Auto-download PDF
    // const blob = new Blob(
    //   [Uint8Array.from(atob(pdf), (c) => c.charCodeAt(0))],
    //   {
    //     type: "application/pdf",
    //   }
    // );
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement("a");
    // a.href = url;
    // a.download = `${fullName}.pdf`;
    // a.click();
    // URL.revokeObjectURL(url);

    // // You can also show or store the docLink somewhere
    // console.log("View/Edit the Doc:", docLink);

    setIsLoading(false);
    setSendNew(true);
  };

  const clearAndCreateNew = () => {
    setFullName("");
    setSendNew(false);
  };

  return (
    <form className="space-y-12" onSubmit={handleGenerate}>
      <div className="space-y-6">
        <div className="flex sm:justify-between sm:items-center gap-2 flex-col sm:flex-row">
          <h5 className="font-semibold text-base">
            Select an Offer Letter Template
          </h5>
          <Link
            href="/offer-letter/customized"
            className="text-sm text-blue-600 hover:underline"
          >
            Need a customized template with specific fields?
          </Link>
        </div>

        <RadioGroup
          defaultValue={offerLetterTemplates[0].id}
          className="gap-2 pb-6"
        >
          {offerLetterTemplates.map((item) => (
            <div
              key={item.id}
              className="relative flex w-full items-start gap-2 rounded-md border border-input p-4 shadow-xs outline-none data-[state=checked]:border-primary/50"
            >
              <RadioGroupItem
                value={item.id}
                id={`${id}-template`}
                aria-describedby={`${id}-template-desc`}
                className="order-1 after:absolute after:inset-0"
              />
              <div className="flex grow items-start gap-3">
                <item.icon size={16} />
                <div className="grid grow gap-1">
                  <Label htmlFor={`${id}-template`}>{item.title}</Label>
                  <p
                    id={`${id}-template-desc`}
                    className="text-xs text-muted-foreground line-clamp-1"
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex-1">
            <Label htmlFor={`${id}-full-name`}>Candidate Full Name</Label>
            <Input
              id={`${id}-full-name`}
              placeholder="e.g., Kalyan Yama"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div className="flex-1">
            <Label htmlFor={`${id}-joining-date`}>Date of Joining</Label>
            <div className="mt-2 flex rounded-md shadow-xs">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateOfJoining && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateOfJoining
                      ? format(dateOfJoining, "PPP")
                      : "Select a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateOfJoining}
                    onSelect={setDateOfJoining}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
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
              value={salaryPackage}
              onChange={(e) => setSalaryPackage(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-2">
          <Label htmlFor={`${id}-position`}>Job Title</Label>
          <Input
            id={`${id}-position`}
            placeholder="e.g., React.js Developer"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
            className="mt-2"
          />
        </div>

        <div className="mt-2">
          <Label htmlFor={`${id}-address`}>Work Location / Address</Label>
          <Textarea
            id={`${id}-address`}
            placeholder="Enter the official work location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-6">
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
          <Button
            type="submit"
            disabled={isLoading}
            data-loading={isLoading || undefined}
            className="group relative disabled:opacity-100"
          >
            <span className="flex items-center group-data-loading:text-transparent">
              Generate Offer Letter{" "}
              <ArrowRightIcon
                className="-me-1 ml-2 opacity-60 transition-transform group-hover:translate-x-0.5"
                size={16}
                aria-hidden="true"
              />
            </span>

            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <LoaderCircleIcon
                  className="animate-spin"
                  size={16}
                  aria-hidden="true"
                />
              </div>
            )}
          </Button>
        )}
      </div>
    </form>
  );
};

export default OfferLetterPage;
