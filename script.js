angular.module("BillionaireGame", [])
    .controller("BillionaireGame", function($scope, billionaireStocks, $interval) {

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
                karma: 0,
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
            market: {
            	stocks: undefined
            },
            game: {
                paused: false,
                difficulty: 1,
                duration: 500,
                inflation: 1.02
            }
        }

        function gameTick() {
            session.world.month += 1;
            session.world.dollarValue /= 1 + ((session.game.inflation - 1) / 12);

            _.each(session.market.stocks,function(stock){
            	stock.bookValue = stock.bookValue * 1 + ((stock.growthRate - 1) / 12)
            })


            console.clear();
            console.log("STOCKS?" ,session.market.stocks[0]);
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
            var stocks = _.clone(billionaireStocks);

            session = _.clone(defaultStats);
            session.market.stocks = stocks;

            timer = $interval(gameTick, 100);

            $scope.session = session;
        }

    })
