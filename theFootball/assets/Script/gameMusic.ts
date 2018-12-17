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

export default class GameMusic{
    private static theInstance: GameMusic = undefined;
    
    private constructor() {};

    static getSigInstance(): GameMusic
    {
        if(this.theInstance === undefined)
        {
            this.theInstance = new GameMusic();
            return this.theInstance;
        }
        else
        {
            return this.theInstance;
        }
    }

    init()
    {
        cc.audioEngine.setMusicVolume(0.5);
        cc.audioEngine.setEffectsVolume(1);
    }

    playBgm()
    {
        cc.loader.loadRes('./sound/music/game', function(error, music)
        {
            cc.audioEngine.playMusic(music, false);
        }.bind(this));
    }

    stopBgm()
    {
        cc.audioEngine.stopMusic();
    }

    playLevel()
    {
        cc.loader.loadRes('./sound/effect/line', function(error, effect)
        {
            cc.audioEngine.playEffect(effect, false);
        }.bind(this));
    }

    playLose()
    {
        cc.loader.loadRes('./sound/effect/lose', function(error, effect)
        {
            cc.audioEngine.playEffect(effect, false);
        }.bind(this));
    }

    playWin()
    {
        cc.loader.loadRes('./sound/effect/win', function(error, effect)
        {
            cc.audioEngine.playEffect(effect, true);
        }.bind(this));
    }
}
