//we will define actions to be used by action creator and dispatchers to dispatch to store
import { getUserCart } from "../Cart/CartAction";
import { fetchRecentOrders } from "../orders/orderAction";
import * as ActionTypes from "../actionTypes";
import axios from "axios";
//call back function to define type and payload to be used in reducer
export const AddUserToStore = (newUser)=>{
    return {
        type : ActionTypes.AddUserToStore,
        payload : newUser
    }
}


//server call

export const SaveUserToDB = (newUser)=>{
    return (dispatch)=>{
        axios.post("http://localhost:9000/user/api/signinup",//uri or end point of singninup api
                newUser //passing into the body req.body
            )
            .then((savedUser)=>{
                let signdUser = savedUser.data;
                console.log(signdUser)
                dispatch(AddUserToStore(signdUser))
                dispatch(getUserCart(signdUser._id))
                dispatch(fetchRecentOrders(signdUser._id))
            })
            .catch((err)=>{
                console.log(err)
            })
    }
}

