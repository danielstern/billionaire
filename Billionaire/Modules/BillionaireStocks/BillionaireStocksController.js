angular.module("BillionaireGame.Stocks")
    .controller("BillionaireStocksController", function($scope, $rootScope, 
            billionaireDriverService,
            billionaireStockMarketService,
            billionaireCalculationService
        ) {

        $scope.getROR = function(stock) {
            return billionaireCalculationService.getRORForStock(stock,$scope.session);
        };



    })
