type NavigationItem = {
  id: string;
  link: string;
  icon?: string;
  newTab?: boolean;
  highlight?: boolean;
};

export const NavigationItems: NavigationItem[] = [
  {
    id: "home",
    link: "/",
  },
  {
    id: "team",
    link: "/team",
    icon: "people",
  },
  {
    id: "partners",
    link: "/partners",
    icon: "partners",
  },
  {
    id: "events",
    link: "/events",
    icon: "calendar",
  },
  {
    id: "jobs",
    link: "/jobs",
    icon: "job",
  },
  // {
  //   id: "store",
  //   link: "/store",
  //   icon: "shop",
  // },
  {
    id: "community",
    link: "/community",
    icon: "community",
  },
  {
    id: "collaborate",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScCZ0M7fZG-joi_pRDO-UAldNUxyR5fO_0bMcKLcummlf1FEg/viewform",
    icon: "collaborate",
    newTab: true,
  },
  // {
  //   id: "committee",
  //   link: "https://forms.gle/iZnZXsHUYZYypJqv5",
  //   icon: "committee",
  //   newTab: true,
  //   highlight: true,
  // },
  {
    id: "join",
    link: "https://docs.google.com/forms/d/e/1FAIpQLScALDHl6vfTgpQWs0GaherrJZbIRfrZOFSzg93qSx9fGqnViQ/viewform",
    icon: "register",
    newTab: true,
  },
];

export const locales = [
  {
    id: "en",
    name: "EN",
  },
  {
    id: "zh",
    name: "中文",
  },
  {
    id: "bm",
    name: "BM",
  },
];
