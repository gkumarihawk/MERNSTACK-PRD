import React, {useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartComponent from "../Cart/CartComponent";
import { saveOrderToDb } from "../../../State/orders/orderAction";


let CheckOutComponent = (props)=>{
    
    let coupon = useSelector((state)=>state.CouponReducer.coupons)
    let cartList = useSelector((state)=>state.CartReducer)
    let user = useSelector((state)=>state.UserReducer.User)
    const dispatch = useDispatch();

    let func = (evt)=>{
        navigate('/payment');
        evt.preventDefault();
    }

    let navigate = useNavigate();

    const [show, setShow] = useState(true); 
    
    const handleMakePayment = () => {
        setShow(false);
        dispatch(saveOrderToDb(user._id, cartList, Date.now()))
    };

    return(
        <div className="col-md-12">
            <h1>{show ? "Checkout Page" : "Payment Page"}</h1>
            {user && user.userName ? (
                <div>
                    <h3>Hi {user.userName}, Welcome to SynergisticIT Shopping Cart!!!</h3>
                    <h4>We will deliver products to below address:</h4>
                    <h4>{user.street}</h4>
                </div>
            ) : (
                <h3>Please Login or SignUp to see other features</h3>
            )}

            {!show && (
                <div>
                    <h3>Thank you for the payment, your items are under process!</h3>
                </div>
            )}

            {show && (
                <div>
                    <CartComponent readOnly={true} />
                    {coupon === "" ? (
                        <div>
                            <h3>Hi {user.userName}, Go to coupon to generate!</h3>
                        </div>
                    ) : (
                        <h3>{coupon}</h3>
                    )}
                    <button onClick={handleMakePayment}>Proceed to Payment</button>
                </div>
            )}
        </div>
    )
}

export default CheckOutComponent;



    

    