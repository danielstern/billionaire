angular.module("BillionaireGame")
    .service("billionaireEvents", function() {
        var events = [{
            name: "The Tech Bubble Bursts",
            description: "It's a dark day for those in Silicon Valley. The tech bubble bursts, cutting the value of all technology stocks in half.",
            effect: function(session) {
                _.each(session.market.stocks,function(stock){
                    if(stock.category = 'technology') {
                        stock.bookValue /= 2;
                    }
                })
            }

        }]

        return events;
    })
