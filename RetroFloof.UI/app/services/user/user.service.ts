class UserService {
    public username: string | null = "floofie";

    setUsername(username: string): void {
        this.username = username;
    }
}

export const userService = new UserService();