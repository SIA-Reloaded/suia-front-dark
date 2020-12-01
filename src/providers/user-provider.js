import React, { createContext, useState, useEffect } from "react";
import { auth } from "../utilities/firebase-helper";
import { getUserData } from '../utilities/aws-helper';


export const UserContext = createContext({ user: undefined });

const UserProvider = (props) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const usrData = await getUserData(userAuth.uid)
        userAuth.userToken = userAuth.getIdToken()
        userAuth.userData = usrData
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