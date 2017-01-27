module.exports = {
    run: function(creep, roomName) {
        let wallAndRampartHp = 200000;

        if (creep.carry.energy == 0) {
            var fullContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_CONTAINER  &&
                               s.store[RESOURCE_ENERGY] > 1200
            });

            let storage = creep.room.storage;

            if (fullContainer != undefined) {
                if (creep.withdraw(fullContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(fullContainer);
                }
            } else if (storage != undefined) {
                if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(storage);
                }
            } else {
                let container = Game.getObjectById(creep.memory.spawnContainerId);
                if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(container);
                }
            }
            // todo think about this logic ko darit ja nav storage rooma?
           /* var storage = creep.room.storage;
            link = undefined;

            if (storage != undefined) {
                let link = storage.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_LINK &&
                                 s.energy > 0
                })[0];
            }

            if (storage != undefined && link != undefined) {
                if (creep.withdraw(link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('withdraw');
                    creep.moveTo(link);
                }
            }

            if (link == undefined) {
                var container = storage.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER &&
                                 s.store[RESOURCE_ENERGY] > 0
                })[0];

                if (container != undefined) {
                    if (creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.say('withdraw');
                        creep.moveTo(container);
                    }
                }
                else {
                    if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.say('withdraw');
                            creep.moveTo(storage);
                    }
                }
            }*/
        }
        else if (creep.carryCapacity == creep.carryCapacity) {
            let container = Game.getObjectById(creep.memory.controllerContainerId);

            if (_.sum(container.store) < 1000) {
                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('transfer');
                    creep.moveTo(container);
                }
            }
            else {
                var spawnAndExtensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                    s.structureType == STRUCTURE_EXTENSION) &&
                                    s.energy < s.energyCapacity
                });

                if (spawnAndExtensions == undefined) {
                    var storage = creep.room.storage;
                }

                if (spawnAndExtensions != undefined) {
                    if (creep.transfer(spawnAndExtensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(spawnAndExtensions);
                    }
                } else if (storage != undefined) {
                    if (creep.transfer(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(storage);
                    }
                } else {
                    var damagedWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (i) => (i.structureType == STRUCTURE_WALL && i.hits < wallAndRampartHp) ||
                                       (i.structureType == STRUCTURE_RAMPART && i.hits < wallAndRampartHp)
                    });

                    if (damagedWall != undefined) {
                        if (creep.repair(damagedWall) == ERR_NOT_IN_RANGE) {
                            creep.say('rep wall');
                            creep.moveTo(damagedWall);
                        }
                    }
                }
            }
        }
    }
};