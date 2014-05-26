angular.module("BillionaireGame")
    .controller("StockMarket", function($scope) {


        $scope.openBuyStockModal = function(stock) {

            $scope.currentBuyingStock = stock;
            $scope.currentStockBuyCount = 10;
            $scope.currentBuyComission = $scope.session.player.comission;
            $('#stockBuyModal').modal();

            $scope.pause();
        }

        $scope.confirmBuyStock = function(stock, count, comission) {

            $('#stockBuyModal').modal('hide');
            $scope.session.player.stocks.push({
                date: $scope.session.world.month,
                count: count,
                name: stock.name,
                symbol: stock.symbol,
                boughtAt: stock.price + comission / count,
                link: stock,
                comission: comission
            })

            $scope.session.player.cash -= (stock.price * count + comission);
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
