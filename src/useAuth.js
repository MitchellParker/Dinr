import * as React from "react";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);
  const [user, setUser] = React.useState(undefined);
  const [pass, setPass] = React.useState(undefined);
  return {
    authed, user, pass,
    login(username, password) {
      return new Promise((res) => {
        setAuthed(true);
        setUser(username);
        setPass(password);
        res();
      });
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        setUser(undefined);
        setPass(undefined);
        res();
      });
    }
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}