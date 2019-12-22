import React from 'react';
import Decks from "./components/Decks";
import AddDeck from "./components/AddDeck";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import AddCard from "./components/AddCard";
import Quiz from "./components/Quiz";
import DeckDetails from "./components/DeckDetails";
import {
    clearLocalNotification,
    setLocationNotification,
    getDailyReminderValue
} from './utils/helpers'

const MainNavigator = createStackNavigator({
    Home: Decks,
    DeckDetails: DeckDetails,
    AddDeck: AddDeck,
    AddCard: AddCard,
    Quiz: Quiz
});

const AppContainer = createAppContainer(MainNavigator);

export default class App extends React.Component {

    componentDidMount() {
        clearLocalNotification();
        setLocationNotification();
    }

    render() {
        return <AppContainer />;
    }
}

