import {IUser} from "../../../models/IUser";

export interface authState {
    isAuth: boolean;
    user: IUser;
    isLoading: boolean;
    error: string
}



export enum authActionsEnum{
    SET_AUTH = "SET_AUTH",
    SET_ERROR = "SET_ERROR",
    SET_USER = "SET_USER",
    SET_IS_LOADING = "SET_IS_LOADING",
}
export interface setAuthAction {
    type: authActionsEnum.SET_AUTH;
    payload: boolean
}

export interface setErrorAction {
    type: authActionsEnum.SET_ERROR;
    payload: string
}

export interface setUserAction {
    type: authActionsEnum.SET_USER;
    payload: IUser
}

export interface setIsLoadingAction {
    type: authActionsEnum.SET_IS_LOADING;
    payload: boolean
}


export type authAction =
    setAuthAction |
    setUserAction |
    setIsLoadingAction |
    setErrorAction;
