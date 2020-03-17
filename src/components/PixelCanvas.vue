<template>
  <div class="PixelCanvas">
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from "@/store";
import { mapActions } from 'vuex';
import {State, Pixel} from '../models/pixel'; 

@Component
export default class PixelCanvas extends Vue {
    @Prop() private msg!: string;
    public number = 0;
    private canvas: HTMLCanvasElement;
    private canvasContext: CanvasRenderingContext2D; 

    constructor() {
        super();
        
        
    }

    public mounted() {
      this.canvas = <HTMLCanvasElement> document.getElementById("canvas");
      this.canvasContext = <CanvasRenderingContext2D> this.canvas.getContext("2d");
      
      this.startLoop();
      
    }

    public startLoop(): void
    {
      window.setInterval(() => {
        /// call your function here
        this.canvasContext.clearRect(0,0,this.canvas.width, this.canvas.height);
        for (let i = 0; i < this.pixels.length; i++) {
          const pixel = this.pixels[i];
            if (pixel.state == State.MovingUp) pixel.y -= pixel.speed/10;
            if (pixel.state == State.MovingDown) pixel.y += pixel.speed/10;
            if (pixel.state == State.MovingLeft) pixel.x -= pixel.speed/10;
            if (pixel.state == State.MovingRight) pixel.x += pixel.speed/10;
            
            if (pixel.x < 1 || pixel.x > 18 || pixel.y < 1 || pixel.y > 18 ){
              pixel.state = State.Stuck;
              pixel.x = Math.min(Math.max(0, pixel.x), 19)
              pixel.y = Math.min(Math.max(0, pixel.y), 19)
            } 
            this.$store.dispatch("changePixel", pixel);


            this.canvasContext.fillStyle = pixel.color;
            this.canvasContext.fillRect(pixel.x*(this.canvas.width/20), pixel.y*(this.canvas.height/20), this.canvas.width/20, this.canvas.height/20)
        }
      }, 200);    
    }

    get title(): string
    {
      let t = this.$store.state.name;
      return t;
    }    

    get pixels(): Pixel[]
    {
    let pixels = this.$store.state.pixels;
    return pixels;
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
    border:1px solid #ffffff;
    width: 94%; 
    height: 94vh;
    padding: 3%;
}
</style>
