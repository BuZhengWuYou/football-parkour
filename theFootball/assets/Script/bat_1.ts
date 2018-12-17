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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Node)
    theBat_1: cc.Node = undefined;

    @property(cc.Node)
    theBat_2: cc.Node = undefined;

    @property(cc.Animation)
    theBat_1Anim: cc.Animation = undefined;

    @property(cc.Animation)
    theBat_2Anim: cc.Animation = undefined;

    private _isPause: boolean = false;

    private _finished_1: cc.ActionInstant = cc.callFunc(function(){
        this.theBat_1.scaleX *= -1
    }, this);
    private _finished_2: cc.ActionInstant = cc.callFunc(function(){
        this.theBat_2.scaleX *= -1
    }, this)

    // LIFE-CYCLE CALLBACKS:
    private _gameCtr: GameCtr = undefined;

    init(aGameCtr: GameCtr)
    {
        this._gameCtr = aGameCtr;
    }

    onLoad () 
    {
        this.theBat_1.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2, 270, 0), this._finished_1, cc.moveBy(2, -270, 0), this._finished_1)));
        this.theBat_2.runAction(cc.repeatForever(cc.sequence(cc.moveBy(2, -270, 0), this._finished_2, cc.moveBy(2, 270, 0), this._finished_2)));
    }

    start () {

    }

    pauseMonster()
    {
        this.theBat_1.pauseAllActions();
        this.theBat_1Anim.pause();
        this.theBat_2.pauseAllActions();
        this.theBat_2Anim.pause();
        this._isPause = true;
    }

    resumeMonster()
    {
        this.theBat_1.resumeAllActions();
        this.theBat_1Anim.resume();
        this.theBat_2.resumeAllActions();
        this.theBat_2Anim.resume();
        this._isPause = false;
    }

    update (dt) 
    {

        if(this._isPause)
            return;
            
        if(this.node.y <= -800)
        {
            this.node.destroy();
        }
        else
        {
            this.node.y -= dt * this._gameCtr.speedY;
        }
    }
}
