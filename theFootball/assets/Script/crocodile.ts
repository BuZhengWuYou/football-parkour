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


    @property(cc.Animation)
    crocodileAnim: cc.Animation = undefined;

    private _isPause: boolean = false;
    // LIFE-CYCLE CALLBACKS:
    private _gameCtr: GameCtr = undefined;

    init(aGameCtr: GameCtr)
    {
        this._gameCtr = aGameCtr;
    }

    onLoad () 
    {
        
    }

    start () {

    }

    pauseMonster()
    {
        this.crocodileAnim.pause();
        this._isPause = true;
    }

    resumeMonster()
    {
        this.crocodileAnim.resume();
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


