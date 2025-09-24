import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  SetStateAction,
} from "react";

type UserContextType = {
  currentUserId: string | null;
  setCurrentUserId: Dispatch<SetStateAction<string | null>>;
  username: string | null;
  setUsername: Dispatch<SetStateAction<string | null>>;
  avatarUrl: string | null;
  setAvatarUrl: Dispatch<SetStateAction<string | null>>;
};

const defaultValue: UserContextType = {
  currentUserId: null,
  setCurrentUserId: () => {},
  username: null,
  setUsername: () => {},
  avatarUrl: null,
  setAvatarUrl: () => {},
};

export const UserContext = createContext<UserContextType>(defaultValue);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  return (
    <UserContext.Provider
      value={{
        currentUserId,
        setCurrentUserId,
        username,
        setUsername,
        avatarUrl,
        setAvatarUrl,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
