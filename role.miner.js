module.exports = {
    run: function(creep, roomName) {
        var energySourceFlag = Game.flags[roomName + ':' + creep.memory.energySource + ':' + roomName];
        var containerFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if (creep.carry.energy < creep.carryCapacity) {
            var source = creep.pos.findClosestByPath(FIND_SOURCES);

            if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('harvest');
                creep.moveTo(Game.flags[creep.memory.flagIndex]);
            }
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (container != undefined) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('transfer');
                    creep.moveTo(container);
                }
            }
        }
    }
};