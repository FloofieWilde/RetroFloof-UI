import type { UserProfile, UserRecentlyPlayedGames } from "@retroachievements/api";
import React, { useEffect, useState } from "react";
import { rCheevosService } from "~/services/rcheevos/rcheevos.service";
import type { Route } from "../+types/root";
import ProfileBanner from "~/components/profile/profile-banner";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "Profile - Retrofloof Alpha" },
    { name: "description", content: "Welcome to your future emulation software!" },
  ];
}


export async function loader({ params }: Route.LoaderArgs) {
  let userInfo = await rCheevosService.getUserInfo();
  let recentlyPlayed = await rCheevosService.recentlyPlayedGames();
  return { userInfo, recentlyPlayed };
}

interface ProfileProps {
    loaderData: {
        userInfo: UserProfile;
        recentlyPlayed: UserRecentlyPlayedGames;
    };
}

export default function Profile({ loaderData }: ProfileProps) {
    const [userProfile, setUserProfile] = useState<UserProfile | undefined>(loaderData.userInfo);
    const [recentGames, setRecentGames] = useState<UserRecentlyPlayedGames | undefined>(loaderData.recentlyPlayed);

    return (
        <div>
            <h1>Hello {userProfile?.user}</h1>
            <p>Welcome to your profile page.</p>
            <ProfileBanner profile={userProfile!} />
            { JSON.stringify(userProfile, null, 2) }
            { JSON.stringify(recentGames, null, 2) }
        </div>
    );
}