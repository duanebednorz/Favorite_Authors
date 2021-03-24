import React, { useEffect, useState } from "react";
import Axios from 'axios';
import { navigate } from "@reach/router";

const Main = (props) => {
  const { logged, setLogged } = props;
  const [users, setUsers] = useState([]);

    useEffect(() =>{
        Axios.get("http://localhost:8000/api/users", {withCredentials:true})
            .then(response => setUsers(response.data.results))
            .catch(error =>{
                if(error.response.status === 401){
                    navigate("/login");
                }
            })
    },[])
    const handleLogout = () =>{
        Axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(response => {
                navigate("/login");
                // setLogged(null);
                
            })
            .catch(error => console.log(error))
    }
  return (
    <div>
      <h2>Welcome {logged.firstName} {logged.lastName}
      </h2>
      <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {
          users.map((each, i) => {
            return <tr key ={i}>
                <td>{each.firstName} {each.lastName}</td>
                <td>{each.email}</td>
                </tr>
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default Main;