module.exports = {
    run: function(creep, roomName) {
        if (creep.carry.energy == 0) {
            let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: s => s.energy > 50
            });

            if (energyOnFloor != undefined) {
                if (creep.pickup(energyOnFloor, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyOnFloor);
                }
            }
            else {
                let container = Game.getObjectById(creep.memory.containerId);

                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(container);
                }
            }
        }
        else if (creep.carryCapacity == creep.carryCapacity) {
            var storage = creep.room.storage;

            if (storage == undefined) {
                var spawn = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_SPAWN
                });

                let container = spawn.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })[0];

                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
            else {
                if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage);
                }
            }
        }
    }
};