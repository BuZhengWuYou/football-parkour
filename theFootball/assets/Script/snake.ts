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

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Animation)
    snake_1: cc.Animation = undefined;

    @property(cc.Animation)
    snake_2: cc.Animation = undefined;

    @property(cc.Animation)
    snake_3: cc.Animation = undefined;

    @property(cc.Animation)
    snake_4: cc.Animation = undefined;

    private _isPause: boolean = false;

    private _gameCtr: GameCtr = undefined;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    init(aGameCtr: GameCtr)
    {
        this._gameCtr = aGameCtr;
    }

    pauseMonster()
    {
        this.snake_1.pause();
        this.snake_2.pause();
        this.snake_3.pause();
        this.snake_4.pause();
        this._isPause = true;
    }

    resumeMonster()
    {
        this.snake_1.resume();
        this.snake_2.resume();
        this.snake_3.resume();
        this.snake_4.resume();
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
