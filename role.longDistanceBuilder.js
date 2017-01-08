module.exports = {
    run: function(creep) {
        var explorerFlag = Game.flags[creep.memory.targetRoom + ':ExploreRoom:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if(explorerFlag){
            if(creep.room == explorerFlag.room) {
                if (creep.carry.energy > 0) {
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.structureType != STRUCTURE_WALL &&
                                       s.structureType != STRUCTURE_RAMPART &&
                                       s.hits < (s.hitsMax / 2)
                    });

                    if (structure == undefined) {
                        var constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
                    }

                    if (structure != undefined) {
                        if (structure.hits < (structure.hitsMax / 2)) {
                            creep.say('repair');
                            if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(structure);
                            }
                        }
                    }
                    else if (constructionSite != undefined) {
                        creep.say('build');
                        if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(constructionSite);
                        }
                    }
                    else {
                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER
                        });

                        if (container != undefined) {
                            creep.say('transfer');
                            if (creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                                creep.moveTo(container);
                            }
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