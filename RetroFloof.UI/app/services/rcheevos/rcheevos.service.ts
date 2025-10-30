import { buildAuthorization, getUserProfile, getUserRecentlyPlayedGames, type AuthObject } from "@retroachievements/api";
import { userService } from "../user/user.service";

class RCheevosService {
    private authorization: AuthObject | undefined;

    constructor() {
        this.buildAuthorization();
    }

    buildAuthorization() {
        const username = userService.username;
        if (!username) return;
        const webApiKey = import.meta.env.VITE_RETROACHIEVEMENTS_WEBAPIKEY;

        this.authorization = buildAuthorization({ username, webApiKey });
    }

    async getUserInfo() {
        if (!this.authorization) return;

        return await getUserProfile(this.authorization, {
            username: userService.username!,
        });
    }

    async recentlyPlayedGames() {
        if (!this.authorization) return;
        return await getUserRecentlyPlayedGames(this.authorization, {
            username: userService.username!,
        });
    }
}

export const rCheevosService = new RCheevosService();