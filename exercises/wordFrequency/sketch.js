function setup() {
    createCanvas(windowWidth, windowHeight);
    background('pink');
    loadStrings('sotu-t-1.txt', callback);
}

function callback(sotu) {
    console.log(sotu);
}

function draw() {

}

function mouseReleased() {

}