module.exports = {
    run: function(creep) {
        var attackFlag = Game.flags['Controller:Attack:' + creep.memory.home_room]
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room]

        if(attackFlag){
                var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var hostileSpawns = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
                var hostileStructures = creep.pos.findClosestByRange(FIND_STRUCTURES,
                { filter: (i) => i.structureType == STRUCTURE_WALL });

            if(creep.room == attackFlag.room) {
                if(hostileCreeps) {
                    if(creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileCreeps);
                        //creep.attack(hostileCreeps);
                    }

                }
                else if (hostileSpawns) {
                    if(creep.attack(hostileSpawns) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileSpawns);
                    }

                }
                else if (hostileStructures) {
                    if(creep.attack(hostileStructures) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileStructures);
                    }
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

