module.exports = {
    run: function(creep, roomName) {
        if (creep.carry.energy == 0) {
            let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: s => s.energy > 199
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

                if (spawn) {
                    let container = spawn.pos.findInRange(FIND_STRUCTURES, 3, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                                     s.store[RESOURCE_ENERGY] < 600
                    })[0];

                    if (container != undefined) {
                        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    } else {
                        var roomController = creep.room.controller;

                        let container = roomController.pos.findInRange(FIND_STRUCTURES, 3, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER
                        })[0];

                        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
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