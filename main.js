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

var homeRoom = 'E78N18';
var targetRoom = 'E78N17';

// Game.spawns['TX-HQ'].room.storage.id
// var source = Game.getObjectById(creep.memory.targetSourceId);
//creep.moveTo(source);

// Game.spawns['TX-HQ'].room.find(FIND_SOURCES) -- Game.rooms.E78N18.find(FIND_SOURCES)
// Game.spawns['TX-HQ'].room.controller

module.exports.loop = function () {
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        for (var spawnName in Game.spawns) {
            var spawn = Game.spawns[spawnName];

            // filter out claimers
            //var xxx = _.sum(Game.creeps, (c) => c.memory.role == 'attacker' && console.log('x: ' + c.room));
            //console.log(room);


            if (spawn.room.name ==  roomName) {
                // run code for BUILDING rooms with a spawn building
                //console.log(room.controller.level);


                if (room.controller.level < 3) {
                    // 2lvl -> 3lvl = 45k energ
                    var minimumNumberOfHarvesters = 4;
                    var minimumNumberOfUpgraders = 2; // piefikso upgraders functionality, ka no sakuma nem energy no energy source
                    var minimumNumberOfBuilders = 2;
                    var minimumNumberOfRepairers = 1;
                }
                else if (room.controller.level > 3 && room.controller.level < 7) {
                    // 4 - 5 - 6lvl
                    var minimumNumberOfMiners = 2;
                    //var minimumNumberOfHarvesters = 0;
                    var minimumNumberOfUpgraders = 2;
                    var minimumNumberOfBuilders = 1;
                    var minimumNumberOfRepairers = 2;
                    var minimumNumberOfWallRepairers = 1;
                    var minimumNumberOfLongDistanceMiners = 1;
                    var minimumNumberOfTransporters = 2;
                    var minimumNumberOfClaimers = 1;
                    var minimumNumberOfLongDistanceBuilders = 1;
                    var minimumNumberOfLongDistanceTransporters = 2;
                    var minimumNumberOfAttackers = 4;
                    var minimumNumberOfMaintenanceGuys = 1;
                    var minimumNumberOfHealers = 0;
                }
                else {
                // > 6 lvl
                    var minimumNumberOfMiners = 2;
                    var minimumNumberOfHarvesters = 0;
                    var minimumNumberOfUpgraders = 2;
                    var minimumNumberOfBuilders = 1;
                    var minimumNumberOfRepairers = 2;
                    var minimumNumberOfWallRepairers = 1;
                    var minimumNumberOfLongDistanceMiners = 1;
                    var minimumNumberOfTransporters = 2;
                    var minimumNumberOfClaimers = 1;
                    var minimumNumberOfLongDistanceBuilders = 1;
                    var minimumNumberOfLongDistanceTransporters = 2;
                    var minimumNumberOfAttackers = 4;
                    var minimumNumberOfMaintenanceGuys = 1;
                    var minimumNumberOfHealers = 0;
                }

                var minimumNumberOfMiners = 2;
                var minimumNumberOfHarvesters = 0;
                var minimumNumberOfUpgraders = 2;
                var minimumNumberOfBuilders = 1;
                var minimumNumberOfRepairers = 2;
                var minimumNumberOfWallRepairers = 1;
                var minimumNumberOfLongDistanceMiners = 1;
                var minimumNumberOfTransporters = 2;
                var minimumNumberOfClaimers = 1;
                var minimumNumberOfLongDistanceBuilders = 1;
                var minimumNumberOfLongDistanceTransporters = 2;
                var minimumNumberOfAttackers = 2;
                var minimumNumberOfMaintenanceGuys = 3;
                var minimumNumberOfHealers = 0;

                // sum all Miner creeps
                var numberOfMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');

                // sum all Miner creeps
                var numberOfTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'transporter');

                // filter out harvesters
                var numberOfHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'homeHarvester');

                // filter out upgraders
                var numberOfUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');

                // filter out builders
                var numberOfBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');

                // filter out repairers
                var numberOfRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
                // claimers
                var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
                // filter out long distance builders
                var numberOfLongDistanceBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceBuilder');

                // filter out long distance builders
                var numberOfLongDistanceAttackers = _.sum(Game.creeps, (c) => c.memory.role == 'attacker');

                // filter out maintenance guys
                var numberOfMaintenanceGuys = _.sum(Game.creeps, (c) => c.memory.role == 'maintenanceGuy');

                // filter out Wall Repairers
                var numberOfWallRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'wallRepairer');

                // filter out Long Distance Harvesters
                var numberOfLongDistanceMiners = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceMiner');

                // filter out Long Distance Transporters
                var numberOfLongDistanceTransporters = _.sum(Game.creeps, (c) => c.memory.role == 'longDistanceTransporter');

                // filter out Long Distance Transporters
                var numberOfHealers = _.sum(Game.creeps, (c) => c.memory.role == 'healer');


                // run roles
                runRoles();

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
                                filter: (s) => (s.hits < (s.hitsMax / 10) && s.structureType == STRUCTURE_ROAD) //||
                                               //(s.hits < (s.hitsMax / 180) && s.structureType == STRUCTURE_RAMPART)
                            });

                            if (structure != undefined) {
                                // build
                                tower.repair(structure);
                            }
                        }
                    }
                };


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
                else if (numberOfUpgraders < minimumNumberOfUpgraders) {
                    name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'upgrader');
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
                    name = Game.spawns['TX-HQ'].createCreep([WORK, WORK, CARRY, MOVE, MOVE, CARRY, CARRY, CARRY, MOVE, MOVE],
                    { role: 'repairer', working: false})
                }
                else if (numberOfBuilders < minimumNumberOfBuilders) {
                    // spawn a new builder creeep
                    //name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'builder');
                    name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, CARRY, CARRY, WORK, WORK], { role: 'builder', working: false})
                }
                else if (numberOfLongDistanceBuilders < minimumNumberOfLongDistanceBuilders) {
                    name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, CARRY, WORK, WORK],
                            {role: 'longDistanceBuilder', home_room: homeRoom, working: false});
                }
                else if (numberOfMaintenanceGuys < minimumNumberOfMaintenanceGuys) {
                    flagIndex = 'test';
                    name = Game.spawns['TX-HQ'].createCustomCreep(maximum_available_energy, 'maintenanceGuy', flagIndex);
                }
                else if (numberOfLongDistanceAttackers < minimumNumberOfAttackers) {
                    ///



                    ///
                    name = Game.spawns['TX-HQ'].createCreep([TOUGH,
                                                             MOVE, MOVE,
                                                             ATTACK],
                        {role: 'attacker',
                         home_room: homeRoom});
                    /*name = Game.spawns['TX-HQ'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, TOUGH,
                                                             MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE,MOVE,
                                                             ATTACK, ATTACK],
                        {role: 'attacker',
                         home_room: homeRoom});*/
                }
                else if (numberOfHealers < minimumNumberOfHealers) {
                    name = Game.spawns['TX-HQ'].createCreep([TOUGH, TOUGH,
                                                             MOVE, MOVE, MOVE, MOVE,
                                                             HEAL, HEAL],
                        {role: 'healer',
                         home_room: homeRoom});
                }
                else if (numberOfWallRepairers < minimumNumberOfWallRepairers) {
                    // good body part RATIO!
                    name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, CARRY, CARRY, WORK, WORK], {role: 'wallRepairer',  working: false});
                }
                else if (numberOfLongDistanceMiners < minimumNumberOfLongDistanceMiners) {
                    name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, CARRY, WORK, WORK, WORK, WORK],
                        {role: 'longDistanceMiner', home_room: homeRoom, working: false});
                }
                else if (numberOfLongDistanceTransporters < minimumNumberOfLongDistanceTransporters) {
                    name = Game.spawns['TX-HQ'].createCreep([MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                        {role: 'longDistanceTransporter', home_room: homeRoom, working: false});
                }
                else if (numberOfClaimers < minimumNumberOfClaimers) {

                    if (Game.flags['Controller:Claim:E78N18'].room.controller.reservation == undefined) {
                        name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                            {role: 'claimer',
                             home_room: homeRoom});
                    }
                    else if (Game.flags['Controller:Claim:E78N18'].room.controller.reservation.ticksToEnd < 200) {
                        name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                            {role: 'claimer',
                             home_room: homeRoom});
                    }
                }


                // te
            }
            else {
                var NeedToReserveRooms = ['E78N17','E79N18'];
                var pos = new RoomPosition(32, 26, 'E79N18');
                //console.log(roomName);

                if (NeedToReserveRooms.indexOf(roomName) > -1) {
                    var minimumNumberOfClaimers = 1;
                    // filter out claimers
                    var numberOfClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');
                    //E79N18:ReserveController:E78N18
                    /*if (numberOfClaimers < minimumNumberOfClaimers) {

                        if (Game.flags['Controller:Claim:E78N18'].room.controller.reservation == undefined) {
                            name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                {role: 'claimer',
                                 home_room: homeRoom});
                        }
                        else if (Game.flags['Controller:Claim:E78N18'].room.controller.reservation.ticksToEnd < 200) {
                            name = Game.spawns['TX-HQ'].createCreep([CLAIM, CLAIM, MOVE, MOVE],
                                {role: 'claimer',
                                 home_room: homeRoom});
                        }
                    }*/
                }

                // run code for CONNECTING rooms without a spawn building
                // AT THE MOMENT DONT DO ANYTHING FOR ROOMS WITHOUT SPAWN
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
        }
    };
};

