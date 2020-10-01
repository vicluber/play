var config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    backgroundColor: '#333',
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
var i = 0;
var theWord;
var theWordArray = [];
//var pressedKeys = {};

var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sun', 'sun.png');
    this.load.image('alien', 'space-baddie.png');
}

function create ()
{
    theWord = 'Un radiometro es un tubo de vidrio o cuarzo en el que se ha hecho un vacio parcial dentro del tubo se encuentra un eje con cuatro paletas muy ligeras. Una cara de las paletas está ennegrecida, mientras que la otra es de metal pulimentado.';
    theWordArray = theWord.split('');
    console.log(theWord);
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
    window.onkeydown = function(e)
    {
        if(this.checkWordArray(e.key, i))
        {
            i++;
        }
    }
}