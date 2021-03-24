import React, {useEffect, useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import Registration from "./views/Registration";
import Main from "./views/Main";
import Login from "./views/Login";
import {Router, Link} from "@reach/router";
import ViewAllItems from "./views/ViewAllItems";
import CreateNewItem from "./views/CreateNewItem";
import ViewOneItem from "./views/ViewOneItem";
import UpdateItem from "./views/UpdateItem";

function App() {

  const [logged, setLogged] = useState(null);

  return (
    <div className="App">
      <Router>
        <Registration 
        path ="/"
        setLogged = {setLogged}
        ></Registration>
        <Login
        path ="/login"
        setLogged={setLogged}
        >
        </Login>
        <Main  
          path="/dashboard"
          logged={logged}
          setLogged={setLogged}
        >
        </Main>
        <ViewAllItems
          path="/api/items"
          logged={logged}
          setLogged={setLogged}
          >
        </ViewAllItems>
        <CreateNewItem 
          path="/api/create/item"
          logged={logged}
          setLogged={setLogged}
          >
        </CreateNewItem>
        <ViewOneItem 
          path="/api/oneItem/:id"
          logged={logged}
          setLogged={setLogged}
          >
        </ViewOneItem>
        <UpdateItem 
          path="/api/update/:id"
          logged={logged}
          setLogged={setLogged}
          >
        </UpdateItem>
      </Router>
    </div>
  );
}

export default App;
