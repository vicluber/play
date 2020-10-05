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
var i = 0;
var theWord;
var theWordArray = [];
var sun;
//var pressedKeys = {};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sun', 'sun.png');
    this.load.image('alien', 'space-baddie.png');
    this.load.bitmapFont('desyrel', 'assets/bitmapFonts/desyrel.png', 'assets/bitmapFonts/desyrel.xml');
}
var text;
function create ()
{
    theWord = 'Bf3DGqmvgzu4hdq9DmCAi3fgE4HqtXDexIpUUdUIohu8ZEM4zGjLN1odORRoXT6CU7HyCu3hqMxZ5lPV7D8tLBfZaeKQWD5UcwmME0qqbFWY9DSZeA1UGYfqoNf8NLo6PZSXGL3C2HZ4cFSfLmuCOhNP33YaPhESQWtLFDDTrNshohqhFpFNT90g15eNhjBr5cdC393HJjzrhX0wlS68n56K3MzxfErMY8KQhfUTuGN0cBP4JgWF4i7RCX1gJwOKgRYHPPpZnJSjCGn0u7o0vrTJWBUrKFtm0UlgfhP9eZoloXJJYgVQs9TO7Ui5LzmKwwiArgyt7zx6kwQdFTOcJgoGYe1ohGQjNZVawYOqUDROpFrg0tdtktB3FeiE5RKaw2F7aIfGH3Tezm9aitSEogFrjAS6yAYNNDBzaWmwJQHvsLfdMA7xbAL5csWXGw9vlB3u80FRlIjJ3d7KQG8WW311ASnOS8SCO3VbxVyhppDUGiEnnYw';
    theWordArray = theWord.split('');
    text = this.add.bitmapText(200, 100, 'desyrel','',24);
    
    sun=this.physics.add.sprite(this.sys.game.config.width/2,0,"sun");
    sun.setGravityY(100);
    sun.setScale(0.1);
    sun.setGravityY(10);
    sun.setCollideWorldBounds(true);
    
    sun.body.world.checkCollision.up = false;
    console.log(sun);
    //let letra=this.physics.add.bitmapText(this.sys.game.config.width/2,0,"desyrel");
    
}
function checkWordArray(key, i)
{
    if(key == theWordArray[i])
    {
        console.log(key);
        return true;
    }
}
function update()
{
    //window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
    text.x = sun.x + 5;
    text.y = sun.y;
    text.text = theWordArray[i];
    if(sun.body.blocked.down)
    {
        sun.y = -30;
        sun.x = Math.floor(Math.random() * WIDTH);
    }
    
    window.onkeydown = function(e)
    {
        if(this.checkWordArray(e.key, i))
        {
            sun.y = -30;
            sun.x = Math.floor(Math.random() * WIDTH);
            i++;
        }
    }
}