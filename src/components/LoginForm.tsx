import React, {FC, useState} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../store/reducers/auth/action-creator";
import {bindActionCreators} from "redux";
import {useAction} from "../hooks/useMyDispatch";
import {useTypedSelector} from "../hooks/useSelector";

const LoginForm: FC = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const {error, isLoading} = useTypedSelector((state: any) => state.auth)
    const {login} = useAction()

    const submit =  () => {
        login(username, password)
    }

    return (
        <Form
            onFinish={submit}
        >
            {error && <div style={{color: "red"}}>{error}</div>}
            <Form.Item label="Имя пользователя"
            name="username"
            rules={[rules.required("Пожалуйста введите имя пользователя")]}>
                <Input
                    value = {username}
                    onChange = {e => setUsername(e.target.value)}
                />
            </Form.Item>

            <Form.Item label="Пароль"
                       name="password"
                       rules={[rules.required("Пожалуйста, введите пароль")]}>
                <Input
                    type="password"
                    value = {password}
                    onChange = {e => setPassword(e.target.value)}/>
            </Form.Item>

            <Form.Item wrapperCol={{offset: 8, span: 16}}>
                <Button type = "primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>

    );
};

export default LoginForm;