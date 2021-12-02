import * as React from "react";

const localStorage = window.sessionStorage;

// get the user's auth state from the window
function getInitialState() {
  let authed = localStorage.getItem("authed") || false;
  let user = localStorage.getItem("user") || undefined;
  let pass = localStorage.getItem("pass") || undefined;  
  // convert from strings to appropriate type
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

// helper for setting state variables that save to the session
function setPersistentState( setter, key, val ) {
  localStorage.setItem( key, val );
  setter( val );
}

const authContext = React.createContext();

function useAuth() {
  // initialize variables and their setters
  const state = getInitialState();
  const [authed, setAuthed] = React.useState(state.authed);
  const setPersistentAuthed = (val) => setPersistentState(setAuthed, "authed", val);
  const [user, setUser] = React.useState(state.user);
  const setPersistentUser = (val) => setPersistentState(setUser, "user", val);
  const [pass, setPass] = React.useState(state.pass);
  const setPersistentPass = (val) => setPersistentState(setPass, "pass", val);
  return {
    authed, user, pass, // return basic login info
    login(username, password) { // return a method for logging in
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
    logout() { // return a method for logging out
      return new Promise((res) => {
        setPersistentAuthed(false);
        setPersistentUser(undefined);
        setPersistentPass(undefined);
        res();
      });
    }
  };
}

// makes a call to backend /auth and returns the response
// this verifies that the username and password match
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

// function component for providing auth info to the website
// any components that are not children of this will not be able
// to see the auth info
export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

// auth context consumer
// gets the auth info from the nearest AuthProvider, returns the
// same stuff that useAuth returns
export default function AuthConsumer() {
  return React.useContext(authContext);
}