angular.module("BillionaireGame")
    .controller("StockMarket", function($scope) {


        $scope.openBuyStockModal = function(stock) {

            var deal = {
                date: $scope.session.world.month,
                name: stock.name,
                symbol: stock.symbol,                
                link: stock,
                boughtAt: stock.price,
                count: 10,
                comission: $scope.session.player.comission,
            }

            $scope.deal = deal;

            $('#stockBuyModal').modal();

            $scope.pause();
        }

        $scope.confirmBuyStock = function(deal,count, comission) {

            $('#stockBuyModal').modal('hide');

            deal.originalNetCost = deal.boughtAt + comission / count;
            deal.count = count;
            deal.comission = comission;
            deal.totalCost = deal.boughtAt * count + comission;
            deal.settled = true;

            $scope.session.player.stocks.push(deal);

            $scope.session.player.cash -= (deal.totalCost);
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
