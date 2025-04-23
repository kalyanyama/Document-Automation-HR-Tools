import Footer from "@/components/structures/footer";
import Header from "@/components/structures/header";
import { Toaster } from "@/components/ui/sonner";
import { ArrowRightIcon } from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function SecuredLayout({ children }) {
  const session = await getServerSession(authOptions);

  // if (!session) {
  //   return redirect("/"); // Redirect to login page
  // }
  return (
    <div>
      <div className="dark bg-muted text-foreground px-4 py-3">
        <p className="flex justify-center text-sm">
          <a href="#" className="group">
            <span className="me-1 text-base leading-none">✨</span>
            Introducing transactional and marketing emails
            <ArrowRightIcon
              className="ms-2 -mt-0.5 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
              size={16}
              aria-hidden="true"
            />
          </a>
        </p>
      </div>
      <div className="space-y-12 px-5 max-w-4xl mx-auto">
        <Header />
        <Toaster />
        <div className="max-w-3xl mx-auto">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
