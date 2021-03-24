import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Link, navigate } from '@reach/router';


const ViewAllItems = (props) => {
    const {logged, setLogged} = props;
    const [allItems, setAllItems] = useState([]); 
    const [deleteClicked, setDeleteClicked] = useState(false)

    useEffect(() => {
        Axios.get("http://localhost:8000/api/items")
            .then(response => {
                console.log("************", response)
                setAllItems(response.data.results)
            })
            .catch(err => {
                console.log("Here's an error*******",err)
            })
    }, [deleteClicked]);

const deleteClickHandler = (e, id) =>{
    console.log("Deleting this", id)
    Axios.delete(`http://localhost:8000/api/delete/${id}`)
        .then(response => {
            console.log("Just deleted", response)
            setDeleteClicked(!deleteClicked)
        })
        .catch(err => {
            console.log("Here's some deleting errors", err)
        })
}
const handleLogout = () =>{
    Axios.get("http://localhost:8000/api/logout", {withCredentials:true})
        .then(response => {
            navigate("/login");
        })
        .catch(error => console.log(error))
}
    return (
        <div>
            <h1>Favorite Authors</h1>
            <h2>Welcome, {logged.firstName} {logged.lastName}</h2>
            <Link className="btn btn-success m-1" to="/api/create/item">
            Add an Author</Link>
            <Link className="btn btn-primary m-1" to="/api/items">
             Home
            </Link>
            <button onClick={handleLogout} className="btn btn-danger">Log Out</button>
            <h3>We have quotes by:</h3>
            <table className = "table table-primary col-8 mx-auto">
                <thead>
                    <tr>
                        <th>Author</th>
                        {/* <th>Price</th>
                        <th>Description</th> */}
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                {
                allItems.sort((a, b) => a.Author > b.Author ? 1:-1).map((each, i) =>{
                    return <tr key = {i}>
                            <td>{each.Author}</td>
                            <td>
                            <Link className ="btn btn-secondary m-1" to={`/api/update/${each._id}`}>Update</Link>
                            <button onClick={(e) =>deleteClickHandler(e,each._id)} className="btn btn-warning m-1 ">Delete</button>
                            </td>
                        </tr>
                })
                }
                </tbody>
            </table>
        </div>
    );
};

export default ViewAllItems;