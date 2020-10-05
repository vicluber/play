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

function preload ()
{
    this.load.image('sun', 'sun.png');
    this.load.bitmapFont('desyrel', 'assets/bitmapFonts/desyrel.png', 'assets/bitmapFonts/desyrel.xml');
}
var text;
function create ()
{
    text = this.add.bitmapText(200, 100, 'desyrel','',24);
    theLetter = generateRandomLetter();
    text.text = theLetter;
    sun = this.physics.add.sprite(this.sys.game.config.width/2,0,"sun");
    sun.setGravityY(100);
    sun.setScale(0.1);
    sun.setGravityY(10);
    sun.setCollideWorldBounds(true);
    sun.body.world.checkCollision.up = false;
}
function generateRandomLetter()
{
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    return alphabet[Math.floor(Math.random() * alphabet.length)]
  }
function update()
{
    text.x = sun.x + 5;
    text.y = sun.y;
    if(sun.body.blocked.down)
    {
        sun.y = -30;
        sun.x = Math.floor(Math.random() * WIDTH);
    }
    
    window.onkeydown = function(e)
    {
        if(e.key == theLetter)
        {
            theLetter = generateRandomLetter();
            text.text = theLetter;
            sun.y = -30;
            sun.x = Math.floor(Math.random() * WIDTH);
        }
    }
}