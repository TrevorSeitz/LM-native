import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator
} from "react-navigation";

import { View, Text, StyleSheet, Button } from "react-native";
import { Constants, MapView } from "expo";
import Icon from "@expo/vector-icons/Ionicons";
import Map from "./screens/Map";
import HomeScreen from "./screens/HomeScreen";
import NewPlaceScreen from "./screens/NewPlaceScreen";

class App extends Component {
  render() {
    return <AppContainer />;
  }
}

export default App;

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome Screen</Text>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Dashboard")}
        />
        <Button title="Sign Up" onPress={() => alert("Button Pressed")} />
      </View>
    );
  }
}

class DashboardScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>DashboardScreen</Text>
      </View>
    );
  }
}

class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Button
          title="Add A New Place Screen"
          onPress={() => this.props.navigation.navigate("NewPlace")}
        />
        <Map />
      </View>
    );
  }
}
class Profile extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Profile</Text>
      </View>
    );
  }
}
class Settings extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Settings</Text>
      </View>
    );
  }
}

class NewPlace extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>NewPlace</Text>
        <NewPlaceScreen />
      </View>
    );
  }
}

const HomeStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        return {
          headerTitle: "Home",
          headerLeft: (
            <Icon
              style={{ paddingLeft: 10 }}
              onPress={() => navigation.openDrawer()}
              name="md-menu"
              size={30}
            />
          )
        };
      }
    },
    NewPlace: { screen: NewPlace }
  },
  {
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const ProfileStack = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Profile",
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const SettingsStack = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: "Settings",
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
});

const DashboardTabNavigator = createBottomTabNavigator(
  {
    HomeStack,
    ProfileStack,
    SettingsStack
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        header: null,
        headerTitle: routeName
      };
    }
  }
);

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator: DashboardTabNavigator
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        headerLeft: (
          <Icon
            style={{ paddingLeft: 10 }}
            onPress={() => navigation.openDrawer()}
            name="md-menu"
            size={30}
          />
        )
      };
    }
  }
);

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: {
    screen: DashboardStackNavigator
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Dashboard: { screen: AppDrawerNavigator }
});

const AppContainer = createAppContainer(AppSwitchNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  }
});
