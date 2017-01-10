module.exports = function() {
    StructureSpawn.prototype.createCustomCreep =
        function (energyAvailable,
                  roleName,
                  roomName,
                  energySource,
                  sourceContainer,
                  flagName) {
            var body = [];

            if (roleName == 'miner') {
                if (energyAvailable > 600) {
                    // 6W 2M 1C - body part count
                    energyAvailable = 700;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energyAvailable - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                if (energyAvailable > 600) {
                    // 5W 3M 1C - body part count
                    var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 3).slice(0,-1);
                }
                else {
                    var allowedMoveParts = BODYPARTS_ALL[0];
                }
                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName,
                                                           roomName: roomName,
                                                           energySource: energySource,
                                                           sourceContainer: sourceContainer});
            }
            else if (roleName == 'transporter') {
                if (energyAvailable > 600) {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', movePartCount).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', carryPartCount).slice(0,-1);


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            roomName: roomName,
                                            sourceContainer: sourceContainer
                                        });
            }
            else if (roleName == 'energySmoother') {
                if (energyAvailable > 600) {
                    energyAvailable = 300;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', movePartCount).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', carryPartCount).slice(0,-1);


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            roomName: roomName
                                        });
            }
            else if (roleName == 'maintenanceGuy') {
                if (energyAvailable > 600) {
                    energyAvailable = 450;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', movePartCount).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', carryPartCount).slice(0,-1);
                var allowedWorkParts = BODYPARTS_ALL[1];


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts + ',move' // todo - hacky way
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            roomName: roomName
                                        });
            }
            else if (roleName == 'upgrader') {
                if (energyAvailable > 600) {
                    energyAvailable = 1050; // NEAIZTIEC!
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energyAvailable - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                //var allowedMoveParts = BODYPARTS_ALL[0];
                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 4).slice(0,-1);
                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName, roomName: roomName });
            }
            else if (roleName == 'homeHarvester') {
                // TESTED - 700 energy ieguvums no viena creepa
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 7
                var allowedWorkParts = [WORK, WORK, WORK, WORK]; // 4
            }
            /*else if (roleName == 'longDistanceHarvester') {
                // NOT - TESTED
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 9
                var allowedWorkParts = [WORK, WORK]; // 2
            }*/
            else if (roleName == 'builder') {
                if (energyAvailable > 600) {
                    energyAvailable = 450;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energyAvailable / energyNeededForCarryAndMoveParts);
                var carryPartCount = movePartCount * 2;


                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 4).slice(0,-1);
                var allowedCarryParts = _.repeat(BODYPARTS_ALL[2] + ',', 6).slice(0,-1);
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', 2).slice(0,-1);


                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body,
                                        undefined,
                                        {
                                            role: roleName,
                                            roomName: roomName
                                        });
            }
            else if (roleName == 'repairer') {
                // TESTED - 700 energy ieguvums no viena creepa
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 7
                var allowedWorkParts = [WORK, WORK, WORK, WORK]; // 4
            }
            else if (roleName == 'wallRepairer') {
                // TESTED - 700 energy ieguvums no viena creepa
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 7
                var allowedWorkParts = [WORK, WORK, WORK, WORK]; // 4
            }
            else if (roleName == 'longDistanceMiner') {
                if (energyAvailable > 600) {
                    // 6W 2M 1C - body part count
                    energyAvailable = 750;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energyAvailable - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                if (energyAvailable > 600) {
                    // 5W 3M 1C - body part count
                    var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 3).slice(0,-1);
                }
                else {
                    var allowedMoveParts = BODYPARTS_ALL[0];
                }
                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName, closeToSource: false, flagIndex: flagName})
            }

            if (roleName != 'miner' ) {
                // concat all body parts into body array
                var body = allowedMoveParts.concat(allowedWorkParts, allowedCarryParts);

                // create custom creep
                return this.createCreep(body, undefined, { role: roleName, working: false, closeToController: false});
            }
        };
};