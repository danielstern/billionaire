angular.module("BillionaireGame", [])
    .controller("BillionaireGame", function($scope,
        billionaireStocks, billionaireJobs, billionaireEvents, billionaireActions,
        $interval, $timeout
    ) {

        var session = undefined;
        var timer = undefined;

        var defaultStats = {
            player: {
                cash: 1000,
                karma: 0,
                stocks: [],
                stockHistory: [],
                realEstate: [],
                expenses: 1000,
                job: undefined,
                salary: undefined,
                age: 25,
                actionsTaken: [],
                comission: 29.95,
                businesses: [],
                salaryMultiplier: 0.95,
                incomeTaxMultiplier: 1.05,
                capitalGainsMultiplier: 1.05,
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
                capitalGainsTax: 0.2
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

            record: []
        }


        $scope.onmonth = function(l) {
            $scope.onMonthListeners = $scope.onMonthListeners || [];
            $scope.onMonthListeners.push(l);
        };

        $scope.onNewGameListeners = [];
        $scope.onnewgame = function(l) {
            $scope.onNewGameListeners.push(l);
            console.log("On new game...", $scope.onNewGameListeners);
        };

        function gameTick() {

            var player = session.player;
            var game = session.game;

            if (game.timeSinceLastEvent) game.timeSinceLastEvent--;

            session.world.month += 1;
            session.world.dollarValue /= (1 + ((session.game.inflation - 1) / 12));

            if (session.world.month > session.game.duration) {
                $scope.gameOver();
            }

            if (player.cash < -25000) {
                $scope.gameOver();
            }

            if (Math.random() * session.game.eventFrequency < 1) {
                $scope.eventHappens();
            }

            player.holdings = $scope.consolidateStocks();

            var income = player.job.salary / 12 * player.salaryMultiplier;
            var taxes = income * player.job.taxRate * player.incomeTaxMultiplier;

            player.cash += income;
            player.cash -= taxes;
            player.cash -= player.expenses;

            player.expenses *= (1 + ((session.game.inflation - 1) / 12));

            player.incomeThisMonth = income;
            player.taxesThisMonth = taxes;

            player.age += 1 / 12;



            _.each($scope.onMonthListeners, function(l) {
                l(session);
            })

        }

        $scope.gameOver = function() {
            console.log("Game over man!");
            $scope.broadcastMessage({
                title:"Game over man!",
                body:"You lose. Remember, the key to billions is compound rate of return!",
                ok: "Play again"
            })
         //   $scope.newGame();
            $interval.cancel(timer);
        }

         $scope.eventHappens = function() {
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


        $scope.pause = function pause() {
            $interval.cancel(timer);
            $scope.session.game.paused = true;
        };

        $scope.unpause = function unpause() {
            if ($scope.session.game.paused) timer = $interval(gameTick, $scope.session.game.speed);
            $scope.session.game.paused = false;
        }

        $scope.openConfirmJob = function(job) {
            $scope.prospectiveJob = job;

            $scope.pause();
            $('#takeJobModal').modal();
            $('#takeJobModal').on('hidden.bs.modal', function() {
                $scope.unpause();
            });

        }

        $scope.broadcastMessage = function(message) {
            $scope.worldMessage = message;

            $scope.pause();
            $('#worldMessageModal').modal();
            $('#worldMessageModal').on('hidden.bs.modal', function() {
                $scope.unpause();
            });

        }

        $scope.confirmTakeJob = function(job) {
            var player = $scope.session.player;
            if (player.job.onquit) player.job.onquit(session);
            player.job = job;
            if (job.effect) job.effect(session);
            $('#takeJobModal').modal('hide');
        }

        $scope.newGame = function () {

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

            $scope.onmonth(function(session) {

                var snapshot = _.clone(session);
                snapshot.monthEnding = {
                    income: session.player.incomeThisMonth,
                    taxes: session.player.taxesThisMonth
                }

                delete snapshot.record;

                session.record.push(snapshot);

            })


            $timeout(function() {
                _.each($scope.onNewGameListeners, function(l) {
                    l(session);
                })

                $scope.broadcastMessage({
                    title:"Welcome to Billionaire",
                    body:"You are a young delivery boy. You must work your way up the ladder and become a billionaire before time runs out. Try and make as much money as you can, but if you get too old, or get too much debt, it's game over."
                })
            }, 100);

          

            timer = $interval(gameTick, $scope.session.game.speed);
        }



        $scope.newGame();


    })
