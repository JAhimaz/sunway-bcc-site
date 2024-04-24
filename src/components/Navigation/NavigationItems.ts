type NavigationItem = {
  id: string,
  title?: string,
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
    title: "The Team",
    link: "/our-team",
    icon: "people",
  },
  {
    id: "events",
    title: "Events",
    link: "/events",
    icon: "calendar",
  },
  {
    id: "join",
    title: "Join the Club",
    link: "/registration",
    icon: "register",
  },
]