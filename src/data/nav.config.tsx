import {
  HomeIcon,
  Contact,
  NotebookIcon,
  UsersRound,
  Calendar,
  BookUser,
} from "lucide-react";

export const navItems = [
  {
    id: 1,
    link: "/",
    icon: <HomeIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    name: "Home",
  },
  {
    id: 2,
    link: "/about",
    icon: <BookUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    name: "About",
  },
  {
    id: 3,
    link: "/events",
    icon: <Calendar className="h-4 w-4 text-neutral-500 dark:text-white" />,
    name: "Events",
  },
  {
    id: 4,
    link: "/blogs",
    icon: <NotebookIcon className="h-4 w-4 text-neutral-500 dark:text-white" />,
    name: "Blogs",
  },
  {
    id: 5,
    link: "/Contact",
    icon: <Contact className="h-4 w-4 text-neutral-500 dark:text-white" />,
    name: "Contact Us",
  },
  {
    id: 6,
    link: "/join",
    icon: <UsersRound className="h-4 w-4 text-neutral-500 dark:text-white" />,
    name: "Join Us",
  },
];
