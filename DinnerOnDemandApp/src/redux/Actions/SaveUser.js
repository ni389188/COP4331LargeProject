export const SaveUser = (user) => (
{
    type: "SAVE_USER",
    user:
    {
        favorites: user.favorite,
        name: user.name,
        email: user.email,
    }
});