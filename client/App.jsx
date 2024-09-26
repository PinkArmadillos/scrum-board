import React, { useState } from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from "react-router-dom";
import RootLayout from './layouts/RootLayout';
import LoginPage, { loginAction } from './pages/Login/LoginPage';
import SignUpPage, { signupAction } from './pages/SignUp/SignUpPage';
import UserHomePage from './pages/UserHome/UserHomePage';
import ScrumBoard from './pages/ScrumBoard/ScrumBoardPage';
import { userContext, teamContext } from './context';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<RootLayout/>}>
      <Route
        path='/'
        element={<LoginPage key='LoginPage' />}
        action={loginAction} />
      <Route
        path='/SignupPage'
        element={<SignUpPage key='SignupPage' />}
        action={signupAction} />
      <Route
        path='/UserHomePage'
        element={<UserHomePage key='UserHomePage' />} />
      <Route
        path='/ScrumBoardPage'
        element={<ScrumBoard key='ScrumBoardPage' />} />
    </Route>
  )
)

const App = () => {

  const [ user, setUser ] = useState({});
  const [ team, setTeam ] = useState(0);
  const userValue = { user, setUser };
  const teamValue = { team, setTeam };
  
  // Using these context providers with context.js provides a way to store data accessible to
  // all children components. This way we can query the database as little as possible.
  return (
    <userContext.Provider value={userValue}>
      <teamContext.Provider value={teamValue}>
        <RouterProvider router={router} />
       </teamContext.Provider>
     </userContext.Provider>
  )
}

export default App;