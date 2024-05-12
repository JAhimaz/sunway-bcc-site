
type NavigationItem = {
  id: string,
  link: string,
  icon?: string,
}

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
    id: "events",
    link: "/events",
    icon: "calendar",
  },
  {
    id: "collaborate",
    link: "/collaborate",
    icon: "collaborate",
  },
  {
    id: "join",
    link: "/register",
    icon: "register",
  },
]

export const locales = [
  {
    id: "en",
    name: "EN"
  },
  {
    id: "zh",
    name: "中文"
  }
]