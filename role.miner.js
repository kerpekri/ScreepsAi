module.exports = {
    run: function(creep) {
        if (creep.memory.closeToSource == false) {
            var flag = Game.flags[creep.memory.flagIndex];
            var flagCheck = creep.moveTo(Game.flags[creep.memory.flagIndex]);

            if (flagCheck != 0 && flagCheck != -4) {
                creep.say('go flag');
                creep.moveTo(flag);
            }
            else {
                creep.memory.closeToSource = true;
            }
        }
        else if (creep.memory.closeToSource == true && creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);

            if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        else if (creep.memory.closeToSource == true && creep.carry.energy == creep.carryCapacity) {
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