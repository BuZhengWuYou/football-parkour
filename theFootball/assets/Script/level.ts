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

    private _gameCtr: GameCtr = undefined;

    private _isFinally: Boolean = false;

    private _isPause: boolean = false;

    @property(cc.Node)
    finallyNode: cc.Node = undefined;

    @property(cc.Animation)
    circleAnim: cc.Animation = undefined;

    @property(cc.Label)
    score: cc.Label = undefined;

    @property(cc.Sprite)
    nation: cc.Sprite = undefined;


    // LIFE-CYCLE CALLBACKS:
    init(aGameCtr: GameCtr, isFin: Boolean)
    {
        this._gameCtr = aGameCtr;
        this._isFinally = isFin;
    }

    setScore(aNum: number)
    {
        this.score.string = aNum.toString();
    }

    setNation(aNum: number)
    {
        cc.loader.loadRes(`./nation/${aNum}`, cc.SpriteFrame, function(error, spriteFrame: cc.SpriteFrame){
            this.nation.spriteFrame = spriteFrame;
        }.bind(this))
    }

    showFinallyNode()
    {
        this.finallyNode.active = true;
    }

    onCollisionEnter(other, self)
    {
        if(other.tag !== 0)
            return;

        this._gameCtr.addScoreHundred();
        this.circleAnim.node.active = true;
        this.circleAnim.play('congrat_line');
        this._gameCtr.levelCollision();
        this.node.getComponent(cc.BoxCollider).enabled = false;
    }

    pauseLevel()
    {
        this.circleAnim.pause();
        this.circleAnim.node.pauseAllActions();
        this._isPause = true;
    }

    resumeLevel()
    {
        this.circleAnim.resume();
        this.circleAnim.node.resumeAllActions();
        this._isPause = true;
    }

    onLoad () 
    {
        
    }

    start () {

    }

    update (dt) 
    {
        if(this._isPause)
            return;

        if((this._isFinally) && (this.node.y <= -640))
        {
            this.node.y = -640;
            return;
        }

        if(this.node.y <= -800)
        {
            this.node.destroy();
            //  测试用代码
            //this._gameCtr.createLevel();
        }
        else
        {
            this.node.y -= dt * this._gameCtr.speedY;
        }
    }
}
