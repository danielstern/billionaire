angular.module("BillionaireGame")
    .service("billionaireActions", function() {
        var actions = [{
            name: "Go to Community College",
            cost: 3000,
            time: 12,
            valid: true,
            description: "Just like in Animal House, minus all the interesting stuff. Learn Math, English or just play hackeysack with the dean in the quad.",
            technical: "-5% to Income Tax because you're smart enough to get an accountant",
            effect: function(session) {
                session.player.incomeTaxMultiplier -= 0.05;
            }

        }]

        return actions;
    })
