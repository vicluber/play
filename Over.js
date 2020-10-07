var textGameOver;
var totalPoints;
class Over extends Phaser.Scene {
    constructor() {
        super("Over");
    }
    preload ()
    {
        textGameOver = this.add.text(20, 200);
        totalPoints = this.add.text(120, 300);
    }
    create ()
    {
        textGameOver.setFontSize(100);
        textGameOver.text = 'GAME OVER'
        totalPoints.setFontSize(20)
        totalPoints.text = 'You have cleared '+misilesCleared+' misiles.';
    }
}