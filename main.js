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
var roleEnergySmoother = require('role.energySmoother');

var homeRoom = 'E78N18';
// var targetRoom = 'E78N17';

module.exports.loop = function () {
    // loop through all MY available game rooms
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];

        // only do something for rooms with spawn!
        if (room && room.find(FIND_MY_SPAWNS).length > 0) {
            if (room.controller.level <= 3) {
                // 1 - 2 - 3lvl controller
                var minimumNumberOfHarvesters = 4;
                var minimumNumberOfRepairers = 1;

                var minimumNumberOfMiners = 0; // always 2
                var minimumNumberOfTransporters = 0; // always 2
                var minimumNumberOfEnergySmoothers = 0; // always 1
                var minimumNumberOfMaintenanceGuys = 0; // always 3
                var minimumNumberOfUpgraders = 0; // always 2 #
                var minimumNumberOfBuilders = 0;
                // long distance units
                var minimumNumberOfRoomExplorers = 0;
                var minimumNumberOfClaimers = 0;
                var minimumNumberOfLongDistanceBuilders = 0;
                var minimumNumberOfLongDistanceMiners = 0;
                var minimumNumberOfLongDistanceTransporters = 0;
                // attack & defense units
                var minimumNumberOfAttackers = 0;
                var minimumNumberOfHealers = 0;

                var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester');
                var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
            }
            else if (room.controller.level > 3) {
                // early game
                var minimumNumberOfHarvesters = 0; // always 0
                var minimumNumberOfRepairers = 0;   // always 0
                // todo - vajag?
                var minimumNumberOfWallRepairers = 1;

                // base units
                var minimumNumberOfMiners = 2; // always 2
                var minimumNumberOfTransporters = 2; // always 2
                var minimumNumberOfEnergySmoothers = 1; // always 1
                var minimumNumberOfMaintenanceGuys = 3; // always 3
                var minimumNumberOfUpgraders = 2; // always 2 #
                var minimumNumberOfBuilders = 1;
                // long distance units
                var minimumNumberOfRoomExplorers = 1;
                var minimumNumberOfClaimers = 1;
                var minimumNumberOfLongDistanceBuilders = 0;
                var minimumNumberOfLongDistanceMiners = 1;
                var minimumNumberOfLongDistanceTransporters = 1;
                // attack & defense units
                var minimumNumberOfAttackers = 1;
                var minimumNumberOfHealers = 1;

                var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner' &&
                                                               c.memory.roomName == roomName);

                var numberOfTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'transporter' &&
                                                                     c.memory.roomName == roomName);

                var numberOfEnergySmoothers = _.sum(Game.creeps, (c) => c.memory.role == 'energySmoother' &&
                                                                        c.memory.roomName == roomName);

                var numberOfMaintenanceGuys = _.sum(Game.creeps, (c) => c.memory.role == 'maintenanceGuy' &&
                                                                        c.memory.roomName == roomName);

                var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader' &&
                                                                  c.memory.roomName == roomName);

                var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder' &&
                                                                 c.memory.roomName == roomName);

                var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer' &&
                                                                      c.memory.roomName == roomName);

                var numberOfLongDistanceAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');
                var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer');
            }

            var name = undefined;

            AvailableSpawns = room.find(FIND_MY_SPAWNS);

            for (var spawn of AvailableSpawns) {
                var maximum_available_energy = Game.spawns[spawn.name].room.energyCapacityAvailable;

                if (numberOfMiners < minimumNumberOfMiners) {
                    if (_.sum(Game.creeps, (c) => c.memory.role == 'miner' &&
                                                  c.memory.energySource == 'energySourceOne' &&
                                                  c.memory.roomName == roomName) == 1) {

                        energySource = 'energySourceTwo';
                        sourceContainer = 'sourceTwoContainer';
                    }
                    else {
                        energySource = 'energySourceOne';
                        sourceContainer = 'sourceOneContainer';
                    }

                    Game.spawns[spawn.name].createCustomCreep(
                                            maximum_available_energy,
                                            'miner',
                                            roomName,
                                            energySource,
                                            sourceContainer);
                }
                else if (numberOfTransporters < minimumNumberOfTransporters) {
                    if (_.sum(Game.creeps, (c) => c.memory.role == 'transporter' &&
                                                  c.memory.sourceContainer == 'sourceOneContainer') == 1) {
                        sourceContainer = 'sourceTwoContainer'
                    }
                    else {
                       sourceContainer = 'sourceOneContainer'
                    }

                    Game.spawns[spawn.name].createCustomCreep(
                                            maximum_available_energy,
                                            'transporter',
                                            roomName,
                                            '',
                                            sourceContainer);
                }
                else if (numberOfEnergySmoothers < minimumNumberOfEnergySmoothers) {
                    Game.spawns[spawn.name].createCustomCreep(
                                            maximum_available_energy,
                                            'energySmoother',
                                            roomName);
                }
                else if (numberOfMaintenanceGuys < minimumNumberOfMaintenanceGuys) {
                    Game.spawns[spawn.name].createCustomCreep(
                                            maximum_available_energy,
                                            'maintenanceGuy',
                                            roomName);
                }
                else if (numberOfUpgraders < minimumNumberOfUpgraders) {
                    Game.spawns[spawn.name].createCustomCreep(
                                            maximum_available_energy,
                                            'upgrader',
                                            roomName);
                }
                else if (numberOfHarvesters < minimumNumberOfHarvesters) {
                   name = Game.spawns[spawn.name].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], { role: 'homeHarvester', working: false})

                    // if spawning failed and we have no harvesters left
                    if (name == ERR_NOT_ENOUGH_ENERGY && numberOfHarvesters == 0) {
                        // spawn one with what is available
                        //name = Game.spawns[spawn.name].createCustomCreep(
                          //  Game.spawns[spawn.name].room.energyAvailable, 'homeHarvester');
                          name = Game.spawns[spawn.name].createCreep([WORK, CARRY, MOVE, MOVE, MOVE], { role: 'homeHarvester', working: false})
                    }
                }

                else if (numberOfRepairers < minimumNumberOfRepairers) {
                    // spawn a new repairer creeep
                    //name = Game.spawns[spawn.name].createCustomCreep(maximum_available_energy, 'repairer');
                    name = Game.spawns[spawn.name].createCreep([WORK, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, MOVE, MOVE],
                    { role: 'repairer', working: false})
                }
                else if (numberOfBuilders < minimumNumberOfBuilders) {
                    Game.spawns[spawn.name].createCustomCreep(
                                maximum_available_energy,
                                'builder',
                                roomName);
                }
                else if (numberOfLongDistanceAttackers < minimumNumberOfAttackers) {
                    /*name = Game.spawns[spawn.name].createCreep([
                                                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                             ATTACK, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK],
                        {role: 'attacker',
                         home_room: homeRoom});*/
                    name = Game.spawns[spawn.name].createCreep([TOUGH, TOUGH, TOUGH,
                                                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                             ATTACK, ATTACK, ATTACK, ATTACK],
                        {role: 'attacker',
                         home_room: homeRoom});
                    /*name = Game.spawns[spawn.name].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                                             TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                                                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                                                             ATTACK, ATTACK],
                        {role: 'attacker',
                         home_room: homeRoom});*/
                }
                else if (numberOfHealers < minimumNumberOfHealers) {
                    name = Game.spawns[spawn.name].createCreep([MOVE, MOVE,
                                                             HEAL, HEAL],
                        {role: 'healer',
                         home_room: homeRoom});
                    /*name = Game.spawns[spawn.name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                             HEAL, HEAL, HEAL, HEAL, HEAL, HEAL],
                        {role: 'healer',
                         home_room: homeRoom});*/
                }
                else if (numberOfWallRepairers < 0) {
                    // good body part RATIO!
                    name = Game.spawns[spawn.name].createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK],
                    {role: 'wallRepairer',  working: false});
                }

                atTheMomentAvailableEnergy = Game.spawns[spawn.name].room.energyCapacityAvailable;
                nextAvailableRooms = _.values(Game.map.describeExits(room.name));

                //var claimRoom = ['E79N17'];

                //nextAvailableRooms = nextAvailableRooms.concat(claimRoom);

                if (atTheMomentAvailableEnergy > 1200) {
                    // send roomExplorer creep to all available rooms next to spawn room
                    for (var nextAvailableRoomName of nextAvailableRooms) {
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
                            Game.spawns[spawn.name].createCreep([TOUGH, TOUGH,
                                                                 MOVE, MOVE, MOVE, MOVE,
                                                                 ATTACK, ATTACK],
                                                                    {role: 'roomExplorer',
                                                                     homeRoom: room.name,
                                                                     targetRoom: nextAvailableRoomName});
                        }
                        /*else if (numberOfLongDistanceBuilders < minimumNumberOfLongDistanceBuilders) {
                            name = Game.spawns[spawn.name].createCreep([MOVE, MOVE, MOVE, CARRY, WORK, WORK],
                                    {role: 'longDistanceBuilder',
                                     homeRoom: room.name,
                                     targetRoom: nextAvailableRoomName});
                        }*/
                        else if (numberOfLongDistanceMiners < minimumNumberOfLongDistanceMiners) {
                            Game.spawns[spawn.name].createCustomCreep(
                                maximum_available_energy,
                                'longDistanceMiner',
                                room.name,
                                '',
                                '',
                                '',
                                '',
                                nextAvailableRoomName); // todo like really bad dude :D
                        }
                        else if (numberOfLongDistanceTransporters < minimumNumberOfLongDistanceTransporters) {
                            name = Game.spawns[spawn.name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                                    CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                                {role: 'longDistanceTransporter',
                                 homeRoom: room.name,
                                 targetRoom: nextAvailableRoomName});
                        }
                        else if (numberOfClaimers < minimumNumberOfClaimers) {
                            claimerFlag = Game.flags[nextAvailableRoomName + ':ReserveController:' + room.name];

                            if (claimerFlag == undefined) {
                                claimerFlag = Game.flags[nextAvailableRoomName + ':ClaimController:' + room.name];
                            }

                            if (claimerFlag.room == undefined) {
                                name = Game.spawns[spawn.name].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                    {role: 'claimer',
                                     homeRoom: room.name,
                                     targetRoom: nextAvailableRoomName});
                            }
                            else if (claimerFlag.room.controller.reservation == undefined) {
                                name = Game.spawns[spawn.name].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                    {role: 'claimer',
                                     homeRoom: room.name,
                                     targetRoom: nextAvailableRoomName});
                            }
                            else if (claimerFlag.room.controller.reservation.ticksToEnd < 200) {
                                name = Game.spawns[spawn.name].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                    {role: 'claimer',
                                     homeRoom: room.name,
                                     targetRoom: nextAvailableRoomName});
                            }
                        }
                    }

                }
            }
            if (atTheMomentAvailableEnergy > 1200) {
                // find all towers in specific room
                var towers = Game.rooms[roomName].find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_TOWER
                });

                // loop through all towers and find closest enemy creep
                for (let tower of towers) {
                    var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);

                    if (target != undefined) {
                        tower.attack(target);
                    }
                    else {
                        var structure = tower.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (s) => (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_CONTAINER) ||
                                           (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_EXTENSION) ||
                                           (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_STORAGE) ||
                                           (s.hits < (s.hitsMax / 2) && s.structureType == STRUCTURE_LINK)
                        });

                        var closestDamagedUnit = tower.pos.findClosestByRange(FIND_MY_CREEPS, {
                            filter: (creep) => creep.hits < creep.hitsMax
                        });

                        if (structure != undefined) {
                            // build
                            tower.repair(structure);
                        }
                        else if (closestDamagedUnit != undefined) {
                            tower.heal(closestDamagedUnit);
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

                var links = Game.rooms[roomName].find(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_LINK && s.energy > 0)
                });

                for (let link of links) {
                    var targetLinkFlagPos = Game.flags[roomName + ':' + 'targetLink' + ':' + roomName].pos;

                    var targetLink = targetLinkFlagPos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_LINK
                    });

                    if (targetLink != undefined) {
                        if (link.cooldown == 0 && ((targetLink.energyCapacity - targetLink.energy) >= link.energy)) {
                            link.transferEnergy(targetLink);
                        }
                    }
                };
            }

            runRoles(room.name);
        }
    }

    function runRoles(roomName) {
        for (let name in Game.creeps) {
            // access all creep properties in loop
            var creep = Game.creeps[name];

            if (creep.memory.role == 'miner') {
                roleMiner.run(creep, roomName);
            }
            else if (creep.memory.role == 'transporter') {
                roleTransporter.run(creep, roomName);
            }
            else if (creep.memory.role == 'energySmoother') {
                roleEnergySmoother.run(creep, roomName);
            }
            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep, roomName);
            }
            //else if (creep.memory.role == 'homeHarvester') {
              //  roleHarvester.run(creep);
            //}
            else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep, roomName);
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

