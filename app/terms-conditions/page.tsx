"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TermsAndConditions() {
  const router = useRouter();

  return (
    <div className="space-y-6 sm:max-w-2xl mx-auto my-12">
      <h3 className="font-bold text-lg">Terms & Conditions</h3>
      <div className="[&_strong]:text-foreground space-y-4 [&_strong]:font-semibold">
        <div className="space-y-4">
          <div className="space-y-1">
            <p>
              <strong>Acceptance of Terms</strong>
            </p>
            <p>
              By accessing and using this website, users agree to comply with
              and be bound by these Terms of Service. Users who do not agree
              with these terms should discontinue use of the website
              immediately.
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>User Account Responsibilities</strong>
            </p>
            <p>
              Users are responsible for maintaining the confidentiality of their
              account credentials. Any activities occurring under a user&lsquo;s
              account are the sole responsibility of the account holder. Users
              must notify the website administrators immediately of any
              unauthorized account access.
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>Content Usage and Restrictions</strong>
            </p>
            <p>
              The website and its original content are protected by intellectual
              property laws. Users may not reproduce, distribute, modify, create
              derivative works, or commercially exploit any content without
              explicit written permission from the website owners.
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>Limitation of Liability</strong>
            </p>
            <p>
              The website provides content &ldquo;as is&ldquo; without any
              warranties. The website owners shall not be liable for direct,
              indirect, incidental, consequential, or punitive damages arising
              from user interactions with the platform.
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>User Conduct Guidelines</strong>
            </p>
            <ul className="list-disc pl-6">
              <li>Not upload harmful or malicious content</li>
              <li>Respect the rights of other users</li>
              <li>Avoid activities that could disrupt website functionality</li>
              <li>Comply with applicable local and international laws</li>
            </ul>
          </div>

          <div className="space-y-1">
            <p>
              <strong>Modifications to Terms</strong>
            </p>
            <p>
              The website reserves the right to modify these terms at any time.
              Continued use of the website after changes constitutes acceptance
              of the new terms.
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>Termination Clause</strong>
            </p>
            <p>
              The website may terminate or suspend user access without prior
              notice for violations of these terms or for any other reason
              deemed appropriate by the administration.
            </p>
          </div>

          <div className="space-y-1">
            <p>
              <strong>Governing Law</strong>
            </p>
            <p>
              These terms are governed by the laws of the jurisdiction where the
              website is primarily operated, without regard to conflict of law
              principles.
            </p>
          </div>
        </div>
      </div>
      <Button
        variant={"link"}
        onClick={() => router.back()}
        className="text-sm underline flex gap-1 items-center"
      >
        <ArrowLeft size={15} />
        Go back
      </Button>
    </div>
  );
}
