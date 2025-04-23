"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ArrowLeft, FlameIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

const OfferLetterLayout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();

  const pathSegments = pathname.split("/").filter(Boolean);

  const mappingLinks = pathSegments.map((item, index) => {
    const isLast = index === pathSegments.length - 1;
    const href = "/" + pathSegments.slice(0, index + 1).join("/");

    return (
      <React.Fragment key={item}>
        <BreadcrumbSeparator>/</BreadcrumbSeparator>
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{item.replace("-", " ")}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink href={href}>
              {item.replace("-", " ")}
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  });

  return (
    <div className="space-y-12 min-h-[500px] grid place-content-center">
      <Breadcrumb>
        <BreadcrumbList className="text-xs uppercase">
          <BreadcrumbItem>
            <BreadcrumbLink
              className="flex gap-1 items-center"
              onClick={() => router.back()}
            >
              <ArrowLeft size={15} />
              Go back
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator> / </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          {mappingLinks}
        </BreadcrumbList>
      </Breadcrumb>
      <div className="gap-0 p-0 [&>button:last-child]:text-white space-y-12">
        <div>
          <small className="text-xs uppercase opacity-70 flex gap-1">
            <FlameIcon size={15} />
            Simplify Hiring
          </small>
          <h4 className="text-lg font-semibold my-2">
            Send offer letters at lightning speed.
          </h4>
          <p className="opacity-50 text-sm">
            Automate your offer letter process and get new hires on board faster
            than ever. No more delays, paperwork hassles, or confusion — just
            smooth, professional communication that makes a strong first
            impression.
          </p>
        </div>

        <div className="">{children}</div>
      </div>
    </div>
  );
};

export default OfferLetterLayout;
