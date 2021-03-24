import React, {useEffect, useState} from 'react';
import Axios from 'axios';
import { Link, navigate } from '@reach/router';


const ViewOneItem = (props) => {
    const {logged, setLogged} = props;
    console.log("Here's the props info yo", props)
    const [itemDetail, setItemDetail] = useState ({
        Title: "",
        Price: 0,
        Description:""
    })
    useEffect(() => {
       Axios.get(`http://localhost:8000/api/oneItem/${props.id}`)
        .then(response =>{
            console.log("Here's the response call for this item", response)
            setItemDetail(response.data.results)
        })
        .catch(err =>{
            console.log("Here's the error", err)
        })
    }, []);
    return (
        <div>
            <h1>Product Manager</h1>
            <h2>Welcome, {logged.firstName} {logged.lastName}</h2>
            <Link className="btn btn-success m-1" to="/api/create/item">
            Create New Item
            </Link>
            <Link className="btn btn-primary m-1" to="/api/items">
             Home
            </Link>
            <h3>Here's some stuff</h3>
            {/* <p>Player id: {props.id}</p> */}
            <p>Title: {itemDetail.Title}</p>
            <p>Price: {itemDetail.Price}</p>
            <p>Description: {itemDetail.Description}</p>
        </div>
    );
};



export default ViewOneItem;