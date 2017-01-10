module.exports = {
    run: function(creep) {
        var attackFlag = Game.flags['Controller:Attack:' + creep.memory.home_room];
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room];

        if(attackFlag){
                // damaged healer creep
                var healerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                   filter: (c) => c.getActiveBodyparts(HEAL) > 0 &&
                                  c.hits < c.hitsMax
                });

                if (healerCreep == null || healerCreep == undefined) {
                    var healerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
                       filter: (c) => c.getActiveBodyparts(HEAL) > 0
                    });
                }

                var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

                var hostileSpawns = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);

                var hostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES,
                    { filter: (i) => i.structureType == STRUCTURE_WALL ||
                                     i.structureType == STRUCTURE_CONTAINER});

            if(creep.room == attackFlag.room) {
                if (1 == 2) {
                    creep.moveTo(attackFlag);
                }
                else if(healerCreep) {
                    if(creep.attack(healerCreep) == ERR_NOT_IN_RANGE) {
                        creep.rangedAttack(healerCreep);
                        creep.moveTo(healerCreep);
                    }

                }
                else if (hostileCreeps) {
                    if(creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                        creep.rangedAttack(hostileCreeps);
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

