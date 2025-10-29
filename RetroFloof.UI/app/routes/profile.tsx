import type { UserProfile, UserRecentlyPlayedGames } from "@retroachievements/api";
import React, { useEffect, useState } from "react";
import { rCheevosService } from "~/services/rcheevos/rcheevos.service";
import { userService } from "~/services/user/user.service";

const Profile: React.FC = () => {

    const [userProfile, setUserProfile] = useState<UserProfile | undefined>(undefined);
    const [recentlyPlayed, setRecentlyPlayed] = useState<UserRecentlyPlayedGames | undefined>(undefined);

    useEffect(() => {
        console.log("Fetching user profile and recently played games...");
        rCheevosService.getUserInfo().then(profile => {
            setUserProfile(profile);
        });
        rCheevosService.recentlyPlayedGames().then((games) => {
            setRecentlyPlayed(games);
        });
    }, [userService.username]);

    return (
        <div>
            <h1>Hello {userProfile?.user}</h1>
            <p>Welcome to your profile page.</p>
            { String(userProfile) }
        </div>
    );
};

export default Profile;