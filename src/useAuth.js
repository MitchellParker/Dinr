import * as React from "react";

const localStorage = window.sessionStorage;

function getInitialState() {
  console.log("got state:")
  let authed = localStorage.getItem("authed") || false;
  let user = localStorage.getItem("user") || undefined;
  let pass = localStorage.getItem("pass") || undefined;  
  authed = (authed === "true");
  if (user === "undefined") {
    user = undefined;
  }
  if (pass === "undefined") {
    pass = undefined;
  }
  const state = {
    authed: authed,
    user: user,
    pass: pass,
  };
  return state;
}

function setPersistentState( setter, key, val ) {
  localStorage.setItem( key, val );
  setter( val );
}

const authContext = React.createContext();

function useAuth() {
  const state = getInitialState();
  const [authed, setAuthed] = React.useState(state.authed);
  const setPersistentAuthed = (val) => setPersistentState(setAuthed, "authed", val);
  const [user, setUser] = React.useState(state.user);
  const setPersistentUser = (val) => setPersistentState(setUser, "user", val);
  const [pass, setPass] = React.useState(state.pass);
  const setPersistentPass = (val) => setPersistentState(setPass, "pass", val);
  return {
    authed, user, pass,
    login(username, password) {
      return new Promise((res) => {
        getBackendAuth(username, password).then((backendRes) => {
          if (backendRes.authed) {
            setPersistentAuthed(true);
            setPersistentUser(username);
            setPersistentPass(password);
          }
          res(backendRes);
        });
      });
    },
    logout() {
      return new Promise((res) => {
        setPersistentAuthed(false);
        setPersistentUser(undefined);
        setPersistentPass(undefined);
        res();
      });
    }
  };
}

async function getBackendAuth(username, password) {
  const res = await fetch('/auth', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nickname: username,   
      password: password,
    })
  });
  return res.json()
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