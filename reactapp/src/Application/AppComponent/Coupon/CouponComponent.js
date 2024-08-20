// Coupon Page 
// Create a component with Name - CouponComponent (Functional Component and Use Hooks)
// On the page add a Button - GenerateCoupon
// Upon Click Generate a random coupon of - 6 digits (basically a numeric random value)
// Dispatch this generated coupon using useDispatch

import React from "react";
import { useDispatch } from "react-redux";
import { generateCoupon } from "../../../State/Coupon/couponAction";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

let CouponComponent = (props)=>{

    let coupon = useSelector((state)=>state.CouponReducer.coupons)

    let dispatchCoupon = useDispatch();

    let generateCouponClick = ()=>{
        let coupon = Math.floor(Math.random()*1000000);
        dispatchCoupon(generateCoupon(coupon))
    }
    let navigate = useNavigate();
    let func = (evt)=>{
        navigate('/checkout');
        evt.preventDefault();
    }

    return(
        <div className="col-md-12">
            <h1>Coupon Component</h1>
            <h3>Your coupon is: {coupon}</h3>
            <button onClick={generateCouponClick}>Generate Coupon</button>
            {/*pushing this to checkout page*/}
            <button onClick={func}>Go To Checkout</button>
        </div>
    )
}

export default CouponComponent;




// Create a Coupon Reducer to have Coupon Value, Use Reducer to update the coupon value (useSelector coupon)
// Create action to pass coupon to reducer, with type and payload