angular.module("BillionaireGame.Stocks")
    .service("billionaireStockMarketService", function(billionaireDriverService) {

        var stockMarketService = this;
        billionaireDriverService.onnewgame(function() {

            billionaireDriverService.onmonth(function(session) {

                var game = session.game;

                var marketMood = Math.random() * (game.marketMoodRange.max - game.marketMoodRange.min) + game.marketMoodRange.min;

                _.each(session.market.stocks, function(stock) {
                    stock.record = stock.record || [];
                    stock.bookValue = stock.bookValue * (1 + ((stock.growthRate - 1) / 12));
                    stock.price = stock.bookValue * session.market.marketAdjustment;
                    stock.price *= marketMood;
                    stock.record.push({
                        bookValue: stock.bookValue,
                        price: stock.price
                    })
                })

                session.player.holdings = stockMarketService.consolidateStocks(session);

            });

        })


        this.sellStocks = function(holding, count) {
            var session = billionaireDriverService.getSession();

            for (var i = 0; i < count; i++) {
                var stock = _.find(session.player.stocks, function(stock) {
                    if (stock.originalNetCost == holding[0].originalNetCost && stock.boughtDate == holding[0].boughtDate && stock.link == holding[0].link) {
                        return true;
                    }
                });

                session.player.stocks = _.without(session.player.stocks, stock);
            }

            session.player.cash += (count * holding[0].link.price) - (count * holding.taxPerUnit);
        }

        this.buyStocks = function(deal, count, comission) {
            var session = billionaireDriverService.getSession();

            deal.count = count;
            var stocks = this.expandStocks(deal);

            console.log("adding stocks", deal, stocks);

            

            session.player.stocks = session.player.stocks.concat(stocks);
            var deal = {

            }
            for (var i = 0; i < count; i++) {

            }

        }

        this.consolidateStocks = function(session) {

            var consolidated = [];

            var stocks = _.clone(session.player.stocks);

            var holdings = _.groupBy(stocks, function(stock) {
                return JSON.stringify({
                    symbol: stock.link.symbol,
                    boughtDate: stock.boughtDate,
                    originalNetCost: stock.originalNetCost,
                });
            });

            _.each(holdings, function(holding) {
                holding.link = holding[0].link;
                consolidated.push(holding);
            })

            return consolidated;

        }

        this.expandStocks = function(holding) {

            var stocks = [];
            for (var i = 0; i < holding.count; i++) {
                var _stock = {};
                _stock.boughtPrice = holding.boughtPrice;
                _stock.boughtDate = holding.date;
                _stock.originalNetCost = holding.originalNetCost;
                _stock.link = holding.link;
                stocks.push(_stock);

            }

            return stocks;
        }

    })
