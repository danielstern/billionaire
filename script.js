angular.module("BillionaireGame", [])
    .controller("BillionaireGame", function($scope, 
     billionaireStocks, billionaireJobs,
     $interval) {

        var session = undefined;
        var timer = undefined;

        var defaultStats = {
            player: {
                cash: 100,
                karma: 0,
                stocks: [],
                realEstate: [],
                expenses: 1000,
                job: undefined,
                salary: undefined,
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
            var player = session.player;

            session.world.month += 1;
            session.world.dollarValue /= (1 + ((session.game.inflation - 1) / 12));


            _.each(session.market.stocks,function(stock){
            	stock.bookValue = stock.bookValue * (1 + ((stock.growthRate - 1) / 12));
            	stock.price = stock.bookValue;
            })

            if (session.world.month > session.game.duration) {
                gameOver();
            }

            player.cash += player.job.salary / 12;
            player.cash -= player.expenses;

            //if (session.world.month % 12 = 4)
        }

        function gameOver() {
            console.log("Game over man!");
            $interval.cancel(timer);
        }

        $scope.openBuyStockModal = function(stock) {
        	console.log("buying stock",stock);
        	$scope.currentBuyingStock = stock;
        	$scope.currentStockBuyCount = 10;
        	$('#stockBuyModal').modal();

        	pause();
        }

        $scope.confirmBuyStock = function(stock,count) {
        	console.log("Confirm buying of...", stock,count);
        	$('#stockBuyModal').modal('hide');
        	session.player.stocks.push({
        		date:session.world.month,
        		count: count,
        		name: stock.name,
        		symbol: stock.symbol,
        		price: stock.price
        	})

        	session.player.cash -= stock.price * count;
        	$('#confirmStockBuyModal').modal();
        }

        newGame();

        function pause() {
        	$interval.cancel(timer);
        }

        function unpause() {
            timer = $interval(gameTick, 400);
        }

        $scope.unpause = unpause;

        function newGame() {
            console.log("%c If I had a billion dollars", "color:#f0f");
            var stocks = _.clone(billionaireStocks);
            var jobs = _.clone(billionaireJobs);

            session = _.clone(defaultStats);
            session.market.stocks = stocks;
            session.allJobs = jobs;

            var player = session.player;
            player.job = jobs[0];

            timer = $interval(gameTick, 400);

            $scope.session = session;
        }

    })
.controller("StockInfo",function($scope){

})
