var dictionary = [];
var stopWords = [
  'about', 'after', 'all', 'also', 'am', 'an', 'and', 'another', 'any', 'are', 'as', 'at', 'be',
  'because', 'been', 'before', 'being', 'between', 'both', 'but', 'by', 'came', 'can',
  'come', 'could', 'did', 'do', 'each', 'for', 'from', 'get', 'got', 'has', 'had',
  'he', 'have', 'her', 'here', 'him', 'himself', 'his', 'how', 'if', 'in', 'into',
  'is', 'it', 'like', 'make', 'many', 'me', 'might', 'more', 'most', 'much', 'must',
  'my', 'never', 'now', 'of', 'on', 'only', 'or', 'other', 'our', 'out', 'over',
  'said', 'same', 'see', 'should', 'since', 'some', 'still', 'such', 'take', 'than',
  'that', 'the', 'their', 'them', 'then', 'there', 'these', 'they', 'this', 'those',
  'through', 'to', 'too', 'under', 'up', 'very', 'was', 'way', 'we', 'well', 'were',
  'what', 'where', 'which', 'while', 'who', 'with', 'would', 'you', 'your', 'a', 'i', '', 'eg']
var textX = 10;
var img;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background('#4d4d4d');
    loadStrings('Africa_Renewable_Energy_v8_web.txt', callback);
    textFont('Oswald');
    img = loadImage('assets/image_logo_clean10008_48.jpg');
}

function display() {
    background('#02558b');
    var xpos = textX;
    fill('#f5f5f5');
    image(img, 500, windowHeight-250, 200, 200);
    push();
    translate(textX, height/2);
    for (var i=0; i<dictionary.length; i++) {
        textSize(dictionary[i].count);
        var txtWidth = textWidth(dictionary[i].word)+10;
        text(dictionary[i].word, 0, 0);
        translate(txtWidth, 0);
        xpos += txtWidth;
        //console.log(xpos,txtWidth);
    }
    pop();
    // console.log('Horizontal Speed', mouseX-pmouseX);
    textSize(32)
    text('SUSTAINABLE DEVELOPMENT GOAL 16', 50, 100);
    textSize(16)
    text('Promote peaceful and inclusive societies for sustainable development,', 50, 120);
    text('provide access to justice for all and build effective, accountable and', 50, 140);
    text('inclusive institutions at all levels', 50, 160);
}  

function mouseDragged() {
    display();
    textX += mouseX-pmouseX;
}

function callback(renewEn) {
    // console.log(renewEn);
    var bucket = {}
    renewEn.forEach(function(phrases) {
        //console.log(phrases);
        
        var words = phrases.split(' ');
        words.forEach(function(word){
            // remove punctuation and space
            word = word.replace(/[^\w\s]|_/g, "");
            // if statement to check if word is a stop word
            if (stopWords.includes(word.toLowerCase())) {
            // if statement to check if word includes digit
            } else if (/\d/.test(word)) {
            
            } else {
                if (bucket[word] === undefined) {
                    bucket[word] = 1
                } else {
                    bucket[word] += 1 
                }
            }
        });
    });
    
    // transform bucket object into dictionary array
    for (var word in bucket) {
        dictionary.push({
            word: word,
            count: bucket[word]
        })
        
    }
    // console.log(dictionary.length)

    console.log(dictionary);
    
    dictionary.sort(function(a, b) {
        return  b.count - a.count;
    }); 
    
    display();

}
