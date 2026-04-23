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
    route("submit", "features/applauses/pages/submit-applause-page.tsx"),
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
  ...prefix("ideas", [
    index("features/ideas/pages/ideas-page.tsx"),
    route(":ideaId", "features/ideas/pages/idea-page.tsx"),
  ]),
  ...prefix("challenges", [
    index("features/challenges/pages/challenges-page.tsx"),
    route(":donaId", "features/challenges/pages/challenge-page.tsx"),
    route("submit", "features/challenges/pages/submit-challenges-page.tsx"),
  ]),
  ...prefix("auth", [
    layout("features/auth/layouts/auth-layout.tsx", [
      route("login", "features/auth/pages/login-page.tsx"),
      route("join", "features/auth/pages/join-page.tsx"),
      ...prefix("otp", [
        route("start", "features/auth/pages/otp-start-page.tsx"),
        route("complete", "features/auth/pages/otp-complete-page.tsx"),
      ]),
      ...prefix("social/:provider", [
        route("start", "features/auth/pages/social-start-page.tsx"),
        route("complete", "features/auth/pages/social-complete-page.tsx"),
      ]),
    ]),
  ]),
  ...prefix("community", [
    index("features/community/pages/community-page.tsx"),
    route(":postId", "features/community/pages/post-page.tsx"),
    route("submit", "features/community/pages/submit-post-page.tsx"),
  ]),
  ...prefix("teams", [
    index("features/teams/pages/teams-page.tsx"),
    route(":teamId", "features/teams/pages/team-page.tsx"),
    route("submit", "features/teams/pages/submit-team-page.tsx"),
  ]),
  ...prefix("my", [
    ...prefix("dashboard", [
      index("features/users/pages/dashboard-page.tsx"),
      route("ideas", "features/users/pages/dashboard-ideas-page.tsx"),
      route(
        "products/:productId",
        "features/users/pages/dashboard-product-page.tsx",
      ),
    ]),
    route("profile", "features/users/pages/my-profile-page.tsx"),
    route("settings", "features/users/pages/settings-page.tsx"),
    route("notifications", "features/users/pages/notifications-page.tsx"),
    ...prefix("messages", [
      index("features/users/pages/messages-page.tsx"),
      route(":messageId", "features/users/pages/message-page.tsx"),
    ]),
  ]),
  layout("features/users/layouts/profile-layout.tsx", [
    ...prefix("users/:username", [
      index("features/users/pages/profile-page.tsx"),
      route("applauses", "features/users/pages/profile-applauses-page.tsx"),
      route("posts", "features/users/pages/profile-posts-page.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
