angular.module("BillionaireGame.Actions")
    .service("billionaireActionsDefinitions", function() {
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
                session.player.collegeEducation = true;
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
                session.player.canSell = true;
            }
        },{
            name: "Take a Cooking Class",
            cost: 100,
            time: 10,
            requires: null,
            valid: true,
            description: "Wing's Chinese Food will be very disappointed. By taking a cooking class, their business will be cut in half as you experiment in the kitchen and save money,",
            technical: "-100 to Expenses",
            effect: function(session) {
                session.player.expenses -= 100;
                session.player.canCook = true;
            }
        },{
            name: "Form an Investment Club",
            cost: 1000,
            time: 6,
            requirement: function(session){
                if (session.player.stocks.length) return true;
            },
            requirementMessage: "You must own at least one stock to form an investment club.",
            valid: true,
            description: "Form an investment club with your pals.",
            technical: "Comission costs are reduced by 10%.",
            effect: function(session) {
                session.player.comission *= 0.9;
                session.player.hasInvestmentClub = true;
            }
        }]

        return actions;
    })
