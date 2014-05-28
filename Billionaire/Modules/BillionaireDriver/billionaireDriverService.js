angular.module("BillionaireGame.Driver")
.service('billionaireDriverService', function() {

        this.onNewGameListeners = [];
        this.onMonthListeners = [];

        this.onmonth = function(l) {
            this.onMonthListeners = $scope.onMonthListeners || [];
            this.onMonthListeners.push(l);
        };

        this.onnewgame = function(l) {
            this.onNewGameListeners.push(l);
        };

        this.gameTick = function(session) {

            _.each(driver.onMonthListeners, function(l) {
                l(session);
            })

        };

        this.onGameTick(function(session){

            var driver = this;
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

        })

        this.gameOver = function() {
            console.log("Game over man!");
            $scope.broadcastMessage({
                title: "Game over man!",
                body: "You lose. Remember, the key to billions is compound rate of return!",
                ok: "Play again"
            })

            $interval.cancel(timer);
        }

        this.onnewgame(function(session){
            timer = $interval(driver.gameTick, session.game.speed);


            /*  $scope.broadcastMessage({
                title:"Welcome to Billionaire",
                body:"You are a young delivery boy. You must work your way up the ladder and become a billionaire before time runs out. Try and make as much money as you can, but if you get too old, or get too much debt, it's game over."
            })*/

        });


        this.pause = function pause() {
            $interval.cancel(timer);
            $scope.session.game.paused = true;
        };

        this.unpause = function unpause() {
            if ($scope.session.game.paused) timer = $interval(gameTick, $scope.session.game.speed);
            $scope.session.game.paused = false;
        }

        var timer = undefined;

        this.newGame = function() {

            var session = billionaireSessionCreateService.getNewSession();
            $timeout(function() {
                _.each(driver.onNewGameListeners, function(l) {
                    l(session);
                })
            }, 100);

            return session;
            
        }
    })
