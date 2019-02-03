import { Notifications } from "expo";
import React from "react";
import { StackNavigator } from "react-navigation";
// import MainTabNavigator from "./MainTabNavigator";
import registerForPushNotificationsAsync from "../api/registerForPushNotificationsAsync";

import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import AppSwitchNavigator from "./navigation/switches/AppSwitchNavigator";

import { createAppContainer } from "react-navigation";

const LoginSwitchNavigator = StackNavigator(
  {
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },

    Main: { screen: WelcomeScreen }
  },
  {
    navigationOptions: () => ({
      headerTitleStyle: {
        fontWeight: "normal"
      }
    })
  }
);

export default class LoginSwitchNavigator extends React.Component {
  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }
  render() {
    return <RootStackNavigator />;
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this.notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }
  _handleNotification = ({ origin, data }) => {
    console.log(
      "Push notifications ${origin} with data: S{JSON.stringify(data)}"
    );
  };
}
//
// const AppContainer = createAppContainer(AppSwitchNavigator);
