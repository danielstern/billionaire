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
		        stocks: [],
		        comission: $scope.session.player.comission,
		    }


		    $scope.deal = deal;
		    $scope.stock = stock;
			console.log("Opening modal",$scope.deal);

		    $('#stockBuyModal-'+stock.symbol).modal();
		    $('#stockBuyModal'+stock.symbol).on('hidden.bs.modal', function() {
		        if (!$scope.session.confirming) billionaireDriverService.unpause();
		    });

		    billionaireDriverService.pause();
		}


		$scope.confirmBuyStock = function(deal, count, comission) {

		    billionaireDriverService.pause();
		    $scope.session.confirming = true;
		    $('#stockBuyModal').modal('hide');

		    deal.originalNetCost = deal.boughtPrice + comission / count;
		    deal.count = count;
		    deal.comission = comission;
		    deal.totalCost = deal.boughtPrice * count + comission;
		    deal.settled = true;

		    var stocks = billionaireStockMarketService.expandStocks(deal);

		    $scope.session.player.stocks = $scope.session.player.stocks.concat(stocks);
		    $scope.session.player.stockHistory.push(deal);

		    $scope.session.player.cash -= (deal.totalCost);
		    $('#confirmStockBuyModal').modal();
		    $('#confirmStockBuyModal').on('hidden.bs.modal', function() {
		        billionaireDriverService.unpause();
		        $scope.session.confirming = false;
		    });
		}


	},
	link: function(scope, elem) {

	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockModals/stockBuyModal.html",
}
});