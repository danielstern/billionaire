angular.module("BillionaireGame.Stocks")
    .service("billionaireStocksDefinitions", function() {
        // finance stocks:
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
            growthRate: 1.15,
            bookValue: 12
        },  
        {
            name: "International Airplanes",
            symbol: "ARPLN",
            description: "Running an air travel monopoly is tough work, but hefty executive bonuses ensure the board's efforts don't go unrewarded.",
            category: "transportation",
            growthRate: 1.05,
            bookValue: 72
        },{
            name: "Trans-Monopolary Railways",
            symbol: "TMR",
            description: "They're the only railroad company there is, period.",
            category: "transportation",
            growthRate: 1.03,
            bookValue: 150,
        },{
            name: "Sam's Friendly Hydro Company",
            symbol: "SFHC",
            description: "They won't break your windows if you don't pay. That's the, uh, other Sam's Friendly Hydro.",
            category: "utility",
            growthRate: 0.98,
            bookValue: 135,
        },{
            name: "Hospitals R Us",
            symbol: "HRUS",
            description: "We turn injury and illness into a profitable industry.",
            category: "health",
            growthRate: 1.02,
            bookValue: 29,
        },{
            name: "Bitcoin Ventures",
            symbol: "BTCV",
            description: "Invest in the intrinsic value of incomprehensible strings of letters and numbers",
            category: "technology",
            growthRate: 1.16,
            bookValue: 5
        },{
            name: "Sun King Solar Energy Inc",
            symbol: "SNKG",
            description: "We own your roof.",
            category: "energy",
            growthRate: 1.10,
            bookValue: 1.12,
        },{
            name: "Last Stop Funeral Homes",
            symbol: "LSFH",
            description: "The last funeral home you'll ever visit.",
            category: "services",
            growthRate: 1.12,
            bookValue: 315,
        },{
            name: "Quick and Easy Mine Corporation",
            symbol: "QE",
            description: "They make mining quick and easy, and not by relying on forced, I mean, uh, volunteer, labor.",
            category: "services",
            growthRate: 1.12,
            bookValue: 315,
        },{
            name: "Winslow-Haverdash Inc.",
            symbol: "WH",
            description: "Manufacturers of everything from bombs to guns to different kinds of guns, you can depend on a healthy return thanks to ample government contracts. Consisder selling if you can't sleep at night.",
            category: "capital",
            growthRate: 1.7,
            bookValue: 315,
        }]

        return stocks;
    })
