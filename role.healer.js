module.exports = {
    run: function(creep) {
        var attackFlag = Game.flags['AttackRoom'];

        if(attackFlag){
            //var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            //var hostileSpawns = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
            //var hostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);

            if(creep.room == attackFlag.room) {
                var damagedAllyCreep = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                    filter: function(object) {
                        return object.hits < object.hitsMax;
                    }
                });

                if(damagedAllyCreep) {
                    if(creep.heal(damagedAllyCreep) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(damagedAllyCreep);
                    }
                }
                else {
                    creep.moveTo(attackFlag);
                }
            } else {
                creep.moveTo(homeFlag);
            }
        }
    }
};

