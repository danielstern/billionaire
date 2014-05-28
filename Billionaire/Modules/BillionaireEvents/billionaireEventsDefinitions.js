angular.module("BillionaireGame.Events")
    .service("billionaireEventsDefinitions", function() {
        var events = [{
            name: "Stock market correction",
            description: "Be prepared to experience mild terror and a slight sensation of suicidal despair as stock prices drop across the board",
            technical: "-10% to Price of All Stocks",
            ok: "Good thing these windows don't open",
            effect: function(session) {
                session.market.marketAdjustment *= 0.9;
            }
        }, {
            name: "The Good Guys Triumph over the Bad Guys",
            description: "Optimism sweeps across the homeland as our good ol' boys defeat those dastardly devils in some desert somewhere, for some reason no one understands.",
            technical: "+10% to Price of All Stocks",
            ok: "Good thing these windows don't open",
            effect: function(session) {
                session.market.marketAdjustment *= 1;
            }
        }, {
            name: "Evil continues to be profitable",
            description: "The rich get richer, pyramid schemes continue to rise in popularity, and Chris Brown tops the charts yet again.",
            technical: "+10% to Book Value of All Finance Stocks",
            ok: "You're fired!",
            effect: function(session) {
                _.each(session.market.stocks, function(stock) {
                    if (stock.category == 'finance') {
                        stock.bookValue *= 1.1;
                    }
                })
            }
        }, {
            name: "The Tech Bubble Bursts",
            description: "It's a dark day for those in Silicon Valley. The tech bubble bursts, cutting the value of all technology stocks in half.",
            technical: "-40% to Book Value of All Tech Stocks",
            ok: "To the escape pod!",
            effect: function(session) {
                _.each(session.market.stocks, function(stock) {
                    if (stock.category == 'technology') {
                        stock.bookValue *= 0.6;
                    }
                })
            }
        }, {
            name: "Analysts Pan Technology Futures",
            description: "Analysts are racing to the newsdesks this week to report that the tech bubble will surely burst any decade now.",
            technical: "-10% to Book Value of All Tech Stocks",
            ok: "Can I re-roll?",
            effect: function(session) {
                _.each(session.market.stocks, function(stock) {
                    if (stock.category == 'technology') {
                        stock.bookValue *= 0.9;
                    }
                })
            }
        }, {
            name: "Richard Branson Visits Silicon Valley",
            description: "Jolly good! The world's most heroic billionaire infuses the high tech sector with some much-needed capital.",
            technical: "+20% to Book Value of All Tech Stocks",
            ok: "Should we take my jet or yours?",
            effect: function(session) {
                _.each(session.market.stocks, function(stock) {
                    if (stock.category == 'technology') {
                        stock.bookValue *= 1.2;
                    }
                })
            }


        }]

        return events;
    })
