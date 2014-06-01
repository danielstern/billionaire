angular.module("BillionaireGame.Stocks")
.directive("stockGraph",function($interval) {
return {
	restrict: "AE",
	scope: {

	},
	controller: function($scope) {
		
		$scope.clearElements = function(selector) {
		    d3.select(selector).selectAll(".glyphicon").remove();
		    d3.select(selector).selectAll("svg").remove();
		    d3.select(selector).selectAll("text").remove();
		}

		$scope.addScalingSVG = function(selection) {
		  return   selection
		    .append("svg")
		    .attr("preserveAspectRatio", "xMinYMin meet")
		    .attr("viewBox", "0,0,100,100")
		}

		$scope.barChart = function (values, selector) {

		  $scope.clearElements(selector);

		  var finalValue = values[values.length -1]
		  var maxValue = _.max(values);

		  var numValues = values.length;

		  var width = $(selector).width();
		  var height = $(selector).height();

		  var scale = d3.scale.linear()
		    .domain([0, maxValue * 1.5])
		    .range([0, height]);

		  var eachWidth = (width / numValues);


		  d3.select(selector)
		   .append('svg')
		    .selectAll("rect")
		    .data(values)
		    .enter()
		    .append("rect")
		    .attr("x", function (d, i) {
		      var x = width / numValues;
		      return(i * x);
		    })
		    .attr("y", function (d) {
		      return(height - scale(d));
		    })
		    .attr("width", eachWidth)
		    .attr("height", function (d) {
		      return scale(d);
		    })
		    .attr("fill", function (d) {
		      return "rgb(0, 0, 255)";
		    })
		  $scope.appendTitle(selector, "Price over Time")
		}

		$scope.appendTitle = function(selector, title) {
		    var outer = d3.select(selector)
		    .append("text")
		    .text(title)
		    .attr("class", "chart-title");
		}

	},
	link: function($scope, elem) {

		var stock = $scope.$parent.stock || $scope.$parent.deal.link;
		console.log("Stock?",stock);
		$scope.stock = stock;

		$interval(
			function(){
		    
				var prices = _.map(stock.record,function(stockRecord){
					return stockRecord.price;
				})

				$scope.barChart(prices,'#svg-'+stock.symbol);
			},300);
		
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockGraphs/billionaireStockBasicGraph.html",
}
});