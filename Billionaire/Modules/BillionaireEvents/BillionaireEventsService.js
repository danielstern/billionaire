angular.module("BillionaireGame.Events")
    .service("billionaireEventsService", function(billionaireDriverService) {

    billionaireDriverService.onnewgame(activateEvents);

    var eventService = this;

    this.eventListeners = [];
    
    this.onevent = function(listener) {
        this.eventListeners.push(listener)        
    }

    this.callListeners = function(event) {
        _.each(eventService.eventListeners,function(listener){
            listener(event);
        });
    }

    function activateEvents(session) {
        
        billionaireDriverService.onmonth(function(session) {
            if (doesEventHappen(session)) {

                var game = session.game;
                if (game.timeSinceLastEvent) return;

                var _event = _.sample(session.allEvents);

                eventService.currentEventHappening = _event;

                eventService.callListeners(_event);
                
                _event.effect(session);

                game.timeSinceLastEvent = game.eventCoolDownMonths;
            }
        })
    }

    function doesEventHappen(session) {
        return (Math.random() * session.scenario.eventFrequency < 1);
    }
})
