import { Link } from "react-router";
import { Separator } from "../components/ui/separator";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "./ui/navigation-menu";
import { cn } from "~/lib/utils";

const menus = [
  {
    name: "Applauses",
    to: "/applauses",
    items: [
      {
        name: "Leaderboard",
        description: "Top applauded good deeds this week",
        to: "/applauses/leaderboard",
      },
      {
        name: "Categories",
        description: "Explore good deeds by category",
        to: "/applauses/categories",
      },
      {
        name: "Search",
        description: "Search applauses and good deeds",
        to: "/applauses/search",
      },
      {
        name: "Post a Good Deed",
        description: "Share a good deed to inspire others",
        to: "/applauses/submit",
      },
      {
        name: "Boost / Promote",
        description: "Highlight a good deed to reach more people",
        to: "/applauses/promote",
      },
    ],
  },
  {
    name: "Donations",
    to: "/donations",
    items: [
      {
        name: "Give Now",
        description: "Donate to support someone’s good deed",
        to: "/donations/give",
      },
      {
        name: "Campaigns",
        description: "Browse active giving campaigns",
        to: "/donations/campaigns",
      },
      {
        name: "Top Givers",
        description: "See the most generous supporters",
        to: "/donations/leaderboard",
      },
      {
        name: "My Giving",
        description: "Track your donations and receipts",
        to: "/donations/me",
      },
      {
        name: "Start a Campaign",
        description: "Create a donation goal around a good deed",
        to: "/donations/create",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "See all good deeds and applause",
        to: "/community",
      },
      {
        name: "Top",
        description: "Most applauded posts",
        to: "/community?sort=top",
      },
      {
        name: "New",
        description: "Latest good deeds shared",
        to: "/community?sort=new",
      },
      {
        name: "Create",
        description: "Share your good deed",
        to: "/community/create",
      },
    ],
  },
  {
    name: "Challenges",
    to: "/challenges",
    items: [
      {
        name: "All Challenges",
        description: "Join kindness challenges",
        to: "/challenges",
      },
      {
        name: "Weekly Challenge",
        description: "This week’s mission for doing good",
        to: "/challenges/weekly",
      },
      {
        name: "Create a Challenge",
        description: "Start a challenge for your community",
        to: "/challenges/create",
      },
    ],
  },
  {
    name: "IdeasGPT",
    to: "/ideas",
  },
  {
    name: "Groups",
    to: "/groups",
    items: [
      {
        name: "All Groups",
        description: "Find groups to do good together",
        to: "/groups",
      },
      {
        name: "Create a Group",
        description: "Make a group for your friends or team",
        to: "/groups/create",
      },
    ],
  },
];


export default function Navigation() {
  return (
    <nav className="flex px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tighter text-lg">
          wemake
        </Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[600px] font-light gap-3 p-4 grid-cols-2">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn([
                              "select-none rounded-md transition-colors focus:bg-accent  hover:bg-accent",
                              (item.to === "/applauses/promote" ||
                                item.to === "/donations/create") &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                            ])}
                          >
                            <NavigationMenuLink>
                              <Link
                                className="p-3 space-y-1 block leading-none no-underline outline-none"
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
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </nav>
  );
}