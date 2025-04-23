import { SITE_INFORMATION } from "@/siteinformation";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const links = [
    {
      label: "Terms and Conditions",
      link: "/terms-conditions",
    },
    {
      label: "Privacy policy",
      link: "/privacy-policy",
    },
  ];
  return (
    <div className="flex justify-between items-center mt-16 mb-8 pb-5">
      <div>
        <Image src={SITE_INFORMATION.logo} height={25} width={25} alt="Logo" />
      </div>
      <div className="flex flex-wrap gap-4">
        {links.map((item) => (
          <Link
            key={item.label}
            href={item.link}
            className="text-xs opacity-50"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
