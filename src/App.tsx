import React, {useEffect} from 'react';
import AppRouter from "./components/AppRouter";
import Navbar from "./components/Navbar";
import {Layout} from "antd";
import './App.css'
import {useAction} from "./hooks/useMyDispatch";

import {IUser} from "./models/IUser";


function App() {

    const {setUser, setIsAuth} = useAction()

    useEffect(() => {
        if(localStorage.getItem('auth')){
            console.log("Эффект")
            setUser({username: localStorage.getItem('username')} as IUser)
            setIsAuth(true)
        }else{

        }
    }, [])

  return (
    <div className="App">
        <Layout>
            <Navbar/>
            <Layout.Content>
                <AppRouter/>
            </Layout.Content>

        </Layout>

    </div>
  );
}

export default App;
