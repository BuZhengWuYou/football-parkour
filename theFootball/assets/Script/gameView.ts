// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import GameCtr from'./gameCtr'
import * as Types from './types'
import Level from './level'
import Bat_1 from './bat_1'
import Crocodile from './crocodile'
import Stone from './stone'
import Snake from './snake'

@ccclass
export default class NewClass extends cc.Component {

    private _gameCtr: GameCtr = undefined;

    @property(cc.Node)
    grassNode: cc.Node = undefined;

    @property(cc.Node)
    obstaclesNode: cc.Node = undefined;

    @property(cc.Node)
    levelNode: cc.Node = undefined;

    @property(cc.Node)
    ballNode: cc.Node = undefined;

    @property(cc.Node)
    playerNode: cc.Node = undefined;

    @property(cc.Animation)
    ballAnim: cc.Animation = undefined;

    @property(cc.Animation)
    boyAnim: cc.Animation = undefined;

    @property(cc.Label)
    scoreLabel: cc.Label = undefined;

    @property(cc.Node)
    scoreNode: cc.Node = undefined;

    @property(cc.Node)
    beginNode: cc.Node = undefined;

    @property(cc.Node)
    failedNode: cc.Node = undefined;

    private ballAct: cc.ActionInterval = cc.repeatForever(cc.sequence(cc.moveBy(0.5, 0, 100), cc.moveBy(0.5, 0, -100)));

    // LIFE-CYCLE CALLBACKS:
    init(aGameCtr: GameCtr)
    {
        this._gameCtr = aGameCtr;
    }

    onLoad () 
    {

        this.playerNode.on('touchstart', function(event){
            this.node.on('touchmove', this.playerCtr, this);
        }, this);

        this.playerNode.on('touchend', function(event){
            this.node.off('touchmove', this.playerCtr, this);
        }, this);

        this.failedNode.on('touchstart', function(event){
            this._gameCtr.startAgain();
        }, this);

    }

    start () {

    }

    offPlayerCtr()
    {
        this.playerNode.off('touchstart');
        this.node.off('touchmove');
    }

    ensurePlayerPos()
    {
        let aPos: cc.Vec2 = this.playerNode.position;
        this.playerNode.parent = this._gameCtr._lastNode;
        this.playerNode.setPosition(aPos.x, 75);
    }

    playerCtr(event: cc.Event.EventTouch)
    {
        let touchPoint = this.node.convertToNodeSpaceAR(event.getLocation());
        if(touchPoint.x <= -300)
        {
            this.playerNode.x = -300;
        }
        else if(touchPoint.x >= 300)
        {
            this.playerNode.x = 300;
        }
        else
        {
            this.playerNode.x = touchPoint.x;
        }

        this.playerNode.y = touchPoint.y;
    }

    startGame()
    {
        this.beginNode.active = false;
        this.scoreNode.active = true;
        this.ballAnim.play('roll');
        this.boyAnim.play('run');
        this.ballNode.runAction(this.ballAct);
    }

    stopPlayer()
    {
        this.ballAnim.stop();
        this.boyAnim.stop();
        this.ballNode.stopAllActions();
    }

    pauseGame()
    {
        console.log('执行pauseGame---gameView');
        this.ballAnim.pause();
        this.boyAnim.pause();
        this.ballNode.pauseAllActions();

        //  暂停monster
        let aNodes: cc.Node[] = this.obstaclesNode.children;
        for(let aNode of aNodes)
        {
            if(aNode.getComponent('bat_1') !== null)
            {
                let aBat_1: Bat_1 = aNode.getComponent('bat_1');
                aBat_1.pauseMonster();
            }
            else if(aNode.getComponent('crocodile') !== null)
            {
                let aCrocodile: Crocodile = aNode.getComponent('crocodile');
                aCrocodile.pauseMonster();
            }
            else if(aNode.getComponent('stone') !== null)
            {
                let aStone: Stone = aNode.getComponent('stone');
                aStone.pauseMonster();
            }
            else if(aNode.getComponent('snake') !== null)
            {
                let aSnake: Snake = aNode.getComponent('snake');
                aSnake.pauseMonster();
            }
        }

        //  暂停level
        aNodes = this.levelNode.children;
        for(let aNode of aNodes)
        {
            if(aNode.getComponent('level') !== null)
            {
                let aLevel: Level = aNode.getComponent('level');
                aLevel.pauseLevel();
            }
        }
    }

    resumeGame()
    {
        this.ballAnim.resume();
        this.boyAnim.resume();
        this.ballNode.resumeAllActions();

        //  启动monster
        let aNodes: cc.Node[] = this.obstaclesNode.children;
        for(let aNode of aNodes)
        {
            if(aNode.getComponent('bat_1') !== null)
            {
                let aBat_1: Bat_1 = aNode.getComponent('bat_1');
                aBat_1.resumeMonster();
            }
            else if(aNode.getComponent('crocodile') !== null)
            {
                let aCrocodile: Crocodile = aNode.getComponent('crocodile');
                aCrocodile.resumeMonster();
            }
            else if(aNode.getComponent('stone') !== null)
            {
                let aStone: Bat_1 = aNode.getComponent('stone');
                aStone.resumeMonster();
            }
            else if(aNode.getComponent('snake') !== null)
            {
                let aSnake: Snake = aNode.getComponent('snake');
                aSnake.resumeMonster();
            }
        }

        //  启动level
        aNodes = this.levelNode.children;
        for(let aNode of aNodes)
        {
            if(aNode.getComponent('level') !== null)
            {
                let aLevel: Level = aNode.getComponent('level');
                aLevel.resumeLevel();
            }
        }
    }

    failedGame()
    {
        this.pauseGame();
        this.boyAnim.play('fall');
        this.ballAnim.stop();
        this.ballNode.stopAllActions();
        this.ballNode.setPosition(100, 100);
        this.failedNode.active = true;
    }

    addLevel(aLevelNode: cc.Node)
    {
        this.levelNode.addChild(aLevelNode);
        let thePositon:  cc.Vec2 = this.playerNode.convertToWorldSpaceAR(cc.v2(0, 0));
        thePositon.y += 2000;
        aLevelNode.setPosition(0, this.levelNode.convertToNodeSpaceAR(thePositon).y);
    }

    addMonster(aNode: cc.Node)
    {
        this.obstaclesNode.addChild(aNode);
    }

    setScore(aNum: number)
    {
        this.scoreLabel.string = `${aNum}M`;
    }

    getPlayerNode(): cc.Node
    {
        return this.playerNode;
    }

    update (dt) 
    {
        if(this._gameCtr.gameState === Types.GameState.Pause)
            return;
        
        if(this.grassNode.y <= -640)
        {
            this.grassNode.y = 640;
            return;
        }

        this.grassNode.y -= dt * this._gameCtr.speedY;
    }
}
