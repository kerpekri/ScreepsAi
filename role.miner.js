module.exports = {
    run: function(creep, roomName) {
        // flag name - E78N18:energySourceOne:E78N18
        var energySourceFlag = Game.flags[roomName + ':' + creep.memory.energySource + ':' + roomName];
        // flag name - E78N18:sourceOneContainer:E78N18
        var energyContainerFlag = Game.flags[roomName + ':' + creep.memory.sourceContainer + ':' + roomName];

        if (creep.carry.energy < creep.carryCapacity) {
            var pos = energySourceFlag.pos;
            var source = pos.findClosestByPath(FIND_SOURCES);

            if (creep.harvest(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('harvest');
                creep.moveTo(energySourceFlag);
            }
        }
        else if (creep.carry.energy == creep.carryCapacity) {
            var pos = energyContainerFlag.pos;

            let container = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (container != undefined) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('transfer');
                    creep.moveTo(energyContainerFlag);
                }
            }
        }
    }
};