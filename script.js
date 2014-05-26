angular.module("BillionaireGame", [])
    .controller("BillionaireGame", function($scope,
        billionaireStocks, billionaireJobs, billionaireEvents, billionaireActions,
        $interval) {

        var session = undefined;
        var timer = undefined;

        var defaultStats = {
            player: {
                cash: 10000,
                karma: 0,
                stocks: [],
                realEstate: [],
                expenses: 1000,
                job: undefined,
                salary: undefined,
                actionsTaken: [],
                businesses: [],
                incomeTaxMultiplier: 1.05,
            },
            world: {
                month: 1,
                dollarValue: 1,
            },
            stats: {
                rateOfReturn: undefined
            },
            market: {
                stocks: undefined,
                marketAdjustment: 1.05,
            },
            game: {
                paused: false,
                difficulty: 1,
                marketMoodRange: {
                    min: 0.9,
                    max: 1.1
                },
                eventCoolDownMonths: 12,
                timeSinceLastEvent: 10,
                duration: 500,
                eventFrequency: 24,
                speed: 1000,
                inflation: 1.02
            },
            onMonthListeners: [],
            onmonth: function(l) {
                session.onMonthListeners.push(l);
                if ($scope.$root.$$phase != '$apply' && $scope.$root.$$phase != '$digest') {
                    console.log("Applying month")
                    $scope.$apply();
                }
            },
            record: []
        }

            function gameTick() {
                var player = session.player;
                var game = session.game;

                if (game.timeSinceLastEvent) game.timeSinceLastEvent--;

                session.world.month += 1;
                session.world.dollarValue /= (1 + ((session.game.inflation - 1) / 12));

                var marketMood = Math.random() * (game.marketMoodRange.max - game.marketMoodRange.min) + game.marketMoodRange.min;


                _.each(session.market.stocks, function(stock) {
                    stock.bookValue = stock.bookValue * (1 + ((stock.growthRate - 1) / 12));
                    stock.price = stock.bookValue * session.market.marketAdjustment;
                    stock.price *= marketMood;
                })

                if (session.world.month > session.game.duration) {
                    gameOver();
                }

                if (Math.random() * session.game.eventFrequency < 1) {
                    eventHappens();
                }

                var income = player.job.salary / 12;
                var taxes = income * player.job.taxRate * player.incomeTaxMultiplier;


                player.cash += income;
                player.cash -= taxes;
                player.cash -= player.expenses;

                var snapshot = _.clone($scope.session);
                snapshot.monthEnding = {
                    income: income,
                    taxes: taxes
                }

                delete snapshot.record;

                _.each(session.onMonthListeners, function(l) {
                    l(session);
                })

                $scope.session.record.push(snapshot);

            }

            function gameOver() {
                console.log("Game over man!");
                $interval.cancel(timer);
            }


        newGame();

        function eventHappens() {
            var game = $scope.session.game;

            if (game.timeSinceLastEvent) return;

            var _event = _.sample(session.allEvents);

            $scope.currentEventHappening = _event;

            $scope.pause();
            $('#eventModal').modal();
            $('#eventModal').on('hidden.bs.modal', function() {
                $scope.unpause();
            });

            _event.effect(session);

            game.timeSinceLastEvent = game.eventCoolDownMonths;

        }

        $scope.openConfirmAction = function(action) {
            console.log("Confirming ", action);

            $scope.currentActionHappening = action;

            $scope.pause();
            $('#actionsModal').modal();
            $('#actionsModal').on('hidden.bs.modal', function() {
                $scope.unpause();
            });

        }



        $scope.confirmTakeAction = function(action) {
            console.log("Confirming", action);
            $scope.doAfterMonths(action.effect, action.time);

            action.timeRemaining = action.time;

            $('#actionsModal').modal('hide');

            $scope.session.player.cash -= action.cost;

            $scope.session.player.actionsTaken.push(action);
            action.purchased = true;

            var done = false;
            var monthStarted = $scope.session.world.month;


            session.onmonth(function(session) {

                if (action.completed) return;
                action.timeRemaining--;
                if (!action.timeRemaining) {
                    action.effect($scope.session);
                    action.completed = true;
                }
            })

        }

        $scope.doAfterMonths = function(action, months) {




        }

        function pause() {
            $interval.cancel(timer);
            $scope.session.game.paused = true;
        }

        function unpause() {
            if ($scope.session.game.paused) timer = $interval(gameTick, $scope.session.game.speed);
            $scope.session.game.paused = false;
        }

        $scope.pause = pause;
        $scope.unpause = unpause;

        function newGame() {

            var stocks = _.clone(billionaireStocks);
            var jobs = _.clone(billionaireJobs);
            var events = _.clone(billionaireEvents);
            var actions = _.clone(billionaireActions);

            session = _.clone(defaultStats);
            session.market.stocks = stocks;
            session.allEvents = events;
            session.allActions = actions;
            session.allJobs = jobs;

            var player = session.player;
            player.job = jobs[0];

            $scope.session = session;

            timer = $interval(gameTick, $scope.session.game.speed);
        }

    })
