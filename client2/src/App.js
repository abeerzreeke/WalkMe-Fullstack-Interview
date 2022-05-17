import './App.css';
import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import OrgHierarchyPage  from './components/OrgPage/OrgHierarchyPage'
import logo from './logo/logo.png';

function App() {

  return (
    <>
      <header id='app-header'>
        <img src={logo} />
      </header>
      <main className='container'>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/OrgPage" element={<OrgHierarchyPage />} />
          </Routes>
        </BrowserRouter>
      </main>
    </>
  )
}

export default App
