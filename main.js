var config = {
    type: Phaser.AUTO,
    width: 1200,
    height: 800,
    backgroundColor: '#000000',
    parent: 'phaser-example',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                scale: 100
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};
var theWord;
var pressedKeys = {};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sun', 'sun.png');
    this.load.image('alien', 'space-baddie.png');
}

function create ()
{
    theWord = 'victor';
    let theWordArray = theWord.split('');
    console.log(theWordArray[0].charCodeAt());
}
function update()
{
    //window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
    window.onkeydown = function(e)
    {
        pressedKeys[e.keyCode] = true;
    }
    //console.log(pressedKeys);
}