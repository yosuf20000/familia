import { createContext, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../contexts/AuthContext'
import RequireAuth from '../contexts/RequireAuth'
import RedirectIfAuth from '../contexts/RedirectIfAuth'
import Landing from '../sections/Landing'
import NoRequireAuth from '../contexts/NoRequireAuth'
import Groups from '../sections/Groups'
import AddMemebers from '../components/groups/AddMemebers'
import GroupsLayout from '../components/groups/GroupsLayout'
import TransactionsLayOut from '../components/Me/TransactionsLayOut';
import Me from '../sections/Me';
import { GroupAccessProvider } from '../contexts/GroupAccessContext';
import MyGroup from '../components/groups/MyGroup';
import SignupForm from '../components/auths/SignupForm';


import.meta.env
export const createGroupContext = createContext();

function App() {
  // 





  // 



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
                <Route path='/signup' element={<Landing />} /> {/* /about */}

              </Route>
            </Route>

            <Route element={ <GroupAccessProvider><RequireAuth /> </GroupAccessProvider>}>
              {/* <Route path="/transactions" element={<Transactions />} /> */}

              <Route path="/me" element={<TransactionsLayOut />}>
                <Route index element={<Me />} />
              </Route>

              <Route path="/groups" element={<GroupsLayout />}>
                <Route index element={<Groups />} />
                <Route path="create" element={<AddMemebers />} />
                <Route path=":groupname" element={
                    <MyGroup />

                } />
              </Route>
            </Route>


          </Routes>
        </BrowserRouter>
      </AuthProvider>

    </>
  )
}

export default App
