import React from "react";
import { View, Platform, StatusBar } from "react-native";
import { TabNavigator, StackNavigator } from "react-navigation";
import { createStore } from "redux";
import { FontAwesome } from "@expo/vector-icons";
import { Constants, Permissions } from "expo";
import { Provider } from "react-redux";

import store from "./store";
import { purple, white } from "./utils/colors";
import DeckList from "./components/DeckList";
import Deck from "./components/Deck";
import Quiz from "./components/Quiz";
import NewDeck from "./components/NewDeck";
import NewQuestion from "./components/NewQuestion";

function UdaciStatusBar(props) {
  return (
    <View style={{ height: Constants.statusBarHeight }}>
      <StatusBar translucent props />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    DeckList: {
      screen: DeckList,
      navigationOptions: {
        tabBarLabel: "Deck List",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="list" size={30} color={tintColor} />
        )
      }
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: "New Deck",
        tabBarIcon: ({ tintColor }) => (
          <FontAwesome name="plus-square" size={30} color={tintColor} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: Platform.OS === "ios" ? purple : white,
      style: {
        height: 56,
        backgroundColor: Platform.OS === "ios" ? white : purple,
        shadowColor: "rgba(0, 0, 0, 0.24)",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 6,
        shadowOpacity: 1
      }
    }
  }
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs
  },
  Deck: {
    screen: Deck
  },
  Quiz: {
    screen: Quiz
  },
  NewQuestion: {
    screen: NewQuestion
  }
});

export default class App extends React.Component {
  componentDidMount() {
    Permissions.askAsync(Permissions.NOTIFICATIONS);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <UdaciStatusBar barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}
