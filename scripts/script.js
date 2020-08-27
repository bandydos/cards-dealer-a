$(document).ready(() => {

})

const ani = ['pard', 'monkey', 'baby', 'gorilla', 'kaka', 'blabla']

const generateDeck = (amountOfDecks) => {
    let deck = [];
    const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
    const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];
    for (let i = 0; i < amountOfDecks; i++) {
        for (let j = 0; j < suits.length; j++) {
            for (let k = 0; k < names.length; k++) {
                let card = {
                    suit: suits[j],
                    name: names[k],
                    value: values[k]
                }
                deck.push(card);
            }
        }
    }

    return deck;
}



// Shuffle first 2 cards.
const shuffle = (tbls) => {
    for (let i = 0; i < tbls.length; i++) {
        for (let j = 0; j < tbls[i].players.length; j++) {
            spliceCard(tbls[i].cards, tbls[i].players[j]); // ? Players apart in object
        }
    }
}

const spliceCard = (crds, hnd) => {
    hnd.push(...crds.splice(Math.floor(Math.random() * crds.length), 1));
}

const generateTables = (amountOfTables) => {
    let tables = [];

    for (let i = 0; i < amountOfTables; i++) {
        let table = {
            name: 'T' + (i + 1),
            players: [[], [], [], [], [], []],
            dealer: 'D',
            cards: generateDeck(4)
        }
        tables.push(table);
    }

    return tables
}

const tbls = generateTables(2);
console.log(tbls);
shuffle(tbls);
console.log(tbls)
