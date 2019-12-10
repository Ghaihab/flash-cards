import React, {Component} from 'react';
import { Container, Content, Form, Item, Input} from "native-base";
import { Button, View } from 'react-native';
import {_saveCard} from "../utils/_DATA";

class AddCard extends Component {

    static navigationOptions = {
        title: 'Add new Card',
    };

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            answer: ''
        }
    }

    render() {

        return (
            <Container>
                <Content>
                    <Form>
                        <Item>
                            <Input placeholder="Question" onChange={(event) => this.setState({question: event.nativeEvent.text})}/>
                        </Item>
                        <Item>
                            <Input placeholder="Answer" onChange={(event) => this.setState({answer: event.nativeEvent.text})}/>
                        </Item>
                        <View>
                            <Button title='Save' onPress={this._handleSave}/>
                        </View>
                    </Form>
                </Content>
            </Container>
        );
    }

    _handleSave = () => {
        let { question, answer } = this.state;
        const { deck } = this.props.navigation.state.params;
        const { navigate } = this.props.navigation;

        if(! question){
            alert('Question is required');
            return;
        }
        if(! answer){
            alert('Answer is required');
            return;
        }
        _saveCard(question, answer, deck).then((deck) => {
            navigate('DeckDetails', {
                deck
            })
        });
    }
}

export default AddCard;