angular.module("BillionaireGame.Driver")
.service("billionaireSessionCreateService",function(
    billionaireJobsDefinitions
    /*billionaireStocksDefintions,
    billionaireLoansDefinitions,
    billionaireActionsDefinitions,
    billionaireEventsDefinitions*/
    ){

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
                _.each(this.stocks, function(stock) {
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
                _.each(this.loans, function(loan) {
                    debtService += loan.balance * loan.interestRate / 12;
                });
                return debtService;
            },
            getTotalDebt: function() {
                var totalDebt = 0;
                _.each(this.loans, function(loan) {
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

    this.getNewSession = function() {

        var session = _.clone(defaultStats);

        var jobs = _.clone(billionaireJobsDefinitions);
        try {
        var stocks = _.clone(billionaireStocksDefinitions);
        var events = _.clone(billionaireEventsDefinitions);
        var actions = _.clone(billionaireActionsDefinitions);
        var loans = _.clone(billionaireLoansDefinitions);

        session.market.stocks = stocks;
        session.allEvents = events;
        session.allActions = actions;
        session.allJobs = jobs;
        session.allLoans = loans;

        } catch (e) {
            console.warn("Error forming game. Forcing");
        }

        var player = session.player;
        player.job = jobs[0];

        return session;
    }

})