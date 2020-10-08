var WIDTH = 600;
var HEIGHT = 900;
var config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#83baec',
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
var game = new Phaser.Game(config);
var theLetter;
var misile;
var misilesCleared = 0;
var text;
var lives = 3;
var hearts;
var portal;
function preload ()
{
    this.load.image('misile', 'assets/misile.png');
    this.load.image('bg-sky', 'assets/bg-sky.png');
    this.load.image('portal', 'assets/portal.png');
    this.load.image('hart-points', 'assets/hart.png');
    this.load.image('dead-hart', 'assets/dead-hart.png');
    this.load.image('bg-city', 'assets/bg-city.png');
    this.load.bitmapFont('shortStack', 'assets/bitmapFonts/shortStack.png', 'assets/bitmapFonts/shortStack.xml');
}

function create ()
{
    //Scenariography
    this.add.image(0, 0, 'bg-sky').setOrigin(0, 0);
    this.add.image(0, 900-241, 'bg-city').setOrigin(0, 0);
    //Seting text for misile
    text = this.add.text(32, 32);
    text.setFontSize(25)
    //Setting text for amount of misiles cleared
    totalMisiles = this.add.text(32, 32);
    totalMisiles.setFontSize(40);
    totalMisiles.text = '0';
    //Generating randome letter for setting on the next misile text
    theLetter = generateRandomLetter();
    text.text = theLetter;
    //Creating and setting the first missile
    misile = this.physics.add.sprite(WIDTH/2, HEIGHT, "misile");
    misile.setGravityY(100);
    misile.setScale(0.5);
    misile.setGravityY(10);
    portal = this.add.image(-200, -200, 'portal');
    misile.setCollideWorldBounds(true);
    misile.body.world.checkCollision.up = false;
    hearts = this.physics.add.staticGroup({ key: 'hart-points', repeat: 2, setXY: { x: WIDTH - 150, y: 32, stepX: 50 }});
}
function generateRandomLetter()
{
    const alphabet = "abcdefghijklmnopqrstuvwxyz" //defining the characters able to chose randomly
    return alphabet[Math.floor(Math.random() * alphabet.length)] //return a character from "alphabet" on position equal to random between amount of characters on "alphabet"
}
function loseLife()
{
    if(lives > 0)
    {
        hearts.getChildren()[lives-1].destroy();
        //hearts[lives].disableBody(true, true);
        lives--;
    }
    else
    {
        misile.setActive(false).setVisible(false);
        text.setActive(false).setVisible(false);
        game.scene.add('Over', Over, true, { x: 400, y: 300 });
    }
}
function update()
{
    text.x = misile.x + 15; //Updating text position to follow the letter object (plus 5 so is not exactly on top of it)
    text.y = misile.y + 20; //Updating text position to follow the letter object
    if(misile.body.blocked.down) //if the letter objetct touchs the bottom (world boundrie)
    {
        totalMisiles.text = misilesCleared.toString(); //updateing score text
        misile.y = -30; //takes the letter object back to top to set the next letter
        misile.x = Math.floor(Math.random() * WIDTH - 30); //Random x position for the next letter
        loseLife();
    }
    
    window.onkeydown = function(e) //when windows detects event (onkeydown)
    {
        if(e.key == theLetter) //if the "keydown" is equal to "the letter"
        {
            misilesCleared++; //Counting misiles cleared (score)
            totalMisiles.text = misilesCleared.toString(); //updateing score text
            
            theLetter = generateRandomLetter(); //asigning new random letter to "theLettter" for next letter
            text.text = theLetter; //setting the text to text object in "theLetter" as above
            misile.y = -30; //setting object position to the top of the viewport minux 30 so is hide from it and it fills like a new one
            misile.x = Math.floor(Math.random() * WIDTH - 30); //Random x position for the next letter
        }
        else
        {
            loseLife();
        }
    }
}
