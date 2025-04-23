export const SITE_INFORMATION = {
  name: "HireWolf",
  suffix: "in",
  logo: "/logo.svg",
};

export const DOMAIN_INFORMATION = {
  domain:
    SITE_INFORMATION.name.replace(" ", "").toLowerCase() +
    "." +
    SITE_INFORMATION.suffix,
  url: "https://" + SITE_INFORMATION.name.replace(" ", "").toLowerCase(),
};

export const CONTACT_INFORMATION = {
  email: "hello@" + DOMAIN_INFORMATION.domain,
  mobile: "+919550049382",
};
