import * as actionTypes from '../actionTypes';

export const generateCoupon = (coupon) => {
    return {
        type: actionTypes.ADD_COUPONS,
        payload: {
            coupons: coupon
        }
    }
}