var dictionary = [];
var textX = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('pink');
    loadStrings('sotu-t-1.txt', callback);
}

function display() {
    background('lightgray');
    push();
    translate(textX, height/2);
    for (var i=0; i<dictionary.length; i++) {
        textSize(dictionary[i].count);
        var txtWidth = textWidth(dictionary[i].word);
        text(dictionary[i].word, 0, 0);
        translate(txtWidth, 0);
    }
    pop();
    console.log('Horizontal Speed', mouseX-pmouseX);
}  

function mouseDragged() {
    display();
    textX += mouseX-pmouseX;
}

function callback(sotu) {
    // console.log(sotu);
    
    sotu.forEach(function(phrases) {
        // console.log(phrases);
        
        var words = phrases.split(' ');
        words.forEach(function(word){
            // console.log(word);
            // if statement to check if word exists in dictionary
            var filteredWords = dictionary.filter(function(element) {
              return element.word == word;
            });
            // The filter() method creates a new array with all elements that pass the test implemented by the provided function.
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
            if (filteredWords.length)
              filteredWords[0].count++;
            else
              dictionary.push({word: word, count: 1});

        });
    });
    
    console.log(dictionary);
    dictionary.sort(function(a, b) {
        return  b.count - a.count;
    })
    
    display();

}
