import {authAction, authActionsEnum, authState} from "./types";
import {IUser} from "../../../models/IUser";

const initialState: authState = {
    isAuth: false,
    error: '',
    user: {} as IUser,
    isLoading: false
}
export const authReducer = (state = initialState, action: authAction): authState   => {
    switch (action.type){

        case authActionsEnum.SET_AUTH:
            return {...state, isAuth: action.payload, isLoading: false} as authState

        case authActionsEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false} as authState

        case authActionsEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload} as authState

        case authActionsEnum.SET_USER:
            return {...state, user: action.payload} as authState


        default:
            return state as authState;
    }
}
