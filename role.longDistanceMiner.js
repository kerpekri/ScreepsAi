module.exports = {
    run: function(creep) {
        var explorerFlag = Game.flags[creep.memory.targetRoom + ':ExploreRoom:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if(explorerFlag){
            if(creep.room == explorerFlag.room) {
                if (creep.carry.energy == creep.carryCapacity) {
                    var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES,{
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    });

                    var damagedContainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.structureType == STRUCTURE_CONTAINER &&
                                       s.hits < (s.hitsMax / 2)
                    });

                    if (constructionSite != undefined) {
                        creep.say('build');
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite);
                        }
                    }
                    else if (damagedContainer != undefined) {
                        creep.say('repair');
                        if (creep.repair(damagedContainer) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(damagedContainer);
                        }
                    }
                    else {
                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER
                        });

                        if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.say('transfer');
                            creep.moveTo(container);
                        }
                    }
                }
                else {
                    var source = creep.pos.findClosestByPath(FIND_SOURCES);

                    if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                        creep.say('harvest');
                        creep.moveTo(source);
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