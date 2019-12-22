import React, {Component} from 'react';
import {H1, Text, Card, CardItem, Body} from 'native-base';
import { Button, View } from "react-native";

class DeckDetails extends Component {

    static navigationOptions = {
        title: 'Deck Details',
    };

    render() {
        const { deck } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;
        return (
            <Card style={{ elevation: 3 }}>
                <CardItem>
                    <Body>
                        <H1>{deck.title}</H1>
                        <Text note>Number of Cards: {deck.cards.length}</Text>
                    </Body>
                </CardItem>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-evenly',
                }}>
                    <Button title='Add Card' onPress={() => navigate('AddCard',{ deck })}/>
                    <Button title='Start Quiz' color='green' onPress={() => this._startQuiz(deck, navigate)}/>
                </View>
            </Card>

        );
    }
    _startQuiz = (deck, navigate) => {
        if(deck.cards.length === 0){
            alert('Please add cards to start the quiz');
            return;
        }

        navigate('Quiz', { deck });
    }
}

export default DeckDetails;