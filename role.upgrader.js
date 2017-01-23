module.exports = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            var roomController = creep.room.controller;

            let container = roomController.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];

            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(container);
                }
            } else {
                // find closest source
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                // try to harvest energy, if the source is not in range
                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    // move towards the source
                    creep.moveTo(source);
                }
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.say('upgrade');
                creep.moveTo(creep.room.controller);
            }
        }
    }
};