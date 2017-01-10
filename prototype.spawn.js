module.exports = function() {
    // Custom function for creating creep body
    StructureSpawn.prototype.createCustomCreep =
        function (energy_available, roleName, flagIndex) {
            var body = [];

            if (roleName == 'miner') {
                if (energy_available > 600) {
                    // 6W 2M 1C - body part count
                    energy_available = 700;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energy_available - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                if (energy_available > 600) {
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

                console.log(this.createCreep(body, undefined, { role: roleName, closeToSource: false, flagIndex: flagIndex}));

                return this.createCreep(body, undefined, { role: roleName, closeToSource: false, flagIndex: flagIndex});
            }
            else if (roleName == 'transporter') {
                if (energy_available > 600) {
                    energy_available = 450;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energy_available / energyNeededForCarryAndMoveParts);
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
                                            GetEnergyFromContainer: true,
                                            MoveEnergyToContainer: false,
                                            flagIndex: flagIndex
                                        });
            }
            else if (roleName == 'maintenanceGuy') {
                if (energy_available > 600) {
                    energy_available = 450;
                }

                var energyNeededForCarryAndMoveParts =  (BODYPART_COST['carry'] * 2) + BODYPART_COST['move'];
                var movePartCount = Math.floor(energy_available / energyNeededForCarryAndMoveParts);
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
                                            GetEnergyFromContainer: true,
                                            MoveEnergyToContainer: false,
                                            flagIndex: flagIndex
                                        });
            }
            else if (roleName == 'upgrader') {
                if (energy_available > 600) {
                    energy_available = 1050; // NEAIZTIEC!
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energy_available - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                //var allowedMoveParts = BODYPARTS_ALL[0];
                var allowedMoveParts = _.repeat(BODYPARTS_ALL[0] + ',', 4).slice(0,-1);
                var allowedCarryParts = BODYPARTS_ALL[2];
                var allowedWorkParts = _.repeat(BODYPARTS_ALL[1] + ',', workPartCount).slice(0,-1);

                // only now needed
                var allPartsTogether = allowedMoveParts + ',' + allowedCarryParts + ',' + allowedWorkParts
                var body = allPartsTogether.split(",");

                return this.createCreep(body, undefined, { role: roleName, closeToController: false});
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
                // TESTED - 700 energy ieguvums no viena creepa
                var allowedMoveParts = [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE]; // 6
                var allowedCarryParts = [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]; // 7
                var allowedWorkParts = [WORK, WORK, WORK, WORK]; // 4
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
                if (energy_available > 600) {
                    // 6W 2M 1C - body part count
                    energy_available = 750;
                }

                var energyNeededForCarryAndMoveParts =  BODYPART_COST['move'] +  BODYPART_COST['carry'];
                var workPartCount = Math.floor((energy_available - energyNeededForCarryAndMoveParts) / BODYPART_COST['work']);

                if (energy_available > 600) {
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

                return this.createCreep(body, undefined, { role: roleName, closeToSource: false, flagIndex: flagIndex})
            }

            if (roleName != 'miner' ) {
                // concat all body parts into body array
                var body = allowedMoveParts.concat(allowedWorkParts, allowedCarryParts);

                // create custom creep
                return this.createCreep(body, undefined, { role: roleName, working: false, closeToController: false});
            }
        };
};