export type Sheet = {
  num: string;
  title: string;
  href: string;
};

export const sheets: Sheet[] = [
  { num: "T-01", title: "Title Sheet", href: "/#t-01" },
  { num: "A-01", title: "About",       href: "/#a-01" },
  { num: "C-01", title: "Contact",     href: "/#c-01" },
  { num: "G-01", title: "Gallery",     href: "/gallery" },
];
