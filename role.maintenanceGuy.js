module.exports = {
    run: function(creep) {
        var droptEnergy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
            filter: (d) => {return (d.resourceType == RESOURCE_ENERGY)}});

        if (creep.carry.energy == 0) {
            if (droptEnergy != undefined && creep.carry.energy == 0) {
                if (droptEnergy.amount > 99) {
                    if (creep.pickup(droptEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droptEnergy)
                    }
                }
                else {
                    var containerWithAlmostFullEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                       i.store[RESOURCE_ENERGY] > 1000
                    });

                    var controllersContainerPos = Game.rooms.E78N18.controller.pos;

                    var controllersContainer = controllersContainerPos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    });

                    if (containerWithAlmostFullEnergy == null) {
                        var storage = creep.room.storage;

                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage);
                        }
                    }
                    else if (containerWithAlmostFullEnergy != controllersContainer) {
                        if (creep.withdraw(containerWithAlmostFullEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containerWithAlmostFullEnergy);
                        }
                    }
                    else {
                        var storage = creep.room.storage;

                        if (creep.withdraw(storage, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(storage);
                        }
                    }
                }
            }
        }
        else {
            creep.say('M-GUY')
            var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER)  &&
                                s.energy < s.energyCapacity
            });

            var spawnAndExtensions = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                s.structureType == STRUCTURE_EXTENSION) &&
                                s.energy < s.energyCapacity
            });

            if (tower != undefined) {
                if (creep.transfer(tower, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(tower);
                }
            }
            else if (spawnAndExtensions != undefined) {
                if (creep.transfer(spawnAndExtensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawnAndExtensions);
                }
            }
            else {
                var pos = Game.rooms.E78N18.controller.pos;
                //console.log(creep.name + ' ' + pos);

                var container = pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                });

                if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.say('transfer C');
                    creep.moveTo(container);
                }
            }
        }
    }
};