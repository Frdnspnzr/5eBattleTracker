5E Battle Tracker
=================

5E Battle Tracker is a tool to manage battle in Dungeons & Dragons, 5th edition. It may or may not work with other roleplaying systems that use a similiar initiative system.

Installation
------------

To use 5E Battle Tracker locally just download the `dist` folder and open `index.html`. It works without an internet connection. If you want to use it on your own server you can just copy the contents of that folder somewhere and call it online. You can also build 5E Battle Tracker yourself using [grunt](http://gruntjs.com).

If you don't feel like putting up with any of this just go [here](http://5etools.frdnspnzr.de/BattleTracker/) and use it.

Usage
-----

Begin by adding some creatures and filling in their initiative. Then start the battle using the _restart battle_ button. You can then track whose turn it is using the _next creature_ button. You can add notes to any creature, clone creatures or delete them from the list.

Features
--------

  * **Intelligent cloning**. If you clone a creature whose name ends in a numeral the clone will increase that number by one. Create an undead army just by naming the first one "Zombie 1"!
  * **Automatic HP calculation**. You can use simple formulas including dice rolls like `3d8+6` in the HP field. This gives you some variance without actually _rolling_ 28d20+252 for an Ancient Red Dragon. And if that one highly optimized PC deals 14d6 damage every turn just burn the dice, put `-14d6` somewhere and press `Enter`.
  * **Duration tracking**. 5E Battle Tracker makes it easy to remember how long you have to put up with that dastardly Spiritual Weapon. Every note can have a duration either counting turns (whenever the creature finishes its turn), rounds (whenever the topmost creature starts it turns), or both. The note will not vanish by itself but you will be notified.

License
-------

5E Battle Tracker is published under a [Creative Commons Attribution-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-sa/4.0/). That means you can use it however you want as long as you put my name somewhere and share using the same license. Please note however that 5E Battle Tracker uses some [Glyphicons](http://glyphicons.com) and those use some slightly different license (and you have to attribute _their_ creator too).