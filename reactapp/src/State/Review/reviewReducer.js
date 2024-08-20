import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
    reviews: [],
    loading: false,
    error: null
}

export default function reviewReducer(state = INITIAL_STATE, action){
    console.log("Review Reducer", state, action);
    switch(action.type){
        case actionTypes.ADD_REVIEW:
            return {...state, loading: false, error: null}
        case actionTypes.GET_REVIEWS_SUCCESS:
            return {...state, reviews: action.payload, loading: false, error: null}
        case actionTypes.GET_REVIEWS_FAILED:
            return {...state, reviews: action.payload.reviews, loading: false, error: action.payload.error}
        case actionTypes.SAVE_REVIEW:
            return {...state, reviews: [...state.reviews, action.payload.reviews], loading: false, error: null}
        case actionTypes.UPDATE_REVIEW:
            return {...state, reviews: state.reviews.map(review => review._id == action.payload.reviews._id ? {...review, status: action.payload.status} : review)}
        default:
            return state;
    }
}