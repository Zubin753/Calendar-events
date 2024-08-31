import {authActionsEnum, setAuthAction, setErrorAction, setIsLoadingAction, setUserAction} from "./types";
import {AppDispatch} from "../../index";
import axios from "axios";
import {IUser} from "../../../models/IUser";
import UserService from "../../../api/UserService";

export const AuthActionCreators = {
    setUser: (user: IUser): setUserAction => {
        return {type: authActionsEnum.SET_USER, payload: user}
    },
    setIsAuth: (auth: boolean): setAuthAction => ({type: authActionsEnum.SET_AUTH, payload: auth}),
    setIsLoading: (loading: boolean): setIsLoadingAction => ({type: authActionsEnum.SET_IS_LOADING, payload: loading}),
    setError: (e: string): setErrorAction => ({type: authActionsEnum.SET_ERROR, payload: e}),
    login: (username: string, password: string) => (async (dispatch: AppDispatch)=> {
        try{
            dispatch(AuthActionCreators.setIsLoading(true))
            setTimeout(async () => {
                const response = await UserService.getUsers()
                const mockUser = response.data.find(user => user.username === username && user.password === password)
                if(mockUser){
                    localStorage.setItem('auth', 'true')
                    localStorage.setItem('username', mockUser.username)
                    dispatch(AuthActionCreators.setUser(mockUser))
                    dispatch(AuthActionCreators.setIsAuth(true))

                }
                else{
                    dispatch(AuthActionCreators.setError("Некорректный юзернэйм или пароль"))
                }
                dispatch(AuthActionCreators.setIsLoading(false))
            }, 1000)

        }
        catch (e){
            dispatch(AuthActionCreators.setError("Ошибка при логине"))
        }
    }),
    logout: () => async (dispatch: AppDispatch)=> {
            localStorage.removeItem('auth')
            localStorage.removeItem('username')
            dispatch(AuthActionCreators.setUser({} as IUser))
            dispatch(AuthActionCreators.setIsAuth(false))

    }

}