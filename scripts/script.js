$(document).ready(() => {

})

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

// Generate tables.
const generateTables = (amountOfTables, amountOfPlayersPerTable) => {
    let tables = [];
    let table = {};

    for (let i = 0; i < amountOfTables; i++) {
        table = {
            name: 'T' + (i + 1),
            players: [],
            dealer: 'D',
            cards: generateDeck(4)
        }
        for (let j = 0; j < amountOfPlayersPerTable; j++) {
            table.players.push({
                name: 'P' + j,
                hand: [] // Hand for every player.
            })
        }
        tables.push(table);
    }

    return tables
}

// Splice card out of array.
const pickCard = (crds, hnd) => {
    hnd.push(...crds.splice(Math.floor(Math.random() * crds.length), 1));
}

// Shuffle first 2 cards.
const shuffle = (tbls) => {
    for (let i = 0; i < 2; i++) {
        for (let j = 0; j < tbls.length; j++) {
            for (let k = 0; k < tbls[j].players.length; k++) {
                pickCard(tbls[j].cards, tbls[j].players[k].hand); // [k][0] because of nesting.
            }
        }
    }
}

const tbls = generateTables(5, 6);
shuffle(tbls);
console.log(tbls)

