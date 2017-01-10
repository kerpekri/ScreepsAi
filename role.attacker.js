module.exports = {
    run: function(creep) {
        var attackFlag = Game.flags['Controller:Attack:' + creep.memory.home_room];
        //var xxxFlag = Game.flags[creep.memory.targetRoom: + ':Attack:' + creep.memory.homeRoom];
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room];

        if(attackFlag){
                var healerCreepId = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                   filter: (c) => c.getActiveBodyparts(HEAL) > 0
                });

                var attackerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                   filter: (c) => c.getActiveBodyparts(ATTACK) > 0
                });

                var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

                var hostileSpawns = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);

                var hostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
                    { filter: (i) => i.structureType == STRUCTURE_WALL ||
                                     i.structureType == STRUCTURE_CONTAINER});

            if(creep.room == attackFlag.room) {
                if (1 == 2) {
                    creep.moveTo(attackFlag);
                }
                else if (hostileSpawns) {
                    if(creep.attack(hostileSpawns) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileSpawns);
                    }
                }
                else if(healerCreepId) {
                    if(creep.attack(healerCreepId) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(healerCreepId);
                    }

                }
                else if(attackerCreep) {
                    if(creep.attack(attackerCreep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(attackerCreep);
                    }

                }
                else if (hostileCreeps) {
                    if(creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileCreeps);
                    }
                }
                else if (hostileStructures) {
                    if(creep.attack(hostileStructures) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileStructures);
                    }

                }
                else if (hostileSpawns) {
                    if(creep.attack(hostileSpawns) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileSpawns);
                    }
                }
                else {
                    creep.moveTo(attackFlag);
                }
            }
            else {
                creep.moveTo(attackFlag);
            }
        } else {
            creep.moveTo(homeFlag);
        }

    }
};

