import {useDispatch} from "react-redux";
import {bindActionCreators} from "redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creator";
import {AppDispatch} from "../store";
import {allActionsCreators} from "../store/reducers/action-creators";

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(allActionsCreators, dispatch)
}
