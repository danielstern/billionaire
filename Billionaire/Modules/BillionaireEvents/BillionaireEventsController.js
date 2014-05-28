angular.module("BillionaireGame.Events")
    .controller("EventsService", function() {

    this.init = function(session) {
        session.onnewgame(activateEvents);
    }

    function enableEvents(session) {
        session.onmonth(function(session) {
            if (Math.random() * session.game.eventFrequency < 1) {
                var game = session.game;

                if (game.timeSinceLastEvent) return;

                var _event = _.sample(session.allEvents);

                $scope.currentEventHappening = _event;

                $scope.pause();
                $('#eventModal').modal();
                $('#eventModal').on('hidden.bs.modal', function() {
                    $scope.unpause();
                });

                _event.effect(session);

                game.timeSinceLastEvent = game.eventCoolDownMonths;
            }
        })
    }
})
