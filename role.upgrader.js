module.exports = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            var roomController = creep.room.controller;

            let container = roomController.pos.findInRange(FIND_STRUCTURES, 3, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            })[0];

            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('withdraw');
                creep.moveTo(container);
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