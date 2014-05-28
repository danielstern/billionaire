angular.module("BillionaireGame.driver")
.service("billionaireInitService",function(){
	
        var session = undefined;
        var timer = undefined;

        var defaultStats = {
            player: {
                cash: 1000,
                karma: 0,
                stocks: [],
                stockHistory: [],
                realEstate: [],
                loans: [],
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
                getTotalAssets: function() {
                    var netWorth = 0;
                    netWorth += this.cash;
                    netWorth += this.getTotalStockValue();
                    return netWorth;
                },
                getTotalStockValue: function() {
                    var stockValue = 0;
                    _.each(this.stocks,function(stock){
                        stockValue += stock.link.price;
                    });
                    return stockValue;

                },
                getCashflow: function() {
                    var cashflow = 0;
                    cashflow = this.job.salary / 12 - this.expenses - this.getMonthlyDebtService();
                    return cashflow;

                },
                getMonthlyDebtService: function() {
                    var debtService = 0;
                    _.each(this.loans,function(loan){
                        debtService += loan.balance * loan.interestRate / 12;
                    });
                    return debtService;
                },
                getTotalDebt: function() {
                    var totalDebt = 0;
                    _.each(this.loans,function(loan){
                        totalDebt += loan.balance;
                    })
                    return totalDebt;
                },
                getNetWorth: function() {
                    return this.getTotalAssets() - this.getTotalDebt();
                }
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
        };

        $scope.gameTick() {

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


        $scope.pause = function pause() {
            $interval.cancel(timer);
            $scope.session.game.paused = true;
        };

        $scope.unpause = function unpause() {
            if ($scope.session.game.paused) timer = $interval(gameTick, $scope.session.game.speed);
            $scope.session.game.paused = false;
        }

        $scope.newGame = function () {

            var stocks = _.clone(billionaireStocks);
            var jobs = _.clone(billionaireJobs);
            var events = _.clone(billionaireEvents);
            var actions = _.clone(billionaireActions);
            var loans = _.clone(billionaireLoans);

            session = _.clone(defaultStats);
            session.market.stocks = stocks;
            session.allEvents = events;
            session.allActions = actions;
            session.allJobs = jobs;
            session.allLoans = loans;

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

              /*  $scope.broadcastMessage({
                    title:"Welcome to Billionaire",
                    body:"You are a young delivery boy. You must work your way up the ladder and become a billionaire before time runs out. Try and make as much money as you can, but if you get too old, or get too much debt, it's game over."
                })*/
            }, 100);

          

            timer = $interval(gameTick, $scope.session.game.speed);
        }



        $scope.newGame();

})