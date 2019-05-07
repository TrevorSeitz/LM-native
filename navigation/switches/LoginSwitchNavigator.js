import React from "react";
import { createSwitchNavigator } from "react-navigation";
// Screens
import WelcomeScreen from "../../screens/WelcomeScreen";
import HomeScreen from "../../screens/HomeScreen";
import LoginScreen from "../../screens/auth/LoginScreen";
import SignupScreen from "../../screens/auth/SignupScreen";
import ForgotPasswordScreen from "../../screens/auth/ForgotPasswordScreen";
import LoadingScreen from "../../screens/auth/LoadingScreen";

const LoginSwitchNavigator = createSwitchNavigator({
  Welcome: WelcomeScreen,
  Map: HomeScreen,
  Login: LoginScreen,
  Signup: SignupScreen,
  ForgotPassword: ForgotPasswordScreen,
  Loading: LoadingScreen
});

export default LoginSwitchNavigator;
