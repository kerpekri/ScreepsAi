module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.homeRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else if (creep.room.name == creep.memory.targetRoom) {
            var hostileCreeps = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

            if (hostileCreeps) {
                if(creep.attack(hostileCreeps) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(hostileCreeps);
                }
            } else {
                var roomMineral = creep.pos.findClosestByPath(FIND_MINERALS);;
                creep.moveTo(roomMineral);
            }
        }
        else {
        }
    }
};