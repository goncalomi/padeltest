import React, { useEffect, useState } from 'react';
import './App.css';
import { Login } from './components/Login';
import axios from 'axios';
import styled from 'styled-components';
import { SideBar } from './components/SideBar';
import {
  BrowserRouter,
} from "react-router-dom";
import { Home } from './components/Home';
import { getDeviceToken } from './firebase';


const SideBarContainer = styled.div`
    background: white;
    width: 120px;
    height: 100%;
    border-bottom-left-radius: 0.875rem;
    margin-top: 40px;
`;

export interface User {
  email: string;
  id: number;
  token: string;
}

function App() {
  const [user, setUser] = useState<User | undefined>();

  const loginUser = (email: string, password: string) => {
    const data = {
      "email": email,
      "password": password,
    }
    axios.post('http://localhost:8000/api/v1/login/', data).then(response => {
      if (response.status === 200) {
        const data = JSON.parse(response.data);
        setUser({
          email: data['email'],
          id: data['id'],
          token: data['token']
        })
      }

    }).catch(e => alert(e.message));
  }

  useEffect(() => {
    if (user !== undefined) {
      getDeviceToken(user.token);
    }
  }, [user])


  return (
    <div className="App">
      <BrowserRouter>

        <SideBarContainer className="rainbow-p-top_small rainbow-p-bottom_medium">
            <SideBar />
        </SideBarContainer>
        {
          user === undefined
          ? <Login loginUser={loginUser} />
          : <Home user={user}/>
        }
      </BrowserRouter>
    </div>
  );
}

export default App;
