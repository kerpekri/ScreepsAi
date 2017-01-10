module.exports = {
    run: function(creep, roomName) {
        // flag name - E78N18:sourceOneContainer:E78N18
        var energyContainerFlag = Game.flags[roomName + ':' + creep.memory.sourceContainer + ':' + roomName];
        // flag name - E78N18:backupContainer:E78N18
        // todo pagaidam netiek izmanots flags, jo kada iespeja ka storage bus full??
        var backupContainerFlag = Game.flags[roomName + ':' + 'backupContainer' + ':' + roomName];

        if (creep.carry.energy == 0) {
            var pos = energyContainerFlag.pos;

            var container = pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER
            });

            if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.say('withdraw');
                creep.moveTo(energyContainerFlag);
            }
        }
        // todo varetu pielikt ka vins negaidi un uz creep.carryCapacity / 2 dodas jau prom no containera!
        else if (creep.carryCapacity == creep.carryCapacity) {
            var storage = creep.room.storage;

            if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storage);
            }
            /* todo varbut vajadzigs, ja storage ir full? bet kada iespeja!
            if (_.sum(container.store) > 1600) {
                var storage = creep.room.storage;

                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }*/
        }
    }
};