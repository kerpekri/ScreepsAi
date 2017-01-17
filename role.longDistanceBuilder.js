module.exports = {
    run: function(creep) {
        var explorerFlag = Game.flags[creep.memory.targetRoom + ':ExploreRoom:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if(explorerFlag){
            if(creep.room == explorerFlag.room) {
                if (creep.memory.working == true && creep.carry.energy == 0) {
                    creep.memory.working = false;
                }
                else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
                    creep.memory.working = true;
                }

                if (creep.memory.working == true) {
                    var spawnAndExtensions = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.structureType == STRUCTURE_SPAWN     ||
                                        s.structureType == STRUCTURE_EXTENSION) &&
                                        s.energy < s.energyCapacity
                    });

                    if (spawnAndExtensions == undefined) {
                        var damagedStructure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                                filter: (s) => s.structureType != STRUCTURE_WALL &&
                                               s.structureType != STRUCTURE_RAMPART &&
                                               s.hits < (s.hitsMax / 2)
                        });
                    }

                    if (spawnAndExtensions == undefined && damagedStructure == undefined) {
                        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                            /*filter: (s) => s.structureType != STRUCTURE_WALL &&
                                           s.structureType != STRUCTURE_RAMPART*/
                        });
                    }

                    if (spawnAndExtensions != undefined) {
                        if (creep.transfer(spawnAndExtensions, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(spawnAndExtensions);
                        }
                    }
                    else if (damagedStructure != undefined) {
                        creep.say('repair');
                        if (creep.repair(damagedStructure) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(damagedStructure);
                        }
                    }
                    else if (constructionSite != undefined) {
                        creep.say('build');
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite);
                        }
                    }
                    else {
                        if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                            creep.say('upgrade');
                            creep.moveTo(creep.room.controller);
                        }
                    }
                }
                else {
                    let energyOnFloor = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY, {
                            filter: s => s.energy > 50
                    });

                    if (energyOnFloor == undefined) {
                        var containerWithEnergy = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                                           i.store[RESOURCE_ENERGY] > 100
                        });
                    }

                    if (energyOnFloor != undefined) {
                        if (creep.pickup(energyOnFloor, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(energyOnFloor);
                        }
                    }
                    else if (containerWithEnergy != undefined) {
                        if (creep.withdraw(containerWithEnergy, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(containerWithEnergy);
                        }
                    }
                    else {
                        var source = creep.pos.findClosestByPath(FIND_SOURCES);

                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.say('harvest');
                            creep.moveTo(source);
                        }
                    }
                }
            } else {
                creep.moveTo(explorerFlag)
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};