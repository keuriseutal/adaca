import { useReducer } from "react";
import axios from 'axios';
import setAuthToken from "../../utils/setAuthToken";
import AuthContext from "./authContext";
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        user: null,
        error: null
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    //Load User
    const loadUser = async() => {
        // @todo - load token into global headers
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const response = await axios.get('/api/auth');
            dispatch({
                type: USER_LOADED,
                payload: response.data
            });
        } catch(error) {
            dispatch({
                type: AUTH_ERROR,
                payload: error.response.data.msg
            });
        }
    };

    //Register User
    const register = async(formData) => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        try {
            const response = await axios.post('/api/users', formData, config);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: response.data
            });
            loadUser();
        } catch(error) {
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.msg
            })
        }
    };

    //Login User
    const login = () => {
        console.log('login');
    };

    //Logout User
    const logout = () => {
        console.log('logout');
    };

    //Clear Errors
    const clearErrors = () => {
        dispatch({
            type: CLEAR_ERRORS
        })
    };

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            loadUser,
            register,
            login,
            logout,
            clearErrors
        }}>
            { props.children }
        </AuthContext.Provider>
    )

}

export default AuthState;