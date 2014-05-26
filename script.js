
var session = undefined;
var timer = undefined;

var defaultStats = {
    player: {
        cash: 100,
        stocks: [{
            symbol: "lol",
            purchased: "00000",
            cost: "100"
        }],
        realEstate: [],
        businesses: []
    },
    world: {
        month: 1,
        dollarValue: 1,
    },
    stats: {
        rateOfReturn: undefined
    },
    game: {
    	paused: false,
    	difficulty: 1,
    	duration: 500,
    	inflation: 1.02
    }
}

function gameTick() {
    //	console.log("TICK");
    session.world.month += 1;
    session.world.dollarValue /= 1 + ((session.game.inflation - 1)  /12);
    console.clear();
    console.log(session.world);

    if (session.world.month > session.game.duration) {
    	gameOver();
    }
}

function gameOver() {
	console.log("Game over man!");
	clearInterval(timer);
}

newGame();

function newGame() {
	console.log("%c If I had a billion dollars", "color:#f0f");
	session = _.clone(defaultStats);
	timer = setInterval(gameTick, 100);
}