// NotificationAction.js
import * as ActionTypes from '../actionTypes';

let nextNotificationId = 0;

export const addNotification = (message, destination) => {
  return {
    type: ActionTypes.ADD_NOTIFICATION,
    payload: {
      id: nextNotificationId++,
      message,
      destination
    },
  };
};

export const removeNotification = (notification) => {
  return {
    type: ActionTypes.REMOVE_NOTIFICATION,
    payload: notification,
  };
};

export const updateDynamicNotification = (value, message) => {
  return {
    type: ActionTypes.UPDATE_DYNAMIC_NOTIFICATION,
    payload: { value, message }
  };
};

// Messages for dynamic notifications
export const dynamicNotificationMessages = [
  'An item has been added to the cart',
  'An order has been cancelled'
];

// Messages for static notifications
export const staticNotificationMessages = [
  {
    message: 'To Add Products from Product Screen',
    destination: '/product'
  },
  {
    message: 'To Add Items from Cart Page',
    destination: '/cart'
  },
  {
    message: 'To review cart from Checkout Page',
    destination: '/checkOut'
  },
  {
    message: 'To Make Payment from Payment Page',
    destination: '/payment'
  },
  {
    message: 'To View Recent Orders',
    destination: '/recentorders'
  }
];
