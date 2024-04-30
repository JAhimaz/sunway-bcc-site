
type NavigationItem = {
  id: string,
  link: string,
  icon?: string,
}

export const NavigationItems = [
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
    id: "join",
    link: "/register",
    icon: "register",
  },
]