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
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import React, { useId, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export const OfferLetter = () => {
  const id = useId();
  const [fullName, setFullname] = useState("");
  const [date, setDate] = React.useState<Date>();
  const [position, setPosition] = useState("Full-stack developer");
  const [address, setAddress] = useState("Hyderabad, Telangana.");
  const [salaryPackage, setSalaryPackage] = useState("500000");

  return (
    <form className="space-y-2">
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex-1 space-y-2">
          <Label htmlFor={`${id}-full-name`}>Full name</Label>
          <Input
            id={`${id}-full-name`}
            placeholder="Kalyan yama."
            defaultValue={fullName}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            required
          />
        </div>
        <div className="flex-1 space-y-2">
          <Label htmlFor={`${id}-dateOfJoining`}>Joining date</Label>
          <div className="flex rounded-md shadow-xs">
            <Popover >
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-annual-package`}>Annual package</Label>
        <div className="flex rounded-md shadow-xs">
          <span className="border-input bg-background text-muted-foreground -z-10 inline-flex items-center rounded-s-md border px-3 text-sm">
            ₹
          </span>
          <Input
            id={`${id}-annual-package`}
            className="-ms-px rounded-s-none shadow-none"
            placeholder="4,50,000, 5,50,000"
            defaultValue={salaryPackage}
            onChange={(e) => setSalaryPackage(e.target.value)}
            type="number"
            required
          />
        </div>
      </div>
      <div className="flex-1 space-y-2">
        <Label htmlFor={`${id}-position`}>Position</Label>
        <Input
          id={`${id}-position`}
          placeholder="React.js, Next.js or Node.js developer..."
          type="text"
          defaultValue={position}
          onChange={(e) => setPosition(e.target.value)}
          required
        />
      </div>

      <div className="*:not-first:mt-2">
        <Label htmlFor={`${id}-address`}>Address</Label>
        <Textarea
          id={`${id}-address`}
          placeholder="Write a few sentences about address"
          aria-describedby={`${id}-description`}
          required
          defaultValue={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <div className="*:not-first:mt-2">
        <Label htmlFor={id}>Choose Document template </Label>
        <Select defaultValue="1">
          <SelectTrigger id={id}>
            <SelectValue placeholder="Select framework" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Offer letters</SelectLabel>
              <SelectItem value="2">Start-Up</SelectItem>
              <SelectItem value="1">MNC</SelectItem>
              <SelectItem value="3">Basic</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button className="w-full mt-4" type="submit">
        Submit
      </Button>
    </form>
  );
};
