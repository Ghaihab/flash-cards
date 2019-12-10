import React, {Component} from 'react';
import {Body, Card, CardItem, H1} from "native-base";
import FlipCard from "react-native-flip-card";
import {Button, View, Text } from "react-native";

class Quiz extends Component {

    static navigationOptions = {
        title: 'Quiz',
    };
    constructor(props) {
        super(props);
        this.state = {
            decisions: [],
            isFinished: false,
            currentCard: {},
            currentPosition: 0
        };
    }

    componentDidMount() {
        const { deck } = this.props.navigation.state.params;
        this.setState({currentCard: deck.cards[0]})
    }


    render() {
        return (
                this.state.isFinished ?
                 <Text>
                    Your Score is : {this.getCorrectDecisions().length} Out of {this.state.decisions.length}
                </Text> :
                <React.Fragment>
                    <FlipCard>
                        <Card style={{ elevation: 3 }}>
                            <H1>Question:</H1>
                            <CardItem>
                                <Body>
                                    <H1>{this.state.currentCard.question}</H1>
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={{ elevation: 3 }}>
                            <H1>Answer:</H1>
                            <CardItem>
                                <Body>
                                    <H1>{this.state.currentCard.answer}</H1>
                                </Body>
                            </CardItem>
                        </Card>
                    </FlipCard>
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-evenly',
                    }}>
                        <Button
                            title="Incorrect"
                            onPress={() => this._handleDecision('incorrect')}
                            color='red'
                        />
                        <Button
                            title="Correct"
                            onPress={() => this._handleDecision('correct')}
                            color='green'
                        />
                    </View>
                </React.Fragment>
        );
    }

    _handleDecision = (decision) => {
        this.state.decisions.push(decision);
        const { deck } = this.props.navigation.state.params;
        if (deck.cards.length === this.state.decisions.length){
            this.setState({isFinished: true})
        }

        this.setState({
            currentCard: deck.cards[this.state.currentPosition + 1],
            currentPosition: this.state.currentPosition + 1
        })
    }

    getCorrectDecisions = () => {
        const { decisions } = this.state;
        return decisions.filter((decision) => {
            return decision === 'correct';
        })
    }
}

export default Quiz;