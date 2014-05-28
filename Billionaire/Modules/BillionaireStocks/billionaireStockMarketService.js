angular.module("BillionaireGame.Stocks")
.service("billionaireStockMarketService",function(billionaireDriverService){

	var stockMarketService = this;
	billionaireDriverService.onnewgame(function() {

	    billionaireDriverService.onmonth(function(session) {

	        var game = session.game;

	        var marketMood = Math.random() * (game.marketMoodRange.max - game.marketMoodRange.min) + game.marketMoodRange.min;

	        _.each(session.market.stocks, function(stock) {
	            stock.bookValue = stock.bookValue * (1 + ((stock.growthRate - 1) / 12));
	            stock.price = stock.bookValue * session.market.marketAdjustment;
	            stock.price *= marketMood;
	        })

	        session.player.holdings = stockMarketService.consolidateStocks(session);

	    });

	})


	
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