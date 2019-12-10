import React, {Component} from 'react';
import {Item, Input, Container, Content, Form, Text} from 'native-base';
import {Button} from "react-native";
import {_saveDeck} from "../utils/_DATA";

class AddDeck extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: ''
        };
    }

    render() {

        return (
            <Container>
                <Content>
                    <Text>What is the title of your new Deck ? </Text>
                    <Form>
                        <Item>
                            <Input placeholder="Title" onChange={(event) => this.setState({title: event.nativeEvent.text})}/>
                        </Item>
                    </Form>
                    <Button title="Create Deck" onPress={this.createDeck}/>
                </Content>
            </Container>
        );
    }

    createDeck = () => {
        if(!this.state.title){
            alert('title is required');
        }

        _saveDeck(this.state.title).then((decks) => {
            this.props.navigate('Home', {decks, currentTab: 0})
        });

    }
}

export default AddDeck;