"use strict";

/*
	Generate method iterator
	
	Takes a method name and returns a function that will
	loop over all the Actors in a group and fire that
	method with those properties
	
	@param [string]: Name of method
*/
module.exports = function (method) {
	return function () {
		var numElements = this.elements.length,
		    i = 0,
		    isGetter = false,
		    getterArray = [],
		    actor,
		    actorReturn;

		for (; i < numElements; i++) {
			actor = this.elements[i];
			actorReturn = actor[method].apply(actor, arguments);

			if (actorReturn != actor) {
				isGetter = true;
				getterArray.push(actorReturn);
			}
		}

		return isGetter ? getterArray : this;
	};
};