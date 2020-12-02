import React, { createContext, useState, useEffect } from "react";
import { auth } from "../utilities/firebase-helper";
import { getUserData } from '../utilities/aws-helper';


export const UserContext = createContext({ user: undefined });

const UserProvider = (props) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const setCurrentRole = (role) => {
      setUser((usr) => {
        const newUser = {...user}
        newUser.currentRole = role;
        return newUser
      })
    }

    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        console.log(userAuth)
        const username = userAuth.email.split('@')[0];
        const usrData = await getUserData(username)
        userAuth.userData = usrData
        userAuth.currentRole = usrData.roles[0]
      }
      setUser(userAuth);
    });
  }, [])

  return (
    <UserContext.Provider value={user}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserProvider