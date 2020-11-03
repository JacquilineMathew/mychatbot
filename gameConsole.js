const GameState = Object.freeze({
    STARTING:   Symbol("starting"),
    ROOM:  Symbol("room"),
    STAY: Symbol("stay"),
    PARENTS: Symbol("parents"),
    SISTER: Symbol("sister"),
    BASEMENT: Symbol("basement")
});

module.exports = class GameConsole{
    constructor(){
        this.stateCur = GameState.STARTING;
    }
    
    makeAMove(sInput)
    {
        while(true)
        {
            let sReply = "";
            switch(this.stateCur){
                case GameState.STARTING:
                    sReply = "You hear an eerie noise and wake up in the middle of night. Will you get out of the bed or STAY in your room? ";
                    this.stateCur = GameState.ROOM;
                    break;
                case GameState.ROOM:
                    if(sInput.toLowerCase().match("stay")){
                        sReply = "After some time, you hear a faint sob. Will you STAY there or CHECK on your dear ones?";
                    }else{
                        sReply ="You hear a heavy thud. Will you CHECK on your parents or go back to your room ?";
                        this.stateCur = GameState.PARENTS;
                    }
                    break;
                case GameState.PARENTS:
                    if(sInput.toLowerCase().match("check")){
                        sReply = "You open your parent's room to see no one there. You hear a faint sob. Would you like to CHECK your sister's room or get back to your room?"
                        this.stateCur = GameState.SISTER;
                    }else{
                        sReply = "You hear a heavy thud. Do you wish to CHECK your sister's room or get back to your room?";
                        this.stateCur = GameState.ROOM;

                    }
                    break;
                case GameState.SISTER:
                    if(sInput.toLowerCase().match("stay")){
                        sReply = "You hear a cry. Do you wish to CHECK your sister's room or get back to your room?";
                        this.stateCur = GameState.ROOM;

                    }else{
                        sReply = "Your sister is also missing and the basement is only left to be checked. Do you want to CHECK the basement or wait for them to come?";
                        this.stateCur = GameState.BASEMENT;
        
                    }
                    break;
                case GameState.BASEMENT:
                    if(sInput.toLowerCase().match("check")){
                        sReply = "Your dear ones have arranged a surprise party!You are happy!... Game Over";
                        this.stateCur = GameState.STARTING;
                    }else{
                        sReply = "You hear your sister calling out your name ... It seems like she is in trouble and you need to help her. Would you like to CHECK the basement?";
                    }
                }
            return([sReply]);
        }
    }
}