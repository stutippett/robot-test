const Room = require('./classes/room.js');
const Robot = require('./classes/robot.js');

const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

const GVC = {
    room : null,
    startClean : (input) => {
        let lines = input.split('\n');

        // Create a new room with the coodrinates
        GVC.room = new Room(lines[0].split(' '));
        // Now remove the room coordinates from the array
        lines.shift();

        lines.forEach(line => {
            // Between robots there will be an empty line, so do nothing
            if(line.length === 0) {
                return;
            }

            // If this is a new robot, there will be 3 instructions: x, y, orientation
            if(line.split(' ').length === 3) {
                // Get some properties to pass to the robot
                let props = line.split(' ').concat(GVC.room.roomData);
                // Initialise a new robot and add it to the room
                GVC.room.robots.push(new Robot(props));
                return;
            }

            // Otherwise this is a set of instructions, so move the last robot that was added to the room
            let nextRobot = GVC.room.robots[GVC.room.robots.length - 1];
            let output = nextRobot.start(line.split(''));

            // Log the fall point with the room
            if(output.fallen) {
                GVC.room.fallPoints.push(output.fallen);
            }   
            
            console.log(output.posX + ' ' + output.posY + ' ' + output.orientation + (output.fallen ? ' LOST' : ''));
        });
    }
};

GVC.startClean(input);
