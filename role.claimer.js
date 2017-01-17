module.exports = {
    run: function(creep) {
        if (creep.room.name == creep.memory.homeRoom) {
            var exit = creep.room.findExitTo(creep.memory.targetRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        else if (creep.room.name == creep.memory.targetRoom) {
            /* TODO - claim part
                if (creep.claimController(claimFlag.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(claimFlag.room.controller)
                }
            */

            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            var exit = creep.room.findExitTo(creep.memory.homeRoom);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
    }
};