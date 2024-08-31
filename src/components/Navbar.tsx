import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useNavigate} from "react-router-dom";
import {RouteNames} from "../router";
import {useSelector} from "react-redux";
import {useTypedSelector} from "../hooks/useSelector";
import {useAction} from "../hooks/useMyDispatch";

const Navbar: FC = () => {

    const {isAuth, user}= useTypedSelector((state: any) => state.auth)
    const {logout} = useAction()
    const router = useNavigate()
    return (
        <Layout.Header>
            <div className="row">
                <Menu theme="dark" mode="horizontal" selectable={false} style={{ width: '72px' }}>
                    {!isAuth ?
                        <Menu.Item onClick = {() => {router(RouteNames.LOGIN)}} key="1">Войти</Menu.Item>
                        :
                        <>
                            <div style={{color: "whitesmoke"}}>{user.username}</div>
                            <Menu.Item onClick = {() => {
                                logout()
                                router(RouteNames.LOGIN)}
                            } key="1">Выйти</Menu.Item>
                        </>

                    }

                </Menu>
            </div>
        </Layout.Header>
    );
};

export default Navbar;