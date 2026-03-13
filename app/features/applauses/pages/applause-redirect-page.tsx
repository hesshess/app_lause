import { redirect } from "react-router";
import type { Route } from "./+types/applause-redirect-page";

export const loader = ({params}: Route.LoaderArgs)=>{
    return redirect(`/applauses/${params.applauseId}/overview`);
}