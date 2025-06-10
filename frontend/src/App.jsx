import { createContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Transactions from '../components/Transactions'
import Sidebar from '../components/Layout'
import Context from '../sections/Context'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from '../components/Layout'
import Hero from '../sections/Hero'

import { AuthProvider } from '../contexts/AuthContext'
import RequireAuth from '../contexts/RequireAuth'
import RedirectIfAuth from '../contexts/RedirectIfAuth'
import Landing from '../sections/Landing'
import NoRequireAuth from '../contexts/NoRequireAuth'
import Groups from '../sections/Groups'


import.meta.env
export const createGroupContext = createContext();

function App() {
      const [createGroup, setCreateGroup] = useState(false)
  


  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<RedirectIfAuth />}>
              {/* <Route path="/login" element={<Signin />} /> */}
            </Route>
            <Route path='/' element={<NoRequireAuth />}>
              <Route index element={<Landing />} /> {/* /about */}
              <Route element={<RedirectIfAuth />}>
                <Route path='/login' element={<Landing />} /> {/* /about */}
              </Route>
            </Route>

            <Route element={<RequireAuth />}>
              <Route path='/transactions' element={<Transactions />} /> {/* / */}
              <Route path="/loans" element={<Hero />} /> {/* /about */}
              <Route path="/groups" element={ <createGroupContext.Provider value={{createGroup, setCreateGroup}}><Groups /> </createGroupContext.Provider> } /> {/* /about */}


            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>





    </>
  )
}

export default App
