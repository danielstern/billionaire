angular.module("BillionaireGame")
    .service("billionaireLoans", function() {
        var loans = [{
            name: "Consumer Loan",
            interestRate: 0.28,
            amort: 36,
            requirement: function() {return true},
            description: "No credit? No problem. At only 28% interest per annum, you'll barely feel this loan - especially since you'll be too busy toiling away in the salt mines to notice or care.",
        }]

        return loans;
    })
