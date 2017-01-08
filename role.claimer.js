module.exports = {
    run: function(creep) {
        var claimFlag = Game.flags[creep.memory.targetRoom + ':ReserveController:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if(claimFlag){
            if(creep.room == claimFlag.room) {
                if (creep.reserveController(claimFlag.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(claimFlag.room.controller)
                }
            } else {
                creep.moveTo(claimFlag)
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};