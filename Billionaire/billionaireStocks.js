angular.module("BillionaireGame")
    .service("billionaireStocks", function() {
        var stocks = [{
            name: "Evil Corporation",
            symbol: "EVL",
            category: "finance",
            growthRate: 1.12,
            bookValue: "40",
        }, {
            name: "Modulus Inc",
            symbol: "MOD",
            category: "technology",
            growthRate: 1.22,
            bookValue: "12"
        }]

        return stocks;
    })
