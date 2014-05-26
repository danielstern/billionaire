angular.module("BillionaireGame")
    .controller("StockMarket", function($scope) {


        $scope.openBuyStockModal = function(stock) {
            console.log("OPen buy stock,",stock);
            $scope.currentBuyingStock = stock;
            $scope.currentStockBuyCount = 10;
            $('#stockBuyModal').modal();

            $scope.pause();
        }

        $scope.confirmBuyStock = function(stock, count) {
            $('#stockBuyModal').modal('hide');
            $scope.session.player.stocks.push({
                date: $scope.session.world.month,
                count: count,
                name: stock.name,
                symbol: stock.symbol,
                boughtAt: stock.price,
                link: stock,
            })

            console.log("Added player stock", $scope.session.player.stocks)

            $scope.session.player.cash -= stock.price * count;
            $('#confirmStockBuyModal').modal();
        }

        $scope.getROR = function(stock) {

            var numMonths = $scope.session.world.month - stock.date;
            var startingVal = stock.boughtAt;
            var currentVal = stock.link.price;

            if (!numMonths) return;

            var res = Calculon.rateOfReturn ({ 
                interestRate: null,
                startingValue:  startingVal, 
                finalValue:currentVal,
                numMonths: numMonths
            }); 

            return res.value;
        }

    })
