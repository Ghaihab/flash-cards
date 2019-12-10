import React, {Component} from 'react';
import {Body, Card, CardItem, Container, Content, H1, Tab, Tabs, Text} from "native-base";
import {Button, TouchableOpacity} from "react-native";
import {_deleteDeck, _getDecks} from "../utils/_DATA";
import AddDeck from "./AddDeck";

class Decks extends Component {
    static navigationOptions = {
        title: 'Mobile Flash Cards',
    };

    constructor(props) {
        super(props);
        this.state = {
            decks: [],
            currentTab: 0,
        }
    }

    componentDidMount() {
        this._fetchDecks();
    }

    static getDerivedStateFromProps(nextProps, prevState){
       let decks = prevState.decks;
       let currentTab = prevState.currentTab;

       if (nextProps.navigation.state.params){
           decks = nextProps.navigation.state.params.decks;
           currentTab = nextProps.navigation.state.params.currentTab;
       }
        return {
            decks: decks,
            currentTab: currentTab
        }
    }


    render() {
        const { navigate } = this.props.navigation;
        const { decks, currentTab } = this.state;
        return (
            <Container>
                <Tabs page={currentTab}>
                    <Tab heading="Decks">
                        <Container>
                            <Content scrollEnabled={true}>
                                {decks.length ? decks.map((deck, index) => {

                                    return <TouchableOpacity key={deck.id} onPress={() => navigate('DeckDetails', {
                                        deck
                                    })}>
                                        <Card style={{ elevation: 3 }}>
                                            <CardItem>
                                                <Body>
                                                    <H1>
                                                        {deck.title}
                                                    </H1>
                                                    <Text note>
                                                        Number of cards: {deck.cards.length}
                                                    </Text>
                                                    <Button title='Delete Deck' color='red'  onPress={() => this._handleDelete(deck.id)}/>
                                                </Body>

                                            </CardItem>
                                        </Card>
                                    </TouchableOpacity>
                                }): <Text>Please add a new Deck</Text>}
                            </Content>
                        </Container>
                    </Tab>
                    <Tab heading="Add Deck">
                        <AddDeck navigate={navigate}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }

    _handleDelete = (deckId) => {

        _deleteDeck(deckId).then((decks) => {
            this.setState({decks});
        })
    }

    _fetchDecks = () => {
        _getDecks().then((decks) => {
            this.setState({decks: decks})
        })
    }
}

export default Decks;