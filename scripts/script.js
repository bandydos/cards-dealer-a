$(document).ready(() => {
    $('#btn-shuffle').click(() => {
        const inputTables = parseInt($('#input-tables').val());
        const inputPlayers = parseInt($('#input-players').val());
        if (inputTables && inputPlayers) {
            const tables = generateTables(inputTables, inputPlayers);
            shuffle(tables);
            for (let i = 0; i < tables.length; i++) {
                const col = '<div class="col-6 mt-5 bg-info">'; // Some problems
                const t = `<table class="table" id="t${i}">`;
                const th = `<thead><th>${tables[i].name}<tr><th>#<th>cards`;
                const tb = `<tbody class="bg-danger" id="tb${i}">`

                $('#div-tables').append(col + t + th + tb)

                const players = tables[i].players;
                for (let j = 0; j < players.length; j++) {
                    const playerName = players[j].name;
                    const playerHand = players[j].hand;
                    const tbodyPlayerName = `<tr><td>${playerName}`;
                    $('#tb' + i).append(tbodyPlayerName)
                    for (let k = 0; k < playerHand.length; k++) {
                        const card = `${playerHand[k].name} of ${playerHand[k].suit}`;
                        const tbodyPlayerCards = `<td>${card}`;
                        $('#tb' + i).append(tbodyPlayerCards)
                    }
                }
            }
        } else {
            console.log('error')
        }
    })
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
                name: 'P' + (j + 1),
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
                pickCard(tbls[j].cards, tbls[j].players[k].hand);
            }
        }
    }
}
