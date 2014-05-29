angular.module("BillionaireGame.Driver")
.service('billionaireDriverService', function(
    billionaireSessionCreateService,
    billionaireWorldMessageService,
    $timeout, $interval ) {


        this.onNewGameListeners = [];
        this.onMonthListeners = [];

        var driver = this;  
        var session = undefined;

        this.onmonth = function(l) {
            this.onMonthListeners = this.onMonthListeners || [];
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

        this.onmonth(function(session){

            var driver = this;
            var player = session.player;
            var game = session.game;
            
            //debugger;

            if (game.timeSinceLastEvent) game.timeSinceLastEvent--;

            session.world.month += 1;
            session.world.dollarValue /= (1 + ((session.game.inflation - 1) / 12));

            if (session.world.month > session.scenario.duration) {
                driver.gameOver();
            }

            if (player.cash < session.scenario.minimum) {
                driver.gameOver();
            }

            if (player.cash > session.scenario.required) {
                driver.youWin();
            }

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
            
            billionaireWorldMessageService.broadcastMessage({
                title: "Game over man!",
                body: "You lose. Remember, the key to billions is compound rate of return!",
                ok: "Play again"
            })

            $interval.cancel(timer);
        }

        this.onnewgame(function(session){
            driver.unpause(true);
            billionaireWorldMessageService.broadcastMessage({
                title:"Welcome to Billionaire",
                body:"Can you make investments smartly enough to achieve your dreams of wealth before time runs out? As months pass, you will earn money from your job, but unless you buy stocks, you will never become rich enough in time."
            });

        });

        this.youWin = function() {
            console.log("You win, man!");
            
            /*$scope.broadcastMessage({
                title: "Game over man!",
                body: "You lose. Remember, the key to billions is compound rate of return!",
                ok: "Play again"
            })*/

            $interval.cancel(timer);
        }


        this.pause = function pause() {
            $interval.cancel(timer);
            session.game.paused = true;
        };

        this.unpause = function unpause(initing) {
            if (session.game.paused || initing) timer = $interval(function(){driver.gameTick(session)}, session.game.speed);
            session.game.paused = false;
        }

        var timer = undefined;

        this.newGame = function() {

            session = billionaireSessionCreateService.getNewSession();
            $timeout(function() {
                _.each(driver.onNewGameListeners, function(l) {
                    l(session);
                })
            }, 100);

            return session;
            
        }
    })
