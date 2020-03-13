export class Pixel
{
    constructor(x: number, y: number, name: string, color: string)
    {
        this.x =x;
        this.y =y;
        this.name = name;
        this.color = color;
    }

    public x: number;
    public y: number;
    public name: string;
    public color: string;
}
