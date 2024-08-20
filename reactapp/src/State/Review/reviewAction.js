import * as actionTypes from '../actionTypes';


export const addReview = (reviews)=>{
    return {
        type : actionTypes.ADD_REVIEW,
        payload : reviews
    }
}

export const saveReviewToDb = (userid, productid, rating, comments)=>{
    console.log("Review To DB", userid, productid, rating, comments);

    return function (dispatch) {
        //dispatch(loading(true));

        window.fetch("http://localhost:9000/reviews/api/saveReviews",{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({userid, productid, rating: rating, comments: comments})})
        .then (response => response.json())
        .then (reviewresponse => {
            console.log("response - save review", reviewresponse);
            dispatch({type: actionTypes.ADD_REVIEW, payload: reviewresponse.data})
        })
        .catch((err)=>{
            console.log("Error While Saving Review", err)
        })
    }
}

export const fetchReviews = (productid)=>{
    console.log("Review ");
    console.log("Getting review of product ", productid)

    return function (dispatch) {
        //dispatch(loading(true));

        window.fetch("http://localhost:9000/reviews/api/getReviews",{
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({productid})})
        .then (response => response.json())
        .then (reviewresponse => {
            console.log("response - get reviews", reviewresponse);
            dispatch(addReview(reviewresponse.data))
        })
        .catch((err)=>{
            console.log("Error While Saving Review", err)
        })
    }
};

export const viewReviews = (productid)=>{
    console.log("Review LALALALALA");
    //console.log("Getting review of product ", productid)

    return function (dispatch) {
        //dispatch(loading(true));

        window.fetch("http://localhost:9000/reviews/api/viewReviews",{
        method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify({productid})})
        .then (response => response.json())
        .then (reviewresponse => {
            console.log("response - get reviews", reviewresponse);
            
            dispatch({type: actionTypes.GET_REVIEWS_SUCCESS, payload: reviewresponse})
        })
        .catch((err)=>{
            console.log("Error While Saving Review", err)
        })
    }
}

