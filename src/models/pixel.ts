export enum State {
    MovingUp = "MovingUp",
    MovingDown = "MovingDown",
    MovingLeft = "MovingLeft",
    MovingRight = "MovingRight",
    Stuck = "Stuck",
    Stationary = "Stationary",  
}

export class Pixel
{
    constructor(x: number, y: number, name: string, color: string, ip: string)
    {
        this.x =x;
        this.y =y;
        this.name = name;
        this.color = color;
        this.ip = ip;
        this.state = State.Stationary;
        this.speed = 1;
        this.lastCommand = Date.now();  
    }

    public x: number;
    public y: number;
    public name: string;
    public color: string;
    public ip: string;
    public state: State;
    public speed: number;
    public lastCommand: number;  

    public getState(): string
    {
        let message: string = "PixelState;";
        message += "name:"+this.name+";";
        message += "x:"+this.x+";";
        message += "y:"+this.y+";";
        message += "color:"+this.color+";";
        message += "speed:"+this.speed+";"; 
        message += "state:"+this.state.toString()+";";
        message += "age:"+(Date.now()-this.lastCommand);
        return message;
    }

    public toString = ():string => {
        return this.name + " (" + this.ip + ")";
    }
}
