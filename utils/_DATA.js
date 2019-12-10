let decks = [
    {
        id: generateUID(),
        title: 'first title',
        cards: [
            {
                question:'first question',
                answer:'first answer'
            },
            {
                question:'second question',
                answer:'first answer'
            },
            {
                question:'third question',
                answer:'first answer'
            }
        ]
    },
    {
        id: generateUID(),
        title: 'second title',
        cards: [
            {
                question:'first question',
                answer:'first answer'
            }
        ]
    }
];

function generateUID () {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function _getDecks () {
    return new Promise((res, rej) => {
        setTimeout(() => res(decks), 1000)
    })
}

export function _saveDeck (title) {
    return new Promise((res, rej) => {

        setTimeout(() => {
            decks.push({
                id: generateUID(),
                title: title,
                cards:[]
            });
            res(decks);
        }, 1000)
    })
}

export function _deleteDeck(deckId) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            decks = decks.filter((deck, index) => {
                return deck.id !== deckId;
            });
            res(decks);
        })
    })
}

export function _saveCard(question, answer, deck) {

    return new Promise((res, rej) => {
        setTimeout(() => {
            deck.cards.push({
                question: question,
                answer: answer
            });

            decks[decks.findIndex(_deck => _deck.id === deck.id)] = deck;
            res(deck)
        }, 1000)
    })
}
