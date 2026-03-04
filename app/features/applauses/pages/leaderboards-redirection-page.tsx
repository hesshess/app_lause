import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboards-redirection-page";
import { redirect } from "react-router";

export function loader({params, request}: Route.LoaderArgs){
    const {period} = params;
    let url: string;
    const today = DateTime.now().setZone("Asia/Seoul");
    if(period === "daily"){
        url = `/applauses/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
    } else if(period === "weekly"){ 
        url = `/applauses/leaderboards/weekly/${today.year}/${today.weekNumber}`;
    } else if(period === "monthly"){
        url = `/applauses/leaderboards/monthly/${today.year}/${today.month}`;
    } else if(period === "yearly"){
        url = `/applauses/leaderboards/yearly/${today.year}`
    } else {
        return new Response("Not Found", { status:404})
    }
    
    return redirect(url);
}