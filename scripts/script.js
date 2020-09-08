$(document).ready(() => {
    $('#btn-shuffle').click(() => {
        const inputTables = parseInt($('#input-tables').val());
        const inputPlayers = parseInt($('#input-players').val());
        const tables = generateTables(inputTables, inputPlayers);

        if (inputTables && inputPlayers) {
            displayTables(tables);
        } else {
            console.log('Fill in all fields.');
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

// FS table display.
const displayTables = (tbls) => {
    shuffle(tbls);
    for (let i = 0; i < tbls.length; i++) {
        const players = tbls[i].players; // Players.

        // Table elements + data.
        const col = '<div class="mt-5">';
        const t = `<table class="table table-striped table-bordered" id="t${i}">`;
        const th1 = `<thead class="table-dark"><th><th>${tbls[i].name}<th><tr>`;
        const th2 = `<thead><th>#<th>cards<th>score`;
        const tb = `<tbody id="tb${i}">`;

        // Append elements to div.
        $('#div-tables').append(col + t + th1 + th2 + tb);

        // For each player.
        for (let j = 0; j < players.length; j++) {
            const playerName = players[j].name; // Players name & hand.
            const playerHand = players[j].hand;
            let score = 0; // Total score.

            // Table row elements + data (+ids).
            const trows = `<tr>`;
            const tdplayername = `<td>${playerName}`;
            const tdplayerhand = `<td id="tdp${i}h${j}">`;
            const tdplayerscore = `<td id="tdp${i}s${j}">`;

            // Append elements to corresponding body.
            $('#tb' + i).append(trows + tdplayername + tdplayerhand + tdplayerscore);

            // For each card.
            for (let k = 0; k < playerHand.length; k++) {
                const card = `${playerHand[k].name} of ${playerHand[k].suit} `;
                $('#tdp' + i + 'h' + j).append(card); // Append all cards.
                score += parseInt(playerHand[k].value); // Sum of values for all cards.
            }
            $('#tdp' + i + 's' + j).append(score); // Append total score once (per player).
        }
    }
} 