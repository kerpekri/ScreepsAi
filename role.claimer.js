module.exports = {
    run: function(creep) {
        var claimFlag = Game.flags[creep.memory.targetRoom + ':ClaimController:' + creep.memory.homeRoom];
        var reserveFlag = Game.flags[creep.memory.targetRoom + ':ReserveController:' + creep.memory.homeRoom];
        var homeFlag = Game.flags[creep.memory.homeRoom + ':Home:' + creep.memory.homeRoom];

        if (claimFlag) {
            if(creep.room == claimFlag.room) {
                if (creep.claimController(claimFlag.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(claimFlag.room.controller)
                }
            } else {
                creep.moveTo(claimFlag)
            }
        }
        else if(reserveFlag){
            if(creep.room == reserveFlag.room) {
                if (creep.reserveController(reserveFlag.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(reserveFlag.room.controller)
                }
            } else {
                creep.moveTo(reserveFlag)
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};