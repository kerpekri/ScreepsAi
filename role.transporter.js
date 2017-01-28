module.exports = {
    run: function(creep, roomName) {
        if (creep.carry.energy == 0) {
            let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                filter: s => s.energy > 199
            });

            if (energyOnFloor == null) {
                container = Game.getObjectById(creep.memory.containerId);
            }

            if (energyOnFloor != undefined) {
                if (creep.pickup(energyOnFloor, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energyOnFloor);
                }
            }
            else {
                if (container.store[RESOURCE_ENERGY] > 100) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('withdraw');
                        creep.moveTo(container);
                    }
                } else {
                    var containerWithAlmostFullEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                           i.store[RESOURCE_ENERGY] > 100
                    });

                    if (creep.withdraw(containerWithAlmostFullEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('withdraw');
                        creep.moveTo(containerWithAlmostFullEnergy);
                    }
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
                    let spawnContainer = spawn.pos.findInRange(FIND_STRUCTURES, 3, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                                     s.store[RESOURCE_ENERGY] < 1000
                    })[0];

                    if (spawnContainer != undefined) {
                        if (creep.transfer(spawnContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(spawnContainer);
                        }
                    } else {
                        var roomController = creep.room.controller;

                        let controllersContainer = roomController.pos.findInRange(FIND_STRUCTURES, 1, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER
                        })[0];

                        if (controllersContainer != undefined) {
                            if (creep.transfer(controllersContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(controllersContainer);
                            }
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