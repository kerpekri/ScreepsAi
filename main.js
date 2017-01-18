// import modules
require('prototype.spawn');
require('prototype.tower');
require('prototype.room');
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceMiner = require('role.longDistanceMiner');
var roleLongDistanceTransporter = require('role.longDistanceTransporter');
var roleLongDistanceBuilder = require('role.longDistanceBuilder');
var roleClaimer = require('role.claimer');
var roleMiner = require('role.miner');
var roleTransporter = require('role.transporter');
var roleAttacker = require('role.attacker');
var roleMaintenanceGuy = require('role.maintenanceGuy');
var roleHealer = require('role.healer');
var roleRoomExplorer = require('role.roomExplorer');
var roleEnergySmoother = require('role.energySmoother');

module.exports.loop = function () {
    // check for memory entries of died creeps by iterating over Memory.creeps
    for (let name in Memory.creeps) {
        // and checking if the creep is still alive
        if (Game.creeps[name] == undefined) {
            // if not, delete the memory entry
            delete Memory.creeps[name];
        }
    }

    runRoles();

    // find all towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);
    // for each tower
    for (let tower of towers) {
        // run tower logic
        tower.defend();
    }

    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];
        let spawnRoom = spawn.room;
        let sources = spawn.room.find(FIND_SOURCES);
        let controller = spawn.room.controller;

        /*if (1 == 2) {
            spawnRoom.buildSourceContainers(spawnRoom, sources);
        }*/

        if (1 == 2) {
            spawnRoom.buildRoadsToSources(spawn, sources);
        }

        /*if (1 == 2) {
            spawnRoom.buildRoadsToController(spawn, controller);
        }

        if (1 == 2) {
            nextAvailableRooms = Game.map.describeExits(spawnRoom.name);;


            for(var key in nextAvailableRooms) {
                var value = nextAvailableRooms[key];
                spawnRoom.buildRoadsFromToLocations(spawn, value)
            }
        }

        //spawnRoom.buildxxx(spawnRoom, spawn.room.controller, spawn);
        */

        if (1 == 2) {
            //spawnRoom.buildRoadsToFlag(spawn, 'extensions');
        }


        let maximumAvailableEnergy = spawn.room.energyCapacityAvailable;

        var links = Game.rooms[spawn.room.name].find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_LINK && s.energy > 0)
        });

        for (let link of links) {
            var storage = spawn.room.storage;

            let targetLink = storage.pos.findInRange(FIND_STRUCTURES, 2, {
                filter: s => s.structureType == STRUCTURE_LINK
            })[0];

            if (targetLink != undefined) {
                if (link.cooldown == 0 && ((targetLink.energyCapacity - targetLink.energy) >= link.energy)) {
                    link.transferEnergy(targetLink);
                }
            }
        };

        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        let spawnBeforeTicksHomeRoom = 50;

        var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester' &&
                                                            c.ticksToLive > spawnBeforeTicksHomeRoom);

        var numberOfMiners = _.sum(creepsInRoom, (c) => c.memory.role == 'miner' &&
                                                        c.ticksToLive > spawnBeforeTicksHomeRoom);

        var numberOfTransporters = _.sum(creepsInRoom, (c) => c.memory.role == 'transporter' &&
                                                              c.ticksToLive > spawnBeforeTicksHomeRoom);

        var numberOfEnergySmoothers = _.sum(creepsInRoom, (c) => c.memory.role == 'energySmoother' &&
                                                                c.ticksToLive > spawnBeforeTicksHomeRoom);

        var numberOfMaintenanceGuys = _.sum(creepsInRoom, (c) => c.memory.role == 'maintenanceGuy' &&
                                                                c.ticksToLive > spawnBeforeTicksHomeRoom);

        var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader' &&
                                                           c.ticksToLive > spawnBeforeTicksHomeRoom);

        var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder' &&
                                                          c.ticksToLive > spawnBeforeTicksHomeRoom);

        var containers = Game.rooms[spawn.room.name].find(FIND_STRUCTURES, {
            filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
        }).length;

        if (containers != 5) {
            if (spawn.memory.harvesterEra == undefined) {
                Game.spawns[spawn.name].setupMinimumHarvesters(spawn);
            }

            if (numberOfHarvesters < spawn.memory.minNumberOfHarvesters) {
                Game.spawns[spawn.name].createHarvester();
            }
        } else {
            if (spawn.memory.harvesterEra != false) {
                Game.spawns[spawn.name].setupMinimumWorkers(spawn);
            }
            if (numberOfHarvesters < spawn.memory.minNumberOfHarvesters) {
                Game.spawns[spawn.name].createHarvester();
            }
            else if (numberOfMiners < spawn.memory.minNumberOfMiners) {
                // check if all sources have miners
                let sources = spawn.room.find(FIND_SOURCES);
                // iterate over all sources
                for (let source of sources) {
                    // if the source has no miner
                    if (!_.some(creepsInRoom, c => c.memory.role == 'miner' && c.memory.sourceId == source.id)) {
                        Game.spawns[spawn.name].createCustomCreep(
                                                    maximumAvailableEnergy,
                                                    'miner',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    source.id);
                        break;
                    }
                }
            }
            else if (numberOfTransporters < spawn.memory.minNumberOfTransporters) {
                let sources = spawn.room.find(FIND_SOURCES);

                for (let source of sources) {
                    let energySource = Game.getObjectById(source.id);

                    let containerId = energySource.pos.findInRange(FIND_STRUCTURES, 1, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER
                    })[0].id;

                    if (!_.some(creepsInRoom, c => c.memory.role == 'transporter' && c.memory.containerId == containerId)) {
                        Game.spawns[spawn.name].createCustomCreep(
                                                    maximumAvailableEnergy,
                                                    'transporter',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    '',
                                                    containerId);
                        break;
                    }
                }

            }
            else if (numberOfEnergySmoothers < spawn.memory.minNumberOfEnergySmoothers) {
                let spawnContainerId = spawn.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })[0].id;

                let controllerContainerId = controller.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })[0].id;

                Game.spawns[spawn.name].createCustomCreep(
                                            maximumAvailableEnergy,
                                            'energySmoother',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            spawnContainerId,
                                            controllerContainerId);
            }
            else if (numberOfMaintenanceGuys < spawn.memory.minNumberOfMaintenanceGuys) {
                let spawnContainerId = spawn.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })[0].id;

                let controllerContainerId = controller.pos.findInRange(FIND_STRUCTURES, 2, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER
                })[0].id;

                Game.spawns[spawn.name].createCustomCreep(
                                            maximumAvailableEnergy,
                                            'maintenanceGuy',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            '',
                                            spawnContainerId,
                                            controllerContainerId);
            }
            else if (numberOfUpgraders < spawn.memory.minNumberOfUpgraders) {
                Game.spawns[spawn.name].createCustomCreep(
                                            maximumAvailableEnergy,
                                            'upgrader');
            }
            else if (numberOfBuilders < spawn.memory.minNumberOfBuilders) {
                Game.spawns[spawn.name].createCustomCreep(
                                            maximumAvailableEnergy,
                                            'builder');
            }
        }

        let longDistanceRooms = spawn.memory.targetRooms;

        if (longDistanceRooms) {
            let targetRooms = longDistanceRooms.split(",");

            for (let targetRoom of targetRooms) {
                let spawnBeforeTicks = 200;

                var numberOfRoomExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'roomExplorer' &&
                                                                      c.memory.targetRoom == targetRoom &&
                                                                      c.ticksToLive > spawnBeforeTicks);

                var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' &&
                                                                 c.memory.targetRoom == targetRoom);

                var numberOfLongDistanceMiners = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceMiner' &&
                                                                           c.memory.targetRoom == targetRoom &&
                                                                           c.ticksToLive > spawnBeforeTicks);

                var numberOfLongDistanceTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceTransporter' &&
                                                                                 c.memory.targetRoom == targetRoom &&
                                                                                 c.ticksToLive > spawnBeforeTicks);

                var numberOfLongDistanceBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceBuilder' &&
                                                                                     c.memory.targetRoom == nextAvailableRoomName);

                if (numberOfRoomExplorers < spawn.memory.minNumberOfRoomExplorers) {
                    Game.spawns[spawn.name].createCreep([TOUGH, TOUGH,
                                                         MOVE, MOVE, MOVE, MOVE,
                                                         ATTACK, ATTACK],
                                                            {role: 'roomExplorer',
                                                             homeRoom: spawn.room.name,
                                                             targetRoom: targetRoom});
                }
                else if (numberOfClaimers < spawn.memory.minNumberOfClaimers) {
                    if (Game.rooms[targetRoom].room == undefined) {
                        Game.spawns[spawn.name].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                                    {role: 'claimer',
                                                    homeRoom: spawn.room.name,
                                                    targetRoom: targetRoom});
                    }
                    else if (Game.rooms[targetRoom].controller.reservation.ticksToEnd < 200) {
                        Game.spawns[spawn.name].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                                    {role: 'claimer',
                                                    homeRoom: spawn.room.name,
                                                    targetRoom: targetRoom});
                    }
                }
               else if (numberOfLongDistanceMiners < spawn.memory.minNumberOfLongDistanceMiners) {
                    Game.spawns[spawn.name].createCustomCreep(
                                                maximumAvailableEnergy,
                                                'longDistanceMiner',
                                                spawn.room.name,
                                                '',
                                                '',
                                                '',
                                                '',
                                                targetRoom); // todo like really bad dude :D
               }
               else if (numberOfLongDistanceTransporters < spawn.memory.minNumberOfLongDistanceTransporters) {
                    Game.spawns[spawn.name].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,
                                                                CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                                {role: 'longDistanceTransporter',
                                 homeRoom: spawn.room.name,
                                 targetRoom: targetRoom});
               }
               else if (numberOfLongDistanceBuilders < spawn.memory.minNumberOfLongDistanceBuilders) {
                            Game.spawns[spawn.name].createCreep([MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK],
                                    {role: 'longDistanceBuilder',
                                     homeRoom: room.name,
                                     targetRoom: nextAvailableRoomName,
                                     working: false}); // working is very IMPORTANT!
                }

            }
        }
    }

    function runRoles() {
        for (let name in Game.creeps) {
            var creep = Game.creeps[name];

            if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            else if (creep.memory.role == 'transporter') {
                roleTransporter.run(creep);
            }
            else if (creep.memory.role == 'energySmoother') {
                roleEnergySmoother.run(creep);
            }
            else if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if (creep.memory.role == 'harvester') {
                roleHarvester.run(creep);
            }
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