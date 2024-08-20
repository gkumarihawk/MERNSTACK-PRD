import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchReviews } from "../../../State/Review/reviewAction";
import { viewReviews } from "../../../State/Review/reviewAction";

let checkReviews = () => {
    let params = useParams(); 
    //let products = useSelector((state)=>state.ProductReducer.Products);
    let productid = params && params["id"] ? params["id"]: "No id present"; 
    //console.log("Product Id: ", productid)
    let dispatch = useDispatch();
    let reviews = useSelector((state)=>state.ReviewReducer.reviews);

    useEffect(()=>{
        //console.log("Hello from me to yoy");
        dispatch(viewReviews(productid));
        //console.log("Hello from me to yoy");
    },[])
    //console.log("Gauri's product reviews", reviews)
    console.log("Gauri's product reviews", reviews)
    console.log("rerender");
    //console.log(reviews.rating, reviews.comments)
    
    return(
        <div>
            <h1>Check Reviews</h1>
        
            <div>
                <h2>Product Id: {productid}</h2>
                <h2> Product Name: {} </h2>
                {reviews.map((review)=>{
                    return(
                        <div>
                            <h2>User: {review.userid}</h2>
                            <h2>Rating: {review.rating}</h2>
                            <h2>Comments: {review.comments}</h2>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default checkReviews;