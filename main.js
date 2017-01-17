// import modules
require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWallRepairer = require('role.wallRepairer');
var roleLongDistanceMiner = require('role.longDistanceMiner');
//var roleLongDistanceTransporter = require('role.longDistanceTransporter');
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
    runRoles();
    /*

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

    */

    // find all towers in specific room
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

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

    for (let spawnName in Game.spawns) {
        let spawn = Game.spawns[spawnName];

        let creepsInRoom = spawn.room.find(FIND_MY_CREEPS);
        let maximumAvailableEnergy = spawn.room.energyCapacityAvailable;

        var numberOfHarvesters = _.sum(creepsInRoom, (c) => c.memory.role == 'harvester' &&
                                                            c.ticksToLive > 50);

        var numberOfMiners = _.sum(creepsInRoom, (c) => c.memory.role == 'miner' &&
                                                        c.ticksToLive > 50);

        var numberOfTransporters = _.sum(creepsInRoom, (c) => c.memory.role == 'transporter' &&
                                                              c.ticksToLive > 50);

        var numberOfEnergySmoothers = _.sum(creepsInRoom, (c) => c.memory.role == 'energySmoother' &&
                                                                c.ticksToLive > 50);

        var numberOfMaintenanceGuys = _.sum(creepsInRoom, (c) => c.memory.role == 'maintenanceGuy' &&
                                                                c.ticksToLive > 50);

        var numberOfUpgraders = _.sum(creepsInRoom, (c) => c.memory.role == 'upgrader' &&
                                                           c.ticksToLive > 50);

        var numberOfBuilders = _.sum(creepsInRoom, (c) => c.memory.role == 'builder' &&
                                                          c.ticksToLive > 50);

        if (numberOfMiners < spawn.memory.minNumberOfMiners) {
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
        else if (numberOfHarvesters < spawn.memory.minNumberOfHarvesters) {
            Game.spawns[spawn.name].createCustomCreep(
                                    300,
                                    'harvester');
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
            Game.spawns[spawn.name].createCustomCreep(
                                        maximumAvailableEnergy,
                                        'energySmoother');
        }
        else if (numberOfMaintenanceGuys < spawn.memory.minNumberOfMaintenanceGuys) {
            Game.spawns[spawn.name].createCustomCreep(
                                        maximumAvailableEnergy,
                                        'maintenanceGuy');
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

        let longDistanceRooms = spawn.memory.targetRooms;

        if (longDistanceRooms) {
            let targetRooms = longDistanceRooms.split(",");

            for (let targetRoom of targetRooms) {
                var numberOfRoomExplorers = _.sum(Game.creeps, (c) => c.memory.role == 'roomExplorer' &&
                                                                      c.memory.targetRoom == targetRoom &&
                                                                      c.ticksToLive > 100);

                var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer' &&
                                                                 c.memory.targetRoom == targetRoom);

                var numberOfLongDistanceMiners = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceMiner' &&
                                                                           c.memory.targetRoom == targetRoom &&
                                                                           c.ticksToLive > 100);

                var numberOfLongDistanceTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceTransporter' &&
                                                                                 c.memory.targetRoom == targetRoom &&
                                                                                 c.ticksToLive > 100);

                var numberOfLongDistanceBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceBuilder' &&
                                                                                     c.memory.targetRoom == nextAvailableRoomName);

                if (numberOfRoomExplorers < spawn.memory.minNumberOfRoomExplorers) {
                    Game.spawns[spawn.name].createCreep([MOVE, MOVE,
                                                         ATTACK],
                                                            {role: 'roomExplorer',
                                                             homeRoom: spawn.room.name,
                                                             targetRoom: targetRoom});
                    /*Game.spawns[spawn.name].createCreep([TOUGH, TOUGH,
                                                         MOVE, MOVE, MOVE, MOVE,
                                                         ATTACK, ATTACK],
                                                            {role: 'roomExplorer',
                                                             homeRoom: spawn.room.name,
                                                             targetRoom: targetRoom});*/
                }
                else if (numberOfClaimers < spawn.memory.minNumberOfClaimers) {
                    Game.spawns[spawn.name].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                                {role: 'claimer',
                                                 homeRoom: spawn.room.name,
                                                 targetRoom: targetRoom});

                    /*if (claimerFlag.room == undefined) {
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
                    }*/
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
            // access all creep properties in loop
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
                //roleLongDistanceTransporter.run(creep);
            }
            else if (creep.memory.role == 'roomExplorer') {
                roleRoomExplorer.run(creep);
            }
        }
    };
};