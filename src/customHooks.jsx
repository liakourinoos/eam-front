import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext(undefined);

// Create the provider
export const UserProvider = ({ children }) => {
  // const [userData, setUserData] = useState(undefined); // Initialize with undefined
  const [userData, setUserData] = useState({
      name:"2sougiades",
      surname:"27tsouries",
      AMKA:"12345678901",
      email:"iliasdm@gmail.com",
      password:"1",
      number:"6987654321",
      skype:"iliasdm",
      gender:"Male",
      role:"parent",
      bio:"THis is my bio!"

  });

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};


