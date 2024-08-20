import React, { useState } from "react";
import { useDispatch} from "react-redux";
import { addItemToCart } from "../../../State/Cart/CartAction";
import { fetchReviews } from "../../../State/Review/reviewAction";
import { useNavigate } from "react-router-dom";

let ProductItemComponent = ({product})=>{

    let [showHide, toggleShowHide] = useState(false)

    let dispatchToAddProduct = useDispatch();

    let addProductToCart = ( product )=>{
        dispatchToAddProduct(addItemToCart(product))
    }


    let nav = useNavigate();


    let checkReviews = (productid) => {
        nav("/checkreviews/" + productid);
    };

    return(
        <ul className="product col-md-11">
            <li className="product" onClick={()=>toggleShowHide(!showHide)}>
           {product.name}
                {showHide ? 
                    <ul>
                    <li>{product.price}</li>
                    <li>{product.desc}</li>
                    <li>{product.rating}</li> 

                    <button onClick={()=>{addProductToCart(product)}}>Add To Cart</button> 
                    <button onClick={()=>{checkReviews(product._id)}}>Reviews</button>
                </ul>
                 : <></>} 
            </li>
        </ul>
    )

}

export default ProductItemComponent;