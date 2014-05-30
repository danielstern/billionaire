angular.module("BillionaireGame.Stocks")
    .controller('SingleStockBasicGraphController', function($scope, $routeParams) {


        $scope.clearElements = function(selector) {
            d3.select(selector).selectAll(".glyphicon").remove();
            d3.select(selector).selectAll("svg").remove();
            d3.select(selector).selectAll("text").remove();
        }


        $scope.barChart = function (values, selector) {

          $scope.clearElements(selector);

          var finalValue = values[values.length -1]

          var numValues = values.length;

          var scale = d3.scale.linear()
            .domain([0, finalValue])
            .range([0, 100]);

          var eachWidth = (50 / numValues) + 0;

          console.log("graphing...",values,selector)

          var frame = d3.select(selector)
            .data(values)
            .enter()
            .append("rect")
            .attr("x", function (d, i) {
              var x = 100 / numValues;
              return(i * x);
            })
            .attr("y", function (d) {
              return(100 - scale(d.total));
            })
            .attr("width", eachWidth)
            .attr("height", function (d) {
              return scale(d.total);
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

        $scope.barChart([1,2,3,4],'#svg-'+$scope.stock.symbol);

    })
