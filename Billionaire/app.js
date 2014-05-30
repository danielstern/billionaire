angular.module("BillionaireGame", [
    'BillionaireGame.Driver',
    'BillionaireGame.Jobs',
    'BillionaireGame.Actions',
    'BillionaireGame.Events',
    'BillionaireGame.Loans',
    'BillionaireGame.Stocks',
    'ngRoute',
])

.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
        when('/stocks', {
            templateUrl: 'Billionaire/modules/BillionaireStocks/billionaireStocks.html',
            controller: 'BillionaireStocksController'
        }).
        when('/actions', {
            templateUrl: 'Billionaire/modules/BillionaireActions/billionaireActions.html',
            controller: 'BillionaireActionsController'
        }).
        otherwise({
            redirectTo: '/player'
        });
    }
]);
