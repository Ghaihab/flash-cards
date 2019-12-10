import React from 'react';
import { Container, Header, Tab, Tabs } from 'native-base';
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import DeckDetails from "./components/DeckDetails";

const MainNavigator = createStackNavigator({
    Home: Decks,
    DeckDetails: DeckDetails,
    AddDeck: AddDeck,
    AddCard: AddCard,
    Quiz: Quiz
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {
    render() {
        return <AppContainer />;
    }
}

