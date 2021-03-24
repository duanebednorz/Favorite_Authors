import React, {useEffect, useState} from 'react';
import Axios from 'axios'
import {navigate, Link} from "@reach/router"


const UpdateItem = (props) => {
    const {logged, setLogged} = props;
    const [itemDetail, setItemDetail] = useState ({
        Title: "",
        Price: 0,
        Description:""
    })
    console.log("Here's the item id", props)
    const [errors, setErrors] = useState({})
    useEffect(() => {
        Axios.get(`http://localhost:8000/api/oneItem/${props.id}`)
        .then(response =>{
            console.log("Here's the response call for this item", response)
            setItemDetail(response.data.results)
        })
        .catch(err =>{
            console.log("Here's the error", err)
        })
    }, [errors]);
    
// ****************************************************************************
    const changeHandler = (e) =>{
        setItemDetail({
            ...itemDetail,
            [e.target.name] : e.target.value
        })
    }
// ****************************************************************************
    const submitHandle = (e) =>{
        e.preventDefault();
        Axios.put(`http://localhost:8000/api/update/${props.id}`, itemDetail)
            .then(res => {
                console.log("This is the Form Submission", res)
                if(res.data.results){
                    navigate("/api/items")
                }
                else{
                    console.log("Fix it**********************")
                    console.log(res)
                    setErrors(res.data.error.errors)
                }
            })
            .catch(err=> console.log("These are the posting errors", err))
    };

// *************************************************************************
    return (
        <div>
            <h1>Favorite Authors</h1>
            <h2>Welcome, {logged.firstName} {logged.lastName}</h2>
            <Link className="btn btn-success m-1" to="/api/create/item">
            Add New Author</Link>
            <Link className="btn btn-primary m-1" to="/api/items">
             Home</Link>
            <form onSubmit = {submitHandle}>
                <div>
                <label htmlFor="">Name:</label>
                <br/>
                <input type="text" name="Author"  id="" onChange ={changeHandler} value = {itemDetail.Author} />
                <br/>
                <span className = "text-danger"> {errors.Author? errors.Author.message : ""}</span>
                </div>
                
                <br/>
                <Link className="btn btn-primary m-1" to="/api/items">
                    Cancel</Link>
                <input type="submit" value="Update"/>
             
            </form>
        </div>
    );
};

export default UpdateItem;