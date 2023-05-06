import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

/* import css */
import './App.css';
import './globals.css';

/* import page */ 
import Dashboard from './components/pages/dashboard/dashboardPage';
import ListPage from './components/pages/list/listPage';
import SettingPage from './components/pages/setting/settingPage';
import LoginPage from './components/pages/login/loginPage';
import UserRegisterPage from './components/pages/login/userRegisterPage';


function App() {

  return (
    <div className="App">
      { typeof window === 'object' && 
          <BrowserRouter>
            <Routes>
                <Route path='/' element={<Dashboard />}/>
                <Route path='/login' element={<LoginPage />}/>
                <Route path='/userRegister' element={<UserRegisterPage />}/>
                <Route path='/list' element={<ListPage />} />
                <Route path='/setting' element={<SettingPage />} />
            </Routes>
          </BrowserRouter>
      }
    </div>
  );
}

export default App;
