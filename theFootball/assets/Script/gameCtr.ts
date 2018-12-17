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
import GameView from './gameView'
import * as Types from './types'
import Level from './level'
import Bat_1 from './bat_1'
import Crocodile from './crocodile'
import Stone from './stone'
import Snake from './snake'
import GameMusic from './gameMusic'

@ccclass
export default class NewClass extends cc.Component {

    @property(GameView)
    gameView: GameView = undefined;

    speedY: number = 150;

    gameState: Types.GameState = Types.GameState.Pause;

    @property(cc.Prefab)
    levePre: cc.Prefab = undefined;

    monster: string[] = ['bat_1', 'crocodile', 'stone', 'snake'];

    //  最新的一个level
    public _lastNode: cc.Node = undefined;

    private _scoreHundred: number = 0;

    private _scoreTen: number = 0;

    private _gameMusic: GameMusic = GameMusic.getSigInstance();

    // LIFE-CYCLE CALLBACKS:
    init()
    {
        this.gameState = Types.GameState.Pause;
        this.gameView.init(this);
        this._gameMusic.init();
        this._gameMusic.playBgm();
        //this.startGame();
    }

    startAgain()
    {
        cc.director.loadScene('game');
    }

    startGame()
    {
        this.createLevel();
        this.gameState = Types.GameState.Start;
        this.gameView.startGame();
        //this.scheduleOnce(this.gameView.offPlayerCtr, 3);
        //this.scheduleOnce(this.resumeGame.bind(this), 10);
        
        this.schedule(this.createMonster, 2 + Math.random() * 2);
        //this.testDestroy();
        //this.scheduleOnce(this.testDestroy, 10);
    }

    pauseGame()
    {
        this.gameState = Types.GameState.Pause;
        this.gameView.pauseGame();
        this.unscheduleAllCallbacks();
    }

    resumeGame()
    {
        this.gameState = Types.GameState.Start;
        this.gameView.resumeGame();
        this.schedule(this.createMonster.bind(this), 2 + Math.random() * 2);
    }

    testDestroy()
    {
        console.log('test函数执行');
        this.unschedule(this.createMonster);
        //this.unscheduleAllCallbacks();
    }


    createLevel()
    {
        let aLevelNode: cc.Node = cc.instantiate(this.levePre);
        this._lastNode = aLevelNode;
        this.gameView.addLevel(aLevelNode);
        let aLevelTs: Level = aLevelNode.getComponent('level');
        

        if((this._scoreHundred + 100) === 3200)
        {
            aLevelTs.init(this, true);
            aLevelTs.finallyNode.active = true;
        }
        else
        {
            aLevelTs.init(this, false);
        }

        aLevelTs.setScore(this._scoreHundred + 100);
        aLevelTs.setNation((this._scoreHundred + 100) / 100);
        this.clearScoreTen();
    }

    levelCollision()
    {
        //console.log('执行了');
        this._gameMusic.playLevel();
        if(this._scoreHundred === 3200)
        {
            this.unschedule(this.createMonster);
            this._gameMusic.playWin();
            this.gameState = Types.GameState.End;
            this.gameView.stopPlayer();
            this.gameView.offPlayerCtr();
            this.gameView.ensurePlayerPos();
            return;
        }

        this.createLevel();
    }

    addScoreHundred()
    {
        this._scoreHundred += 100;
    }

    clearScoreTen()
    {
        this._scoreTen = 0;
    }

    obstaclesCollision()
    {
        this.unschedule(this.createMonster);
        this._gameMusic.playLose();
        this._gameMusic.stopBgm();
        this.gameState = Types.GameState.Pause;
        this.gameView.failedGame();
    }

    createMonster()
    {
        let index: number = Math.floor(Math.random() * this.monster.length);
        cc.loader.loadRes(`./prefab/${this.monster[index]}`, cc.Prefab, function(error, aPrefab: cc.Prefab){
            let aNode: cc.Node = cc.instantiate(aPrefab);

            switch(index)
            {
                case 0:
                {
                    let theBat_1: Bat_1 = aNode.getComponent('bat_1');
                    theBat_1.init(this);
                    aNode.setPosition(0, 800);
                    this.gameView.addMonster(aNode);
                    break;
                }
                case 1:
                {
                    let theCrocodile: Crocodile = aNode.getComponent('crocodile');
                    theCrocodile.init(this);
                    aNode.setPosition(0, 800);
                    this.gameView.addMonster(aNode);
                    break;
                }
                case 2:
                {
                    let theStone: Stone = aNode.getComponent('stone');
                    theStone.init(this);
                    aNode.setPosition(0, 800);
                    this.gameView.addMonster(aNode);
                    break;
                }
                case 3:
                {
                    let theSnake: Snake = aNode.getComponent('snake');
                    theSnake.init(this);
                    aNode.setPosition(0, 800);
                    this.gameView.addMonster(aNode);
                    break;
                }
            }
        }.bind(this))
    }

    onLoad () 
    {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;

        this.init();
        //this.gameView.offlayerCtr();
    }

    start () {

    }

    update (dt) 
    {
        if(this.gameState === Types.GameState.Pause)
            return;

        if(this.gameState === Types.GameState.End)
        {
            this.unschedule(this.createMonster.bind(this));
            this.gameView.obstaclesNode.destroyAllChildren();
            this.gameView.setScore(this._scoreHundred);
            return;
        }

        let distance: number = 100 - Math.floor((this._lastNode.convertToWorldSpaceAR(cc.v2(0, 0)).y 
        - this.gameView.getPlayerNode().convertToWorldSpaceAR(cc.v2(0, -80)).y) / 20);
       
        if(distance < this._scoreTen)
        {
            return;
        }
        else
        {
            this._scoreTen = distance;
            this.gameView.setScore(this._scoreHundred + this._scoreTen);
        }
        
    }
}
