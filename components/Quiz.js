import React, {Component} from 'react';
import {Body, Card, CardItem, H1} from "native-base";
import FlipCard from "react-native-flip-card";
import {Button, View, Text } from "react-native";
import { clearLocalNotification, setLocationNotification } from "../utils/helpers";

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
            currentPosition: 0,
            deck: {},
            fliped: false,
            actionLabel: 'Show Answer'
        };
    }

    componentDidMount() {
        const { deck } = this.props.navigation.state.params;
        this.setState({
            deck: deck,
            currentCard: deck.cards[0]
        })
    }

    render() {
        if (this.state.isFinished){
            clearLocalNotification().then(setLocationNotification);
        }

        return (
                this.state.isFinished ?
                    <React.Fragment>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <Text>
                                Your Score is : {this.getCorrectDecisions().length} Out of {this.state.decisions.length}
                            </Text>
                        </View>
                        <View style={{
                            flex: 1,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center'
                        }}>
                            <Button title='Reset Quiz' color='blue' onPress={this._reset}/>
                            <Button title='Back to Deck' color='blue' onPress={this._backToDeck}/>
                        </View>
                    </React.Fragment>
                  :
                    <React.Fragment>
                        <Text>Questions Remaining : {this.getRemainingQuestions()}</Text>
                        <FlipCard
                            flipVertical={false}
                            flipHorizontal={true}
                            flip={this.state.fliped}
                            clickable={false}
                        >
                            <Card>
                                <H1>Question:</H1>
                                <CardItem>
                                    <Body>
                                        <H1>{this.state.currentCard.question}</H1>
                                    </Body>
                                </CardItem>
                            </Card>
                            <Card>
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
                                title={this.state.actionLabel}
                                onPress={this._flip}
                                color='blue'
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
        const { deck } = this.state;
        if (deck.cards.length === this.state.decisions.length){
            this.setState({isFinished: true})
        }

        this.setState({
            currentCard: deck.cards[this.state.currentPosition + 1],
            currentPosition: this.state.currentPosition + 1,
            fliped: false,
            actionLabel: 'Show Answer'
        })
    }

    getCorrectDecisions = () => {
        const { decisions } = this.state;
        return decisions.filter((decision) => {
            return decision === 'correct';
        })
    }

    getRemainingQuestions = () => {
        if(this.state.deck.cards){
            return this.state.deck.cards.length - this.state.decisions.length;
        }
        return 0;
    }

    _reset = () => {
        const { deck } = this.state;
        this.setState({
            decisions: [],
            isFinished: false,
            currentCard: deck.cards[0],
            currentPosition: 0,
        });
    }

    _backToDeck = () => {
        const { deck } = this.state;
        this.props.navigation.navigate('DeckDetails', { deck });
    }

    _flip = () => {
        let actionLabel = '';

        if (this.state.fliped){
            actionLabel = 'Show Answer';
        } else {
            actionLabel = 'Show Question';
        }

        this.setState({
            fliped: !this.state.fliped,
            actionLabel
        });
    }

}

export default Quiz;