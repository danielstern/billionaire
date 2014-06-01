angular.module("BillionaireGame.Stocks")
.directive("stockBuyModal",function() {
return {
	restrict: "AE",	
	controller: function($scope, billionaireDriverService, billionaireStockMarketService  ) {

		$scope.openBuyStockModal = function(stock) {

		    var deal = {
		        type: "BUY",
		        date: $scope.session.world.month,
		        name: stock.name,
		        symbol: stock.symbol,
		        link: stock,
		        boughtPrice: stock.price,
		        count: 10,
		        comission: $scope.session.player.comission,
		    }


		    $scope.deal = deal;
		    $scope.stock = stock;
			console.log("Opening modal",$scope.deal);

		    $('#stockBuyModal-'+stock.symbol).modal();
		    $('#stockBuyModal-'+stock.symbol).on('hidden.bs.modal', function() {
		        billionaireDriverService.unpause();
		    });

		    billionaireDriverService.pause();
		}


		$scope.confirmBuyStock = function(deal, count, comission) {

				var stock = deal.link;

		    billionaireDriverService.pause();
		    $('#stockBuyModal-'+stock.symbol).modal('hide');

		    deal.originalNetCost = deal.boughtPrice + comission / count;
		    deal.count = count;
		    deal.comission = comission;
		    deal.totalCost = deal.boughtPrice * count + comission;

		    var stocks = billionaireStockMarketService.expandStocks(deal);

		    $scope.session.player.stocks = $scope.session.player.stocks.concat(stocks);
		    $scope.session.player.stockHistory.push(deal);

		    $scope.session.player.cash -= (deal.totalCost);
		}


	},
	link: function(scope, elem) {

	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockBuyModal.html",
}
});