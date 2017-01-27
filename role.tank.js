module.exports = {
    run: function(creep) {
        var attackFlag = Game.flags['TankRoom'];

        if(attackFlag){
            var healerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
               filter: (c) => c.getActiveBodyparts(HEAL) > 0
            });

            var attackerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
               filter: (c) => c.getActiveBodyparts(ATTACK) > 0
            });

            var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            var hostileSpawns = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);

            var hostileWall = creep.pos.findClosestByRange(FIND_STRUCTURES,
                { filter: (s) => (s.hits < 100 && s.structureType == STRUCTURE_WALL) });

            if(creep.room == attackFlag.room) {
                if (1 == 1) {
                    creep.moveTo(attackFlag);
                }
                else if (healerCreep) {
                    if(creep.attack(healerCreep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(healerCreep);
                    }
                }
                else if(attackerCreep) {
                    if(creep.attack(attackerCreep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(attackerCreep);
                    }

                }
                else if (hostileWall == 9999) {
                    if(creep.attack(hostileWall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileWall);
                    }
                }
                else if(hostileCreeps) {
                    if(creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(hostileCreeps);
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

        }

    }
};

