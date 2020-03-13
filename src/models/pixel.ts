export class Pixel
{
    constructor(x: number, y: number, name: string, color: string, ip: string)
    {
        this.x =x;
        this.y =y;
        this.name = name;
        this.color = color;
        this.ip = ip
    }

    public x: number;
    public y: number;
    public name: string;
    public color: string;
    public ip: string;

    public toString = () : string => {
        return this.name + " " + this.ip;
    }
}
