import { createContext, useState } from "react";

// Create the context
export const UserContext = createContext(undefined);

// Create the provider
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(undefined); // Initialize with undefined

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
