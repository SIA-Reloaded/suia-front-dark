import React, { createContext, useState, useEffect } from "react";
import { auth } from "../utilities/firebase-helper";
import { getUserData } from '../utilities/aws-helper';


export const UserContext = createContext({ user: undefined });

const UserProvider = (props) => {
  const [user, setUser] = useState(undefined);

  const updateUserData = async (email) => {
    if (email) {
      const username = email.split('@')[0];
      const userData = await getUserData(username)
      console.log(userData)
      setUser((usr) => {
        const newUser = { ...usr }
        newUser.userData = userData;
        return newUser
      })
    }
  }

  useEffect(() => {
    const setCurrentRole = (role) => {
      setUser((usr) => {
        const newUser = { ...usr }
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
        userAuth.setCurrentRole = setCurrentRole
        userAuth.currentRole = usrData.roles[0]
        userAuth.updateUserData = updateUserData
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