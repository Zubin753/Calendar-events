import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import {privateRoutes, publicRoutes} from "../router";
import {RouteNames} from "../router";
import {useSelector} from "react-redux";
import {useTypedSelector} from "../hooks/useSelector";
import {authState} from "../store/reducers/auth/types";
import {RootStateType} from "../store";
import {typeOfState} from "../store/types";
const AppRouter = () => {
    const isAuth = useTypedSelector((state: any) => state.auth.isAuth)
    return (
        isAuth
            ?
        <Routes>

            {privateRoutes.map(r =>
                <Route path={r.path} element={ <r.component/> } key={r.path} />
            )}
                <Route path={'*'} element={<Navigate to={RouteNames.EVENT} replace />}/>
        </Routes>

            :
        <Routes>
            {publicRoutes.map(r =>
                <Route path={r.path} element={<r.component/>} key={r.path}/>
            )}
            <Route path={'*'} element={<Navigate to={RouteNames.LOGIN} replace />}/>
        </Routes>
    );
};

export default AppRouter;