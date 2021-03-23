const initialState =
{
    user:
    {
        name: "",
        email: "",
        favorites: [],
    }
};

const UserReducer = (state = initialState, action) =>
{
    switch (action.type) {
        case "SAVE_USER": {
            return {
                ...state,
                user: action.user
            }
        }
        default: {
            return state;
        }
    }
}

export default UserReducer;