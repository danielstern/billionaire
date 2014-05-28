angular.module("BillionaireGame.stocks")
    .service("billionaireStocksDefinitions", function() {
        var stocks = [{
            name: "Evil Corporation",
            symbol: "EVL",
            description: "Founded on a proud legacy of piracy and human rights violation, Evil Corporation continues to boast solid management and a good year-on-year return.",
            category: "finance",
            growthRate: 1.12,
            bookValue: 40,
        }, 
        {
            name: "The Friendship Society",
            symbol: "FRND",
            description: "You'll never find a more a wretched hive of scum and villainy.",
            category: "finance",
            growthRate: 1.1,
            bookValue: 150
        },
        {
            name: "Modulus Inc",
            symbol: "MOD",
            description: "No one really knows what they do.",
            category: "technology",
            growthRate: 1.22,
            bookValue: 12
        }, {
            name: "Bitcoin Ventures",
            symbol: "BTCV",
            description: "Invest in the intrinsic value of incomprehensible strings of letters and numbers",
            category: "technology",
            growthRate: 1.21,
            bookValue: 5
        }, 
        {
            name: "International Airplanes",
            symbol: "ARPLN",
            description: "Running an air travel monopoly is tough work, but hefty executive bonuses ensure the board's efforts don't go unrewarded.",
            category: "finance",
            growthRate: 1.05,
            bookValue: 72
        }]

        return stocks;
    })
