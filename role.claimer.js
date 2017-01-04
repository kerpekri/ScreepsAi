module.exports = {
    run: function(creep) {
        var claimFlag = Game.flags['Controller:Claim:' + creep.memory.home_room]
        var homeFlag = Game.flags['Controller:Home:' + creep.memory.home_room]

        if(claimFlag){
            if(claimFlag.room && claimFlag.room.controller) {
                if (creep.reserveController(claimFlag.room.controller) == ERR_NOT_IN_RANGE){
                    creep.moveTo(claimFlag.room.controller)
                    creep.say('Claimer: Claim')
                } else {
                    creep.say('Claimer: Claiming')
                }
            } else {
                creep.moveTo(claimFlag)
                creep.say('Claimer: Claim')
            }
        } else {
            creep.moveTo(homeFlag);
        }
    }
};