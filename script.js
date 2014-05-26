angular.module("BillionaireGame", [])
    .controller("BillionaireGame", function($scope, 
     billionaireStocks, billionaireJobs, billionaireEvents,
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
                eventFrequency: 12,
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

            if (Math.random() * session.game.eventFrequency < 1) {
            	eventHappens();
            }

            player.cash += player.job.salary / 12;
            player.cash -= player.expenses;

            //if (session.world.month % 12 = 4)
        }

        function gameOver() {
            console.log("Game over man!");
            $interval.cancel(timer);
        }


        newGame();

        function eventHappens() {
        	var _event = _.sample(session.allEvents);
        	$scope.currentEventHappening = _event;
        	$scope.pause();	
        	console.log("Event is happening", _event);
        	$('#eventModal').modal();
        	$('#eventModal').on('hidden.bs.modal',function(){
        		console.log("Modal hidden")
        		$scope.unpause();
        	})	;
        	_event.effect(session);

        }

        function pause() {
        	$interval.cancel(timer);
        	$scope.session.game.paused = true;
        }

        function unpause() {
           if ($scope.session.game.paused) timer = $interval(gameTick, 400);
              	$scope.session.game.paused = false;
        }

        $scope.pause = pause;
        $scope.unpause = unpause;

        function newGame() {
            console.log("%c If I had a billion dollars", "color:#f0f");
            var stocks = _.clone(billionaireStocks);
            var jobs = _.clone(billionaireJobs);
            var events = _.clone(billionaireEvents);

            session = _.clone(defaultStats);
            session.market.stocks = stocks;
            session.allEvents = events;
            session.allJobs = jobs;

            var player = session.player;
            player.job = jobs[0];

            timer = $interval(gameTick, 400);

            $scope.session = session;
        }

    })
