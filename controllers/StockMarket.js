angular.module("BillionaireGame")
    .controller("StockMarket", function($scope) {


        $scope.openBuyStockModal = function(stock) {
            console.log("buying stock", stock);
            $scope.currentBuyingStock = stock;
            $scope.currentStockBuyCount = 10;
            $('#stockBuyModal').modal();

            $scope.pause();
        }

        $scope.confirmBuyStock = function(stock, count) {
            console.log("Confirm buying of...", stock, count);
            $('#stockBuyModal').modal('hide');
            $scope.session.player.stocks.push({
                date: $scope.session.world.month,
                count: count,
                name: stock.name,
                symbol: stock.symbol,
                price: stock.price
            })

            $scope.session.player.cash -= stock.price * count;
            $('#confirmStockBuyModal').modal();
        }

    })
