//Hook - a function composed of a dedicated functionality
//react - useState, useRef
//react-redux - useSelector, useReducer

import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"; //mapStateToProps

import { AddUserToStore, SaveUserToDB } from "../../../State/User/userAction";

let UserHook = (props)=>{

    //this.state = { userName : props.user.userName }
    //this.setState({})   

    //this will do thejob of mapStateToProps and allows us read data from reducer/store
    let User = useSelector((state)=>state.UserReducer.User)

    let someValue = 0;

    // initializes state and returns a callback which we can use to update the state
    let [uName, setUserName] = useState(User.userName)
    let [pass, setPassword] = useState(User.password)
    let [street, setStreet] = useState(User.street)
    let [mobile, setPhone] = useState(User.mobile)

    let onTextChange = (evt)=>{
        setUserName(evt.target.value)
        evt.preventDefault();
    }

    //mapDispatchToProps - makes the component able to dispatch action to the store/reducer
    let dispatchToStore = useDispatch();

    let loginUser = (evt)=>{
        let user = {
            userName : uName,
            password : pass,
            street,
            mobile 
        }

        //dispatchToStore(AddUserToStore(user))
        dispatchToStore(SaveUserToDB(user))

        evt.preventDefault();
    }

    //the reference implemenation
    let sessionName = useRef(null)
    let todaysTopic = useRef(null)

    let readFormData = (evt)=>{

        let user = {
            userName : sessionName.current.value             
        }

        dispatchToStore(AddUserToStore(user))

        evt.preventDefault();
    }

    //shouldcomponentUpdate, componentDidMount
    //default it is shouldcomponentUpdate
    //when first rendering is done and UI can be accessed - componentDidMount
    //useeffect is the hook that we use to make it work as shouldComponentUpdate, componentDidMount, componentWillUnmount
    useEffect(()=>{
        console.log("Re render happend")

        //assign the values we got from reducer
        // sessionName.current.value = User.userName //"David" 
        // todaysTopic.current.value = User.street

        //if we return a function in useEffect - this acts as componentWillUnmount
        return ()=>{
            //clearInterval(interval)
            console.log("Hook instance gets cleared! componentWilUnmount")
        }

        }, [sessionName, todaysTopic]) //if we pass value in second parameter it initializes and behaves as - componentDidMount

    //let interval = setInterval(() => {
    //    console.log(someValue++)
    //}, 2000);

    return(
        <>
            <h1>User Login Page</h1>
            <section className={"componentClass"}>
                <div className="form col-md-8">
                    <div className="col-md-12">
                        <b>User Name</b>
                        <input type="text" className="form-control col-md-6 username" 
                                value={uName} 
                            placeholder="User Name" onChange={onTextChange} maxLength={40}/>
        
                    </div>
                    <div className="col-md-12">
                            <b>Password</b>
                            <input type="password" className="form-control col-md-6 pass" 
                                value={pass} 
                            placeholder="Password" onChange={(evt)=>setPassword(evt.target.value)} maxLength={40}/>
                    </div>
                    <div className="col-md-12">
                            <b>Street </b>
                                <input type="text" className="form-control col-md-6 street" 
                                value={street} 
                            placeholder="Street Name" onChange={(evt)=>setStreet(evt.target.value)} />
                    </div>
                        
                    <div className="col-md-12">
                        <b>Mobile </b>
                        <input type="number" className="form-control col-md-6 mobile" 
                            value={mobile} placeholder="Mobile" maxLength="11"
                            onChange={(evt)=>setPhone(evt.target.value)} />
                    </div>
                    <input type="button" className={"btn btn-primary col-md-2 saveUser"} 
                                    value={"SignIn-Up"} 
                                    onClick={loginUser}/>
                </div>
            </section>

            {/* uncontrolled way by using ref keyword */}
            {/* <form className={"form col-md-10 userHook"} onSubmit={readFormData}>                
                <label>
                    <b>User Name :</b>
                    <input type="text" className={"form-control col-md-12"} ref={sessionName}
                    placeholder="Please enter session name" maxLength={20} required/>
                </label>
                <br/>
                <label>
                        <b>Password :</b>
                        <input type="password" className={"form-control col-md-12"} ref={todaysTopic} 
                                placeholder="Please enter today's topic" maxLength={20} required/>
                    </label>
                    <br/>
                <input type="submit" className={"btn btn-primary"} value="Signin" />
            </form>  */}
        </>
    )
}

export default UserHook;