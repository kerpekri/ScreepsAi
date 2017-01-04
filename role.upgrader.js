module.exports = {
    run: function(creep) {
        if (creep.memory.closeToController == false) {
            // somehow we need to specify flags dynamic
            var path = creep.pos.findPathTo(Game.flags.controllerContainer);

            if (path.length > 1) {
                creep.move(path[0].direction);
            }
            else {
                creep.memory.closeToController = true;
            }
        }
        else if (creep.memory.closeToController == true && creep.carry.energy == 0) {
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (container != undefined) {
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                //if not in range for transferring move to room's controller
                creep.moveTo(creep.room.controller);
            }
        }
    }
};