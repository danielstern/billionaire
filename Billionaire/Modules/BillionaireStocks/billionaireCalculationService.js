angular.module("BillionaireGame.Stocks")
.service("billionaireCalculationService",function(){

	this.getRORForStock = function(stock, session) {

	    if (!stock) return;

	    var numMonths = session.world.month - stock.boughtDate;
	    var startingVal = stock.originalNetCost;
	    var currentVal = stock.link.price;

	    if (!numMonths) return;

	    var res = Calculon.rateOfReturn({
	        interestRate: null,
	        startingValue: startingVal,
	        finalValue: currentVal,
	        numMonths: numMonths
	    });

	    return res.value;
	}


})