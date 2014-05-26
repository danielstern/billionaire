angular.module("BillionaireGame")
    .service("billionaireActions", function() {
        var actions = [{
            name: "Go to Community College",
            cost: 3000,
            time: 12,
            requires: null,
            valid: true,
            description: "Just like in Animal House, minus all the interesting stuff. Learn Math, English or just play hackeysack with the dean in the quad.",
            technical: "-5% to Income Tax because you're smart enough to get an accountant",
            effect: function(session) {
                session.player.incomeTaxMultiplier -= 0.05;
            }
        },{
            name: "Master the Art of Sales",
            cost: 2500,
            time: 20,
            requires: null,
            valid: true,
            description: "From ABC to YYZ, a salesman's job is never over. Learn how to pitch like a pro and guarantee you'll never go hungry.",
            technical: "+5% to Job Income",
            effect: function(session) {
                session.player.salaryMultiplier += 0.05;
            }
        }]

        return actions;
    })
