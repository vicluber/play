var WIDTH = 600;
var HEIGHT = 600;
var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#333',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                scale: 100,
                debug: true
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var theLetter;
var sun;
var game = new Phaser.Game(config);
var misilesCleared = 0;
var text;
function preload ()
{
    this.load.image('misile', 'assets/misile.png');
    this.load.image('bg-sky', 'assets/bg-sky.png');
    this.load.image('bg-city', 'assets/bg-city.png');
    this.load.bitmapFont('shortStack', 'assets/bitmapFonts/shortStack.png', 'assets/bitmapFonts/shortStack.xml');
}

function create ()
{
    this.add.image(0, 0, 'bg-sky').setOrigin(0, 0);
    this.add.image(0, 600-241, 'bg-city').setOrigin(0, 0);
    text = this.add.bitmapText(200, 100, 'shortStack','',24);
    totalMisiles = this.add.text(32, 32);
    totalMisiles.text = '0';
    
    theLetter = generateRandomLetter();
    text.text = theLetter;
    sun = this.physics.add.sprite(WIDTH/2, HEIGHT, "misile");
    sun.setGravityY(100);
    sun.setScale(0.5);
    sun.setGravityY(10);
    sun.setCollideWorldBounds(true);
    sun.body.world.checkCollision.up = false;
    console.log(text);
    console.log(totalMisiles);
}
function generateRandomLetter()
{
    const alphabet = "abcdefghijklmnopqrstuvwxyz" //defining the characters able to chose randomly
    return alphabet[Math.floor(Math.random() * alphabet.length)] //return a character from "alphabet" on position equal to random between amount of characters on "alphabet"
  }
function update()
{
    text.x = sun.x + 15; //Updating text position to follow the letter object (plus 5 so is not exactly on top of it)
    text.y = sun.y + 20; //Updating text position to follow the letter object
    if(sun.body.blocked.down) //if the letter objetct touchs the bottom (world boundrie)
    {
        misilesCleared = 0; //you lose score goes to cero
        totalMisiles.text = misilesCleared.toString(); //updateing score text
        sun.y = -30; //takes the letter object back to top to set the next letter
        sun.x = Math.floor(Math.random() * WIDTH - 30); //Random x position for the next letter
    }
    
    window.onkeydown = function(e) //when windows detects event (onkeydown)
    {
        if(e.key == theLetter) //if the "keydown" is equal to "the letter"
        {
            misilesCleared++; //Counting misiles cleared (score)
            totalMisiles.text = misilesCleared.toString(); //updateing score text
            theLetter = generateRandomLetter(); //asigning new random letter to "theLettter" for next letter
            text.text = theLetter; //setting the text to text object in "theLetter" as above
            sun.y = -30; //setting object position to the top of the viewport minux 30 so is hide from it and it fills like a new one
            sun.x = Math.floor(Math.random() * WIDTH - 30); //Random x position for the next letter
        }
    }
}