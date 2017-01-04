module.exports = {
    run: function(creep) {
        var attackFlag = Game.flags['Controller:Attack:' + creep.memory.home_room]
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room]

        if(attackFlag){
                var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                var hostileSpawns = creep.pos.findClosestByRange(FIND_HOSTILE_SPAWNS);
                var hostileStructures = creep.pos.findClosestByRange(FIND_HOSTILE_STRUCTURES);

            if(attackFlag.room && (hostileCreeps != null) && (hostileSpawns != null) && (hostileStructures =! null)) {
                if(hostileCreeps) {
                    var target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
                        filter: function(object) {
                            return object.hits < object.hitsMax;
                        }
                    });
                    //console.log(target);
                    if(target) {
                        if(creep.heal(target) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(target);
                        }
                    }
                    else {
                        creep.moveTo(attackFlag);
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

