angular.module("BillionaireGame.Driver")
    .service("billionaireWorldMessageService", function() {

        var worldMessageService = this;

        this.onMessageBroadCastListeners = [];

        this.onbroadcastmessage = function(l) {
            this.onMessageBroadCastListeners.push(l);
        };

        this.broadcastMessage = function(message) {
            _.each(worldMessageService.onMessageBroadCastListeners, function(l) {
                l(message);
            })
        }
    })
