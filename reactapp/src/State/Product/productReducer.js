import * as ActionTypes from "../actionTypes";

const Initial_State = {
    Product : {
        name : "",
        desc : "",
        rating : "",
        price : ""
    },
    Products: []
}

//write callback/ reducer to generate new state upon action change
let ProductReducer = (state = Initial_State, action)=>{
    //switch case logice to read action type and return new state / updated state

    switch (action.type) {
        
        case ActionTypes.ADD_PRODUCTS_TOSTORE :
            //..state - products[] and defaultProduct
            return { ...state, Products : action.payload.products } //we update products and then retrun a new state


        default:
            return state
    }
}

export default ProductReducer;