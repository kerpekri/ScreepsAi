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
            //var pos = new RoomPosition(25, 25, creep.memory.targetRoom);
            //creep.moveTo(pos);
            //console.log(creep.moveTo(pos))

            /*var route = Game.map.findRoute(creep.room.name, creep.memory.targetRoom);
            var exit = creep.pos.findClosestByRange(route[0].exit);
            console.log(route)
            console.log(exit)*/
            //creep.moveTo(exit);

            /*var pos = new RoomPosition(25, 25, creep.memory.targetRoom);
creep.moveTo(pos);

var route = Game.map.findRoute(creep.room, creep.memory.targetRoom);
 var exit = creep.pos.findClosestByRange(route[0].exit);
 creep.moveTo(exit); */

        }
    }
};
