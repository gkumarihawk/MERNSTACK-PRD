// NotificationReducer.js

import * as ActionTypes from '../actionTypes';

const initialState = {
  notifications: [],
  dynamicNotifications: [], // Initialize dynamicNotifications as an empty array
  count: 0,
};

const NotificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.ADD_NOTIFICATION:
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
        count: state.count + 1,
      };
    case ActionTypes.REMOVE_NOTIFICATION:
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.id !== action.payload.id),
        count: state.count - 1,
      };
    case ActionTypes.UPDATE_DYNAMIC_NOTIFICATION:
      if (action.payload.value === 1) { // Only add dynamic notification for specific actions
        return {
          ...state,
          dynamicNotifications: [...state.dynamicNotifications, { id: state.count, message: action.payload.message }],
          count: state.count + 1,
        };
      } else if (action.payload.value === -1) { // Remove dynamic notification when needed
        return {
          ...state,
          dynamicNotifications: state.dynamicNotifications.filter(notification => notification.message !== action.payload.message),
          count: state.count - 1,
        };
      }
      return state;
    default:
      return state;
  }
};

export default NotificationReducer;