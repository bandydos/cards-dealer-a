$(document).ready(() => {
    console.log('ready');
    const deck = generateDeck();
    console.log(deck);
})

const generateDeck = () => {
    let deck = [];
    const suits = ['Spades', 'Clubs', 'Diamonds', 'Hearts'];
    const names = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'];
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10];

    for (let i = 0; i < suits.length; i++) {
        for (let j = 0; j < names.length; j++) {
            let card = {
                suit: suits[i],
                name: names[j],
                value: values[j]
            }
            deck.push(card);
        }
    }

    return deck;
}

