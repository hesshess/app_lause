import { Link } from "react-router";
import { Separator } from "../components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { cn } from "~/lib/utils";
import { Button, buttonVariants } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BarChartIcon,
  BellIcon,
  LogOutIcon,
  MenuIcon,
  MessageCircleIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";

const menus = [
  {
    name: "Applauses",
    to: "/applauses",
    items: [
      {
        name: "Leaderboards",
        description: "See the most recognized habits and growth actions",
        to: "/applauses/leaderboards",
      },
      {
        name: "Categories",
        description: "Explore actions by growth category",
        to: "/applauses/categories",
      },
      {
        name: "Search",
        description: "Search habits, routines, and self-growth actions",
        to: "/applauses/search",
      },
      {
        name: "Share an Action",
        description: "Share a habit or action that helped you grow",
        to: "/applauses/submit",
      },
      {
        name: "Promote Your Progress",
        description: "Highlight your action to inspire others",
        to: "/applauses/promote",
      },
    ],
  },
  {
    name: "Challenges",
    to: "/challenges",
    items: [
      {
        name: "Explore",
        description: "Join challenges designed for consistency and growth",
        to: "/challenges",
      },
      {
        name: "Create a Challenge",
        description: "Start a challenge around a growth goal",
        to: "/challenges/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See reflections, wins, and growth stories",
        to: "/community",
      },
      {
        name: "Top",
        description: "Most applauded posts",
        to: "/community?sort=top",
      },
      {
        name: "New",
        description: "Latest posts on habits and self-growth",
        to: "/community?sort=new",
      },
      {
        name: "Create",
        description: "Share your progress or reflection",
        to: "/community/submit",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "Find teams focused on growth and accountability",
        to: "/teams",
      },
      {
        name: "Create a Team",
        description: "Start a team around a shared growth goal",
        to: "/teams/submit",
      },
    ],
  },
];

interface NavigationProps {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  username?: string;
  avatar?: string | null;
  name?: string;
}

function MobileNavigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  name,
}: NavigationProps) {
  const accountLinks = [
    { name: "Dashboard", to: "/my/dashboard" },
    { name: "Profile", to: "/my/profile" },
    {
      name: hasNotifications ? "Notifications •" : "Notifications",
      to: "/my/notifications",
    },
    {
      name: hasMessages ? "Messages •" : "Messages",
      to: "/my/messages",
    },
    { name: "Settings", to: "/my/settings" },
    { name: "Logout", to: "/auth/logout" },
  ];

  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button size="icon" variant="ghost">
            <MenuIcon aria-hidden="true" />
            <span className="sr-only">Open navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="w-[min(22rem,calc(100%-2rem))] gap-0 overflow-y-auto"
        >
          <SheetHeader className="border-b pr-12">
            <SheetTitle>Explore app_lause</SheetTitle>
            <SheetDescription>
              Discover actions, ideas, challenges, and teams.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-6 px-4 py-6">
            {menus.map((menu) => (
              <section key={menu.name} className="space-y-2">
                <SheetClose asChild>
                  <Link
                    to={menu.to}
                    className="block rounded-md px-3 py-2 font-semibold hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {menu.name}
                  </Link>
                </SheetClose>
                {menu.items ? (
                  <ul className="space-y-1 border-l pl-3">
                    {menu.items.map((item) => (
                      <li key={item.name}>
                        <SheetClose asChild>
                          <Link
                            to={item.to}
                            className="block rounded-md px-3 py-2 hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <span className="block text-sm font-medium">
                              {item.name}
                            </span>
                            <span className="mt-1 block text-xs leading-5 text-muted-foreground">
                              {item.description}
                            </span>
                          </Link>
                        </SheetClose>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <SheetFooter className="border-t">
            {isLoggedIn ? (
              <div className="space-y-3">
                {name || username ? (
                  <p className="px-1 text-sm text-muted-foreground">
                    Signed in as {name ?? `@${username}`}
                  </p>
                ) : null}
                <div className="grid grid-cols-2 gap-2">
                  {accountLinks.map((item) => (
                    <SheetClose key={item.name} asChild>
                      <Link
                        to={item.to}
                        className={buttonVariants({ variant: "outline" })}
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <SheetClose asChild>
                  <Link
                    to="/auth/login"
                    className={buttonVariants({ variant: "outline" })}
                  >
                    Login
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/auth/join"
                    className={buttonVariants({ variant: "default" })}
                  >
                    Join
                  </Link>
                </SheetClose>
              </div>
            )}
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  avatar,
  name,
}: NavigationProps) {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 flex h-16 items-center justify-between bg-background/80 px-5 backdrop-blur sm:px-8 lg:px-20">
      <div className="flex min-w-0 items-center">
        <Link
          to="/"
          className="shrink-0 whitespace-nowrap text-lg font-bold tracking-tighter"
        >
          👏 app_lause
        </Link>
        <div className="hidden items-center lg:flex">
          <Separator orientation="vertical" className="mx-4 h-6" />
          <NavigationMenu>
            <NavigationMenuList>
              {menus.map((menu) => (
                <NavigationMenuItem key={menu.name}>
                  {menu.items ? (
                    <>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-150 grid-cols-2 gap-3 p-4 font-light">
                          {menu.items.map((item) => (
                            <NavigationMenuItem
                              key={item.name}
                              className={cn([
                                "select-none rounded-md transition-colors hover:bg-accent focus:bg-accent",
                                (item.to === "/applauses/promote" ||
                                  item.to === "/challenges/create") &&
                                  "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              ])}
                            >
                              <NavigationMenuLink asChild>
                                <Link
                                  className="block space-y-1 p-3 leading-none no-underline outline-none"
                                  to={item.to}
                                >
                                  <span className="text-sm font-medium leading-none">
                                    {item.name}
                                  </span>
                                  <p className="text-sm leading-snug text-muted-foreground">
                                    {item.description}
                                  </p>
                                </Link>
                              </NavigationMenuLink>
                            </NavigationMenuItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link
                      className={navigationMenuTriggerStyle()}
                      to={menu.to}
                    >
                      {menu.name}
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      {isLoggedIn ? (
        <div className="hidden items-center gap-2 lg:flex">
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/notifications">
              <BellIcon className="size-4" />
              <span className="sr-only">Notifications</span>
              {hasNotifications && (
                <div
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full"
                />
              )}
            </Link>
          </Button>
          <Button size="icon" variant="ghost" asChild className="relative">
            <Link to="/my/messages">
              <MessageCircleIcon className="size-4" />
              <span className="sr-only">Messages</span>
              {hasMessages && (
                <div
                  aria-hidden="true"
                  className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full"
                />
              )}
            </Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="rounded-full">
                <Avatar>
                  {avatar ? (
                    <AvatarImage src={avatar} alt="" />
                  ) : (
                    <AvatarFallback>{name?.[0]}</AvatarFallback>
                  )}
                </Avatar>
                <span className="sr-only">Open account menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel className="flex flex-col">
                <span className="font-medium">{name}</span>
                <span className="text-xs text-muted-foreground">
                  @{username}
                </span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/dashboard">
                    <BarChartIcon className="size-4 mr-2" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/auth/logout">
                  <LogOutIcon className="size-4 mr-2" />
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <div className="hidden items-center gap-4 lg:flex">
          <Button asChild variant="secondary">
            <Link to="/auth/login">Login</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/join">Join</Link>
          </Button>
        </div>
      )}
      <MobileNavigation
        isLoggedIn={isLoggedIn}
        hasNotifications={hasNotifications}
        hasMessages={hasMessages}
        username={username}
        avatar={avatar}
        name={name}
      />
    </nav>
  );
}
