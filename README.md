billionaire
===========

Open Source Game About Finances

About
----
Billionaire is a multi-scenario, modular game about finances.

In the default scenario, you start with $1000 and need to turn that in to $1B within 75 years.

Project Goals
======
- Create a modular and sustainable project
- Provide a satisfying interface
- Educate users about personal finance

-------
Currently in development. Just checkout branch `stable` and play around.

- Implements Calculon to give valid insight into rate of return
- Uses D3 for cool charts (todo)
- fun and collaborative



Project Structure
------

Billionaire is a modular game.

###Driver
The driver is the core module of the game and handles the game clock and session.

###Modules

####Actions

Allows the user to do special actions in real time (go to college, buy a hat).

Actions can have prerequisites and have effects.

####Events

Events happen randomly and effect the session like stock market and opportunities.

Events have effects and requirements.

####Jobs
You can only have one job at a time and they have a passive effect.

Jobs have effects and requirements.

####Loans

Loans add money to your pocket and you have to pay them back over time.
Loans have different interest rates and different requiremens.

####Stocks

Stocks go up in value over time (generally.) You can buy and sell stocks and need to do so in order to be a billionaire.

Stocks can have requirements and can have special effects.

Kernel Description
-----------
Game is inited by creating an instance of `BillionaireMasterController` controller.

```html
	<div ng-controller="BillionaireMasterController"></div>
```

Additional modules must be added to the following places,
- Files must be loaded in Index
- Module needs to be required by the `BillionaireGame` module
- Controller needs to be added.

The game driver dispatches an "onmonth" event every time the game's unit of time passes. All modules can listen for this event to do effects.

Session Description
----------
The game is managed by a `session` object which is available through `$scope` and through a service (todo).

Session has the following properties:
###session.player
A player object with various properties.
####player.cash
How much cash the player has on hand.
####

To Do
------

- Tighten interfaces in Loans, Stocks
- Add tooltips to illuminate key terms (rate of return)
- Add real estate market
