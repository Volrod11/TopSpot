import React, { createContext, useContext, useState, Dispatch, SetStateAction } from 'react';

type UserContextType = {
  currentUserId: string | null;
  setCurrentUserId: Dispatch<SetStateAction<string | null>>;
};

const defaultValue: UserContextType = {
  currentUserId: null,
  setCurrentUserId: () => {}, // valeur par défaut vide
};

export const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ currentUserId, setCurrentUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
