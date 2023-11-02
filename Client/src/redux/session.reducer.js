const intialState = {
    loggedIn: false,
    profile: undefined,
    loading: true
}

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const LOGIN_SUCESS = 'LOGGIN_SUCCESS';
const LOGOUT_SUCESS = 'LOGOUT_SUCESS';
const SET_SESSION_LOADING = 'SET_SESSION_LOADING';


export const setUserProfile = (profile) => ({
    type: SET_USER_PROFILE,
    profile
});

export const loginSucess = () => ({
    type: LOGIN_SUCESS
});

export const logoutSucess = () => ({
    type: LOGOUT_SUCESS
});

export const setSessionLoading = (loading) => ({
    type: SET_SESSION_LOADING,
    loading
})

export default (session = intialState, action) => {
    switch (action.type) {
        case SET_USER_PROFILE:
            return {
                ...session,
                profile: action.profile
            }
        case LOGIN_SUCESS:
            return {
                ...session,
                loggedIn: true
            }
        case LOGOUT_SUCESS:
            return {
                ...intialState,
            }
        case SET_SESSION_LOADING:
            return {
                ...session,
                loading: action.loading
            }
        default:
            return session
    }
}