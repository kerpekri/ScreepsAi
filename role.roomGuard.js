module.exports = {
    run: function(creep) {
        var healerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
           filter: (c) => c.getActiveBodyparts(HEAL) > 0
        });

        if (healerCreep == undefined || healerCreep == null) {
            var attackerCreep = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS, {
               filter: (c) => c.getActiveBodyparts(ATTACK) > 0
            });
        }

        if (healerCreep) {
            if(creep.attack(healerCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(healerCreep);
            }
        } else if(attackerCreep) {
            if(creep.attack(attackerCreep) == ERR_NOT_IN_RANGE) {
                creep.moveTo(attackerCreep);
            }
        } else {
            var roomMineral = creep.pos.findClosestByPath(FIND_MINERALS);
            creep.moveTo(roomMineral);
        }
    }
};