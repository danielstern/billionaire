angular.module("BillionaireGame.Loans")
    .service("billionaireLoansDefinitions", function() {
        var loans = [{
            name: "Consumer Loan",
            interestRate: 0.28,
            amort: 36,
            getAvailableCredit: function(session) {
                var player = session.player;
                return session.player.job.salary / 2 + player.getTotalAssets() / 2 - player.getTotalDebt() * 1.5;
            },
            requirement: function() {return true},
            description: "No credit? No problem. At only 28% interest per annum, you'll barely feel this loan - especially since you'll be too busy toiling away in the salt mines to notice or care.",
            technical: "28% Interest, Compounded Monthly"
        },{
            name: "Bank Loan",
            interestRate: 0.19,
            requirement: function(session) {
                if (session.player.getNetWorth() > 50000) return true
            },
            getAvailableCredit: function(session) {
                var player = session.player;
                return session.player.job.salary / 2 + player.getTotalAssets() / 2 - player.getTotalDebt() * 1.5;
            },
            requirementMessage: "You must have a net worth of $50000 or more to qualify for this loan",
            description: "A greatly improved version of the consumer loan for the more discriminating investor.",
            technical: "23% Interest, Compounded Monthly"
        }]

        return loans;
    })
