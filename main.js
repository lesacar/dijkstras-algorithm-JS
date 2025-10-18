// dijkstra's shortest path

// grid dimensions
let [x,y] = [16,16];

const directions = [
    [1, 0, 1],   // right
    [-1, 0, 1],  // left
    [0, 1, 1],   // down
    [0, -1, 1],  // up
    [1, 1, Math.sqrt(2)],   // SE
    [1, -1, Math.sqrt(2)],  // NE
    [-1, 1, Math.sqrt(2)],  // SW
    [-1, -1, Math.sqrt(2)]  // NW
];

function log2darray(arr2d) {
    for (let i = 0; i < arr2d.length; i++) {
        let row = [];
        for (let j = 0; j < arr2d[i].length; j++) {
            if (arr2d[i][j] === 999) {
                row.push("inf"); // or "999" if you prefer
            } else {
                row.push(arr2d[i][j].toFixed(1));
            }
        }
        console.log(row.join(", "));
    }
}

// row X can't be zero initialized, it needs to hold row Y and only row Y needs to be zero-initialized
let arr = Array(x);
for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(y).fill(999);
}

// use another separate 2d array to track visited vertices, since dijkstra's can't backtrack
let visited = Array(x);
for (let i = 0; i < x; i++) {
    visited[i] = new Array(y).fill(false);
}

let [sourceX,sourceY] = [Math.floor(Math.random()*x),Math.floor(Math.random()*y)];
// REMOVE BELOW LINE
sourceX = 2; sourceY = 2;
// to not have to replace all instances of sourceX, just don't touch this
const realSourceX = 2; const realSourceY = 2;

arr[sourceX][sourceY] = 0;
let [destX,destY] = [Math.floor(Math.random()*x),Math.floor(Math.random()*y)];
if ((sourceX === destX) && (sourceY === destY)) {
    console.log("Source and destination were the exact same, I guess you don't need to pathfind to it..., rerun for algo");
}

log2darray(arr);

// check nearest vertex, let's always go fixed rotation, right, down, left, up, then NE, SE, SW, NW
// diagonals take 1.41 distance


// first node
// source X + 1, source Y

function isVecInBounds(fX,fY) {
    if (fX >= x || fX < 0 || fY >= y || fY < 0) {
        return false;
    } else { return true; }
}


/*
if (isVecInBounds(sourceX+1,sourceY)) {
    // never visited
    if (arr[sourceX+1][sourceY] === 999) {
        // set point to distance
        arr[sourceX+1][sourceY] = getDistFromSource(sourceX+1,sourceY);
    }
}
*/

function areWeDone(visitedArr) {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            // check if this exact field has been visited, if not, we are not done
            if (visitedArr[i][j] === false) {
                return false;
            }
        }
    }
    // this is only reached if absolutely every cell was visited, then we are done
    return true;
}

let iteration_count = 0;

// remove me
debugger;

while (!areWeDone(visited)) {
    iteration_count = iteration_count + 1;
    // find smallest value cell that hasn't been visited
    let min_value_during_visited_scan = 999;
    let minX = -1;
    let minY = -1;
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            // check if this exact field has been visited, if not, we are not done
            if (visited[i][j] === false) {
                if (arr[i][j] < min_value_during_visited_scan) {
                    min_value_during_visited_scan = arr[i][j];
                    minX = i;
                    minY = j;
                }
            }
        }
    }
    if (minX === -1 || minY === -1) {
        console.error("Something went horribly wrong in the main loop, no minimum unvisited value was found but the destination wasn't evaluated");
    }
    if (minX === 16 || minY === 16) {
        console.error("minimum value was somehow out of bounds! iteration count was: " + iteration_count);
    }
    // then choose that cell and get it's neighbours, the first iteration starts at source since it's distance is 0
    debugger;
    visited[minX][minY] = true;
    for (const direction in directions) {
        if (directions.hasOwnProperty(direction)) {
            const dir = directions[direction];
            let xdir = minX+dir[0];
            let ydir = minY+dir[1];
            // oob check
            if (!isVecInBounds(xdir,ydir)) {
                continue;
            }
            let direction_weight = dir[2];
            if (direction_weight + arr[minX][minY] < arr[xdir][ydir]) {
                arr[xdir][ydir] = direction_weight + arr[minX][minY];
            }
        }
    }
    let destVal = arr[destX][destY];


    // remove me

    /*
    let sleep = new Promise(resolve => setTimeout(resolve, 350));
    await sleep;
    */
    process.stdout.write("\n\n\n");
    log2darray(arr);

    if (destVal != 999) {
        console.log("");
        console.log("source: (" + realSourceX.toFixed(1) + "," + realSourceY.toFixed(1) + ") <-> destination: (" + destX.toFixed(1) + "," + destY.toFixed(1) + ")");
        console.log("the distance from source to destination is: " + destVal);
        break;
    }
}


// console.log('');
// log2darray(arr);
