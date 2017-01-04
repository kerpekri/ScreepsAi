module.exports = {
    run: function(creep) {
        if (creep.memory.closeToSource == false) {
            var destination_flag = creep.memory.flagIndex;

            // somehow we need to specify flags dynamic
            var path = creep.pos.findPathTo(Game.flags[destination_flag]);

            if (path.length > 1) {
                creep.move(path[0].direction);
            }
            else {
                creep.memory.closeToSource = true;
            }
        }
        else if (creep.memory.closeToSource == true && creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);
            creep.harvest(source);
        }
        else if (creep.memory.closeToSource == true && creep.carry.energy == creep.carryCapacity) {
            // find closest container
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (container != undefined) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
        }
    }
};