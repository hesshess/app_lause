import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/home-page.tsx"),
  ...prefix("applauses", [
    index("features/applauses/pages/applause-page.tsx"),
    ...prefix("leaderboards", [
      index("features/applauses/pages/leaderboard-page.tsx"),
      route(
        "yearly/:year",
        "features/applauses/pages/yearly-leaderboard-page.tsx",
      ),
      route(
        "monthly/:year/:month",
        "features/applauses/pages/monthly-leaderboard-page.tsx",
      ),
      route(
        "daily/:year/:month/:day",
        "features/applauses/pages/daily-leaderboard-page.tsx",
      ),
      route(
        "weekly/:year/:week",
        "features/applauses/pages/weekly-leaderboard-page.tsx",
      ),
      route(
        ":period",
        "features/applauses/pages/leaderboards-redirection-page.tsx",
      ),
    ]),
    ...prefix("categories", [
      index("features/applauses/pages/categories-page.tsx"),
      route(":category", "features/applauses/pages/category-page.tsx"),
    ]),
    route("search", "features/applauses/pages/search-page.tsx"),
    route("submit", "features/applauses/pages/submit-page.tsx"),
    route("promote", "features/applauses/pages/promote-page.tsx"),
    ...prefix(":applauseId", [
      index("features/applauses/pages/applause-redirect-page.tsx"),
      layout("features/applauses/layouts/applause-overview-layout.tsx", [
        route(
          "overview",
          "features/applauses/pages/applause-overview-page.tsx",
        ),
        ...prefix("praises", [
          index("features/applauses/pages/applause-praises-page.tsx"),
        ]),
      ]),
    ]),
  ]),
] satisfies RouteConfig;
