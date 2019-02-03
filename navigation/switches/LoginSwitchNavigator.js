import React, { Component } from "react";
import { createSwitchNavigator } from "react-navigation";

import WelcomeScreen from "../../screens/WelcomeScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";

const LoginSwitchNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },

    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    ForgotPassword: { screen: ForgotPasswordScreen },
    Loading: { screen: LoadingScreen }
  },
  {
    initialRouteName: "Loading"
  }
);

export default LoginSwitchNavigator;
