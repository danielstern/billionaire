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

		$scope.lineChart = function(values,selector) {

			$scope.clearElements(selector);

			var margin = {top: 20, right: 20, bottom: 30, left: 50},
			    width = 960 - margin.left - margin.right,
			    height = 500 - margin.top - margin.bottom;

			console.log("Line charting",values);

			var parseDate = d3.time.format("%d-%b-%y").parse;

			var x = d3.time.scale()
			    .range([0, width]);

			var y = d3.scale.linear()
			    .range([height, 0]);

			var xAxis = d3.svg.axis()
			    .scale(x)
			    .orient("bottom");

			var yAxis = d3.svg.axis()
			    .scale(y)
			    .orient("left");

			var line = d3.svg.line()
			    .x(function(d) { return x(d); })
			    .y(function(d, t) { return y(t); });

		  var data = values;

			var svg = d3.select(selector)
				 .append("svg")
			    .attr("width", width + margin.left + margin.right)
			    .attr("height", height + margin.top + margin.bottom)
			  .append("g")
			    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			  values.forEach(function(d,t) {
			    d.date = d;
			    d.close = t;
			  });

			  // debugger;

			  x.domain(d3.extent(data, function(d) { return d; }));
			  y.domain(d3.extent(data, function(d,t) { return d,t }));

			  svg.append("g")
			      .attr("class", "x axis")
			      .attr("transform", "translate(0," + height + ")")
			      .call(xAxis);

			  svg.append("g")
			      .attr("class", "y axis")
			      .call(yAxis)
			    .append("text")
			      .attr("transform", "rotate(-90)")
			      .attr("y", 6)
			      .attr("dy", ".71em")
			      .style("text-anchor", "end")
			      .text("Price ($)");

			  svg.append("path")
			      .datum(data)
			      .attr("class", "line")
			      .attr("d", line);
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
		  // $scope.appendTitle(selector, "Price over Time")
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

				//$scope.barChart(prices,'#svg-'+stock.symbol);
				$scope.lineChart(prices,'#svg-'+stock.symbol);
			},300);
		
	},
	templateUrl: "Billionaire/Modules/BillionaireStocks/StockGraphs/billionaireStockBasicGraph.html",
}
});