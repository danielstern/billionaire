angular.module("BillionaireGame", 
    [
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
        //controller: 'PhoneListCtrl'
      }).
      when('/phones/:phoneId', {
        templateUrl: 'partials/phone-detail.html',
        controller: 'PhoneDetailCtrl'
      }).
      otherwise({
        redirectTo: '/phones'
      });
  }]);