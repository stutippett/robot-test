const input = `5 3
1 1 E
RFRFRFRF

3 2 N
FRRFLLFFRRFLL

0 3 W
LLFFFLFLFL`;

const app = {
    room : {
        boundX : null,
        boundY : null
    },
    fallPoints : [],
    robot : {
        posX : null,
        posY : null,
        orientation : null,
        fallen : false
    },
    turn(dir) {
        if(app.robot.orientation === 'N') {
            app.robot.orientation = dir === 'L' ? 'W' : 'E';
        } else if(app.robot.orientation === 'E') {
            app.robot.orientation = dir === 'L' ? 'N' : 'S';
        } else if(app.robot.orientation === 'S') {
            app.robot.orientation = dir === 'L' ? 'E' : 'W';
        } else if(app.robot.orientation === 'W') {
            app.robot.orientation = dir === 'L' ? 'S' : 'N';
        }
    },
    move(dir) {
        // Store the current grid location in case of a fall
        let currLoc = {
            posX : app.robot.posX,
            posY : app.robot.posY
        };

        // We only have 'F' (forward) at the moment, but more instructions can be added
        if(dir === 'F') {
            // Ignore the command if the robot would fall off
            if(app.fallPoints.indexOf(app.robot.posX + app.robot.posY + app.robot.orientation) === -1) {
                if(app.robot.orientation === 'N') {
                    app.robot.posY++;
                } else if(app.robot.orientation === 'E') {
                    app.robot.posX++;
                } else if(app.robot.orientation === 'S') {
                    app.robot.posY--;
                } else if(app.robot.orientation === 'W') {
                    app.robot.posX--;
                }
            }
        }

        if(app.hasFallen()) {
            app.robot.fallen = true;
            app.robot.posX = currLoc.posX;
            app.robot.posY = currLoc.posY;
            app.fallPoints.push(currLoc.posX + currLoc.posY + app.robot.orientation)
        }
    },
    hasFallen() {
        return app.robot.posX < 0 || app.robot.posY < 0 || app.robot.posX > app.room.boundX || app.robot.posY > app.room.boundY;
    },
    init(input) {
        let lines = input.split('\n');

        // Create a new room with the coodrinates
        let room = lines[0].split(' ');
        app.room = {
            boundX : room[0],
            boundY : room[1]
        }

        // Now remove the room coordinates from the array
        lines.shift();

        lines.forEach(line => {
            // Between robots there will be an empty line, so do nothing
            if(line.length === 0) {
                return;
            }

            // If this is a new robot, there will be 3 instructions: x, y, orientation
            if(line.split(' ').length === 3) {
                // Reset the robot details
                [ app.robot.posX, app.robot.posY, app.robot.orientation ] = line.split(' ');
                app.robot.fallen = false;
                return;
            }

            // Otherwise this is a set of instructions, so move the robot
            line.split('').forEach(instruction => {
                if(!app.robot.fallen) {
                    if(instruction === 'L' || instruction === 'R') {
                        app.turn(instruction);
                    } else if(instruction === 'F') {
                        app.move(instruction);
                    } else {
                        console.log('Unknown command: ' + instruction);
                    }
                    //console.log(app.robot.posX + ' ' + app.robot.posY + ' ' + app.robot.orientation);
                }
            });
            
            console.log(app.robot.posX + ' ' + app.robot.posY + ' ' + app.robot.orientation + (app.robot.fallen ? ' LOST' : ''));
        });
    }
}

app.init(input);
