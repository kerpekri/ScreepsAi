module.exports = {
    run: function(creep) {
        if (creep.carry.energy == 0) {
            var droptEnergy = Game.rooms.E78N18.find(FIND_DROPPED_RESOURCES);
            //var energyOnGround = false;

            if (droptEnergy != undefined && creep.carry.energy == 0) {
                /*droptEnergy.forEach(function(entry) {
                    //console.log(entry.amount);
                    if (entry.amount > 100) {
                        energyOnGround = true;
                        break;
                    }
                });*/

                if (1 == 2) {
                    //console.log('te2');
                    creep.say('getEnergy');
                    if (creep.pickup(droptEnergy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droptEnergy)
                    }
                }
                else {
                    creep.say('getEngContainer');
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
            else {
                creep.say('getEngContainer');
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
        else {
            var tower = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => (s.structureType == STRUCTURE_TOWER)  &&
                                s.energy < s.energyCapacity &&
                                s.energy < 800
            });

            var spawnAndExtensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
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
                var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                if (constructionSite != undefined) {
                    if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                        creep.say('build');
                        creep.moveTo(constructionSite);
                    }
                }
                else {
                    var damagedWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (i) => i.structureType == STRUCTURE_WALL && i.hits < 10000
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