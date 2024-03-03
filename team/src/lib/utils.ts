export function createNameFromEmail(email: string): {
    username: string;
    name: string;
} {
    const [username] = email.split("@");
    const name = username.charAt(0).toUpperCase() + username.slice(1);

    return {
        username,
        name,
    };
}
