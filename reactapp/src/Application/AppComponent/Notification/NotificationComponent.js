// NotificationComponent.js

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { removeNotification, updateDynamicNotification, staticNotificationMessages, dynamicNotificationMessages, addNotification } from '../../../State/Notification/notificationAction';
import { Dropdown, Badge } from 'react-bootstrap';

const NotificationComponent = () => {
  const notifications = useSelector(state => state.NotificationReducer.notifications || []);
  const count = useSelector(state => state.NotificationReducer.count || 0);
  const dynamicNotifications = useSelector(state => state.NotificationReducer.dynamicNotifications || []);
  const cartItems = useSelector(state => state.CartReducer);
  //const canceledOrders = useSelector(state => state.ordersReducer.orders.filter(order => order.status === 'Cancelled'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let user = useSelector((state)=>state.UserReducer.User)
  const cancelledOrders = useSelector(state => state.ordersReducer.orders.filter(order => order.status === 'Cancelled'));

  // Add static notifications on login
  useEffect(() => {
    // Dispatch actions to remove existing notifications
    notifications.forEach(notification => {
      dispatch(removeNotification(notification));
    });

    // Dispatch actions to add static notifications
    staticNotificationMessages.forEach(notification => {
      dispatch(addNotification(notification.message, notification.destination));
    });
  }, [dispatch]);

  // Check for cart items and dispatch dynamic notifications accordingly
  useEffect(() => {

    if (cartItems.length > 0) {
      dispatch(addNotification(dynamicNotificationMessages[0], '/product'));
    }
  }, [cartItems, dispatch]);

  //useEffect(() => {
  //  
  //  if (cancelledOrders.length > 0) {
  //    cancelledOrders.forEach(order => {
  //      dispatch(addNotification(dynamicNotificationMessages[1], '/cancelledorders'));
  //    });
  //  }
  //}, [cancelledOrders, dispatch]);

  const handleStaticNotificationClick = (notification) => {
    dispatch(removeNotification(notification));
    navigate(notification.destination);
  };

  const handleDynamicNotificationClick = (notification) => {
    dispatch(removeNotification(notification));
  };

  return (
    <div className="notification-icon">
      <div className="notification-bell">
        <FontAwesomeIcon icon={faBell} />
        {count > 0 && <Badge variant="danger">{count}</Badge>}
      </div>
      <Dropdown>
        <Dropdown.Toggle variant="light" id="notifications-dropdown" className="hide-toggle">
          {/* Hidden toggle button */}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/* Static notifications */}
          {notifications.map((notification, index) => (
            <Dropdown.Item key={index} onClick={() => handleStaticNotificationClick(notification)}>
              {notification.message}
            </Dropdown.Item>
          ))}
          {/* Dynamic notifications */}
          {dynamicNotifications.map((notification, index) => (
            <Dropdown.Item key={index} className="notification-item" onClick={() => handleDynamicNotificationClick(notification)}>
              {notification.message}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default NotificationComponent;
