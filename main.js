// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceMiner = require('role.longDistanceMiner');
var roleLongDistanceTransporter = require('role.longDistanceTransporter');
var roleLongDistanceBuilder = require('role.longDistanceBuilder');
var roleClaimer = require('role.claimer');

// refactored modules
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleAttacker = require('role.attacker');
var roleMaintenanceGuy = require('role.maintenanceGuy');
var roleHealer = require('role.healer');
var roleRoomExplorer = require('role.roomExplorer');

var homeRoom = 'E78N18';
var targetRoom = 'E78N17';

module.exports.loop = function () {
    // loop through all MY available game rooms
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];

        // only do something for rooms with spawn!
        if (room && room.find(FIND_MY_SPAWNS).length > 0) {
            if (room.controller.level < 3) {
                // 2lvl -> 3lvl = 45k energ
                var minimumNumberOfHarvesters = 4;
                var minimumNumberOfUpgraders = 2; // piefikso upgraders functionality, ka no sakuma nem energy no energy source
                var minimumNumberOfBuilders = 2;
                var minimumNumberOfRepairers = 1;
            }
            else if (room.controller.level > 3 && room.controller.level < 7) {
            }
            else {
            // > 6 lvl
            }

            // base units
            var minimumNumberOfMiners = 2; // always 2
            var minimumNumberOfHarvesters = 0;
            var minimumNumberOfUpgraders = 2; // always 2 # TODO
            var minimumNumberOfBuilders = 1;
            var minimumNumberOfRepairers = 1;
            var minimumNumberOfWallRepairers = 1;
            var minimumNumberOfTransporters = 2; // always 2
            var minimumNumberOfMaintenanceGuys = 3; // always 3 - maybe?

            // long distance units
            var minimumNumberOfRoomExplorers = 1;
            var minimumNumberOfClaimers = 1;
            var minimumNumberOfLongDistanceBuilders = 0;
            var minimumNumberOfLongDistanceMiners = 1;
            var minimumNumberOfLongDistanceTransporters = 1;

            // attack & defense units
            var minimumNumberOfAttackers = 0;
            var minimumNumberOfHealers = 0;


            var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
            var numberOfTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'transporter');
            var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'homeHarvester');
            var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');
            var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');
            var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
            var numberOfLongDistanceAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');
            var numberOfMaintenanceGuys = _.sum(Game.creeps, (c) => c.memory.role == 'maintenanceGuy');
            var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');
            var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer');

            // Maximum available_energy in room from HQ & extensions
            var maximum_available_energy = Game.spawns['TX-HQ'].room.energyCapacityAvailable;

            var name = undefined;

            if (numberOfMiners < minimumNumberOfMiners) {
                if (_.sum(Game.creeps, (c) => c.memory.role == 'miner' && c.memory.flagIndex == 'sourceOne') == 1) {
                    flagIndex = 'sourceTwo'
                }
                else {
                   flagIndex = 'sourceOne'
                }

                name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'miner', flagIndex);
            }
            else if (numberOfTransporters < minimumNumberOfTransporters) {
                if (_.sum(Game.creeps, (c) => c.memory.role == 'transporter' && c.memory.flagIndex == 'sourceOneContainer') == 1) {
                    flagIndex = 'sourceTwoContainer'
                }
                else {
                   flagIndex = 'sourceOneContainer'
                }

                name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'transporter', flagIndex);
            }
            else if (numberOfMaintenanceGuys < minimumNumberOfMaintenanceGuys) {
                flagIndex = 'test';
                name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'maintenanceGuy', flagIndex);
            }
            else if (numberOfUpgraders < minimumNumberOfUpgraders) {
                name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'upgrader', '1');
            }
            else if (numberOfHarvesters < minimumNumberOfHarvesters) {
               // name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'homeHarvester');
               name = Game.spawns['TX-HQ'].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], { role: 'homeHarvester', working: false})

                // if spawning failed and we have no harvesters left
                if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
                    // spawn one with what is available
                    //name = Game.spawns['TX-HQ'].createCustomCreep(
                      //  Game.spawns['TX-HQ'].room.energyAvailable, 'homeHarvester');
                      name = Game.spawns['TX-HQ'].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], { role: 'homeHarvester', working: false})
                }
            }

            else if (numberOfRepairers < minimumNumberOfRepairers) {
                // spawn a new repairer creeep
                //name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'repairer');
                name = Game.spawns['TX-HQ'].createCreep([WORK, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, MOVE, MOVE],
                { role: 'repairer', working: false})
            }
            else if (numberOfBuilders < minimumNumberOfBuilders) {
                // spawn a new builder creeep
                //name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'builder');
                name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, CARRY, CARRY, WORK, WORK], { role: 'builder', working: false})
            }
            else if (numberOfLongDistanceAttackers < minimumNumberOfAttackers) {
                name = Game.spawns['TX-HQ'].createCreep([TOUGH, TOUGH, TOUGH,
                                                         MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                         ATTACK, ATTACK, ATTACK, ATTACK],
                    {role: 'attacker',
                     home_room: homeRoom});
                /*name = Game.spawns['TX-HQ'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                                         TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                                         MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                                                         MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                                                         ATTACK, ATTACK],
                    {role: 'attacker',
                     home_room: homeRoom});*/
            }
            else if (numberOfHealers < minimumNumberOfHealers) {
                name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE,
                                                         HEAL, HEAL],
                    {role: 'healer',
                     home_room: homeRoom});
                /*name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                         HEAL, HEAL, HEAL, HEAL, HEAL, HEAL],
                    {role: 'healer',
                     home_room: homeRoom});*/
            }
            else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
                // good body part RATIO!
                name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], {role: 'wallRepairer',  working: false});
            }

            atTheMomentAvailableEnergy = Game.spawns['TX-HQ'].room.energyAvailable;
            nextAvailableRooms = _.values(Game.map.describeExits(room.name));

            if (atTheMomentAvailableEnergy > 1200) {
                // send roomExplorer creep to all available rooms next to spawn room
                for (var nextAvailableRoomName of nextAvailableRooms) {
                    //console.log(nextAvailableRoomName);
                    var numberOfRoomExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'roomExplorer' &&
                                                                          c.memory.targetRoom == nextAvailableRoomName);

                    var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' &&
                                                                     c.memory.targetRoom == nextAvailableRoomName);

                    /*var numberOfLongDistanceBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceBuilder' &&
                                                                                 c.memory.targetRoom == nextAvailableRoomName);*/

                    var numberOfLongDistanceTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceTransporter' &&
                                                                                     c.memory.targetRoom == nextAvailableRoomName);

                    var numberOfLongDistanceMiners = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceMiner' &&
                                                                               c.memory.targetRoom == nextAvailableRoomName);

                    if (numberOfRoomExplorers < minimumNumberOfRoomExplorers) {
                        // pagaidām atstājam, ka ir hardcoded spawn
                        Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, ATTACK],
                                                                {role: 'roomExplorer',
                                                                 homeRoom: room.name,
                                                                 targetRoom: nextAvailableRoomName});
                    }
                    /*else if (numberOfLongDistanceBuilders < minimumNumberOfLongDistanceBuilders) {
                        name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, CARRY, WORK, WORK],
                                {role: 'longDistanceBuilder',
                                 homeRoom: room.name,
                                 targetRoom: nextAvailableRoomName});
                    }*/
                    else if (numberOfLongDistanceMiners < minimumNumberOfLongDistanceMiners) {
                        name = Game.spawns['TX-HQ'].createCreep([WORK, WORK, WORK, WORK, WORK,
                                                                 CARRY, MOVE, MOVE, MOVE, MOVE, MOVE],
                            {role: 'longDistanceMiner',
                             homeRoom: room.name,
                             targetRoom: nextAvailableRoomName});
                    }
                    else if (numberOfLongDistanceTransporters < minimumNumberOfLongDistanceTransporters) {
                        name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                            {role: 'longDistanceTransporter',
                             homeRoom: room.name,
                             targetRoom: nextAvailableRoomName});
                    }
                    else if (numberOfClaimers < minimumNumberOfClaimers) {
                        if (Game.flags[nextAvailableRoomName + ':ReserveController:' + room.name].room == undefined) {
                            name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                {role: 'claimer',
                                 homeRoom: room.name,
                                 targetRoom: nextAvailableRoomName});
                        }
                        else if (Game.flags[nextAvailableRoomName + ':ReserveController:' + room.name].room.controller.reservation == undefined) {
                            name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                {role: 'claimer',
                                 homeRoom: room.name,
                                 targetRoom: nextAvailableRoomName});
                        }
                        else if (Game.flags[nextAvailableRoomName + ':ReserveController:' + room.name].room.controller.reservation.ticksToEnd < 200) {
                            name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                {role: 'claimer',
                                 homeRoom: room.name,
                                 targetRoom: nextAvailableRoomName});
                        }
                    }
                }

            }

            // find all towers in specific room
            var towers = Game.rooms.E78N18.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_TOWER
            });

            // loop through all towers and find closest enemy creep
            for (let tower of towers) {
                var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
                if (target != undefined) {
                    // attack enemy creep
                    tower.attack(target);
                }
                else {
                    var structure = tower.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_CONTAINER) ||
                                       (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_EXTENSION) ||
                                       (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_STORAGE) ||
                                       (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_LINK)
                    });

                    if (structure != undefined) {
                        // build
                        tower.repair(structure);
                    }
                    else {
                        var structure = tower.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (s) => (s.hits < (s.hitsMax / 10) && s.structureType == STRUCTURE_ROAD) ||
                                           (s.hits < (s.hitsMax / 500) && s.structureType == STRUCTURE_RAMPART)
                        });

                        if (structure != undefined) {
                            // build
                            tower.repair(structure);
                        }
                    }
                }
            };

            runRoles(room.name);
        }
    }

    function runRoles(roomName) {
        //console.log(roomName);
        for (let name in Game.creeps) {
            // access all creep properties in loop
            var creep = Game.creeps[name];

            if (creep.memory.role == 'miner') {
                roleMiner.run(creep, roomName);
            }
            else if (creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            //else if (creep.memory.role == 'homeHarvester') {
              //  roleHarvester.run(creep);
            //}
            else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            else if (creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
            else if (creep.memory.role == 'longDistanceBuilder') {
                roleLongDistanceBuilder.run(creep);
            }
            else if (creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
            else if (creep.memory.role == 'attacker') {
                roleAttacker.run(creep);
            }
            else if (creep.memory.role == 'healer') {
                roleHealer.run(creep);
            }
            else if (creep.memory.role == 'maintenanceGuy') {
                roleMaintenanceGuy.run(creep);
            }
            else if (creep.memory.role == 'wallRepairer') {
                roleWallRepairer.run(creep);
            }
            else if (creep.memory.role == 'longDistanceMiner') {
                roleLongDistanceMiner.run(creep);
            }
            else if (creep.memory.role == 'longDistanceTransporter') {
                roleLongDistanceTransporter.run(creep);
            }
            else if (creep.memory.role == 'roomExplorer') {
                roleRoomExplorer.run(creep);
            }
        }
    };
};

