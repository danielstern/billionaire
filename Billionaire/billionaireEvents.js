angular.module("BillionaireGame")
    .service("billionaireEvents", function() {
        var events = [{
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
        },{
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
