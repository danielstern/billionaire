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
        when('/stocks/:symbol', {
            templateUrl: 'Billionaire/modules/BillionaireStocks/billionaireSingleStockView.html',
            controller: 'BillionaireSingleStockController'
        }).
        when('/actions', {
            templateUrl: 'Billionaire/modules/BillionaireActions/billionaireActions.html',
            controller: 'BillionaireActionsController'
        }).
        when('/jobs', {
            templateUrl: 'Billionaire/modules/BillionaireJobs/billionaireJobs.html',
            controller: 'BillionaireJobsController'
        }).
        when('/bank', {
            templateUrl: 'Billionaire/modules/BillionaireLoans/billionaireLoans.html',
            controller: 'BillionaireLoansController'
        }).
        when('/character', {
            templateUrl: 'Billionaire/modules/BillionaireCharacter/billionaireCharacter.html',
        }).
        when('/scenario', {
            templateUrl: 'Billionaire/modules/BillionaireScenario/billionaireScenario.html',
        }).
        otherwise({
            redirectTo: '/character'
        });
    }
]);
