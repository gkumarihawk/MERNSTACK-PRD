import * as actionTypes from '../actionTypes';

const INITIAL_STATE = {
    coupons: ""
}

export default function CouponReducer(state = INITIAL_STATE, action) {
    console.log("Coupon Reducer", state, action);
    switch (action.type) {
        case actionTypes.ADD_COUPONS:
            return { ...state, coupons: action.payload.coupons }
        default:
            return state;
    }
}