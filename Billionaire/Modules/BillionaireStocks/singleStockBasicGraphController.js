angular.module("BillionaireGame.Stocks")
    .controller('SingleStockBasicGraphController', function($interval, $scope, $routeParams) {

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

          var scale = d3.scale.linear()
            .domain([0, finalValue])
            .range([0, 100]);

          var eachWidth = (50 / numValues) + 0;


          d3.select(selector)
           .append('svg')
            .selectAll("rect")
            .data(values)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
              var x = 100 / numValues;
              return(i * x);
            })
            .attr("y", function (d) {
              return(100 - scale(maxValue));
            })
            .attr("width", eachWidth)
            .attr("height", function (d) {
              return scale(maxValue);
            })
            .attr("fill", function (d) {

              return "rgb(0, 0, 255)";
            })
          $scope.appendTitle(selector, "Price over Time")
        }

        $scope.appendTitle = function(selector, title) {
            var outer = d3.select(selector)
            .select(".thumb");
          outer
            .append("text")
            .text(title)
            .attr("class", "chart-title");
        }

        $interval(
        	function(){
        		$scope.barChart([1,2,3,4,6,7,8,9,10],'#svg-'+$scope.stock.symbol);
        	},300);

    })
