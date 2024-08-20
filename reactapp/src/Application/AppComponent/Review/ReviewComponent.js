// 09-02-2024 - Review Page
// This should get its reviews from recent orders page
// User should be allowed to give ratings and his comments to each products
// Upon successful submission each product should have a link to show its review 
// When user expands product detail we should also see the button to which will take us to its review
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone



import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveReviewToDb } from "../../../State/Review/reviewAction";
import { useNavigate, useParams } from "react-router-dom";


const ReviewComponent = () => {
   let reviews = useSelector((state)=>state.ReviewReducer.reviews);
    let dispatch = useDispatch();
    let navigate = useNavigate();
    let user = useSelector((state)=>state.UserReducer.User);
    let rating = useRef("null");
    let comments = useRef("null");

    //console.log("Here is the product._id" + props.product._id);

    let params = useParams(); 
     
    let productid = params && params["id"] ? params["id"]: "No id present"; 

    useEffect(()=>{
    rating.current.value = reviews.rating;
    comments.current.value = reviews.comments;
    },[reviews] )

    return (
        <div>
            <h1>Review Component</h1>
            <form>
                <div>
                    <b>Rating</b>
                    <select ref={rating} className="form-control col-md-6">
                        <option value="null">Select Rating</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Average</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                    </select>
                </div>
                <div>
                    <b>Comments</b>
                    <textarea ref={comments} className="form-control col-md-6" placeholder="Comments" />
                </div>
                <div>
                    <button onClick={(evt)=>{
                        dispatch(saveReviewToDb(user._id, productid, rating.current.value, comments.current.value));
                        navigate("/recentorders");
                        evt.preventDefault();
                    }} className="btn btn-primary">Save Review</button>
                </div>
            </form>
        </div>
    )
    
    
}


export default ReviewComponent;