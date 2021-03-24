import React, {useState} from 'react';
import Axios from 'axios';
import Input from "../components/Input";
import {Link, navigate} from "@reach/router";



const Login = (props) => {
    const {setLogged} = props;
    const initialLogin = {
        email:'',
        password:'',
    }
    const [log, setLog] = useState(initialLogin);
    const [errors, setErrors] = useState(initialLogin);

    const changeHandler = e => {
        setLog({
            ...log,
            [e.target.name]:e.target.value
        })
    }
    const submitHandler = e =>{
        e.preventDefault();
        Axios.post("http://localhost:8000/api/login",log,{withCredentials:true})
            .then(response => {
                console.log("Hey, this is working",response);
                if (response.data.user){
                    console.log("this is working too")
                    setLogged(response.data.user);
                    navigate("/api/items");
                    
                }
                else{
                    setErrors("Then its coming here",response.data);
                }
            })
            .catch(error => console.log("woa buddy",error))
    }

    return (
        <div>
            <form className="col-5 mx-auto" onSubmit={submitHandler}>
                <h2>Login</h2>
                <Input
                    name="email"
                    value={log.email}
                    error={errors.email}
                    handleChange={changeHandler}
                    label="Email:"
                    type="email"                
                />
                <Input
                    name="password"
                    value={log.password}
                    error={errors.password}
                    handleChange={changeHandler}
                    label="Password:"
                    type="password"                
                />
                <Input
                    submitValue="Login"
                    type="submit"                
                />
                <br/>
                <Link to="/">Don't have an account?</Link>
            </form>
            
        </div>
    );
};

export default Login;