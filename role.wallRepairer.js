module.exports = {
    run: function(creep) {
        /*
            working - get energy back to HQ
            not_working - go to source -> get energy
        */

        // the creep is working right now and no energy left
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        // we are not working and creep is full of energy get back to HQ
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {
            creep.memory.working = true;
        }

        // if it is working
        if (creep.memory.working == true) {
            creep.say('rep rampart');
            var damagedRampart = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_RAMPART && i.hits < 30001
            });

            if (damagedRampart != undefined) {
                if (creep.repair(damagedRampart) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedRampart);
                }
            }
            else {
                creep.say('rep wall');
                var damagedWall = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (i) => i.structureType == STRUCTURE_WALL && i.hits < 30001
                });

                if (damagedWall != undefined) {
                    if (creep.repair(damagedWall) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(damagedWall);
                    }
                }
            }
        }
        else {
            creep.say('get energy');
            if (creep.carry.energy != creep.carryCapacity) {
                var source = creep.pos.findClosestByPath(FIND_SOURCES);

                if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source);
                }
            }
        }
    }
};