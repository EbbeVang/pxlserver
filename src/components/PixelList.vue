<template>
  <div class="PixelList">
    <h1>{{ msg }}</h1>
    list of Pixels
    <ul id="example-1">
      <li v-for="pixel in pixels" :key="pixel.ip">
        {{ pixel }}
    </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pixel} from '../models/pixel';
const dgram = require('dgram');

@Component
export default class PixelList extends Vue {
  @Prop() private msg!: string;

  public pixels: Pixel[] = [];
  public socket: any;
  public stateSender: any;

  public portState = 7007;
  public portCommand = 7000;
  constructor()
  {
    super();
    
    this.stateSender = dgram.createSocket("udp4");
    this.socket = dgram.createSocket('udp4');
    
    //this.pixels.push(new Pixel(2,3,"ebbe","#ff0000","1234"));
    //this.pixels.push(new Pixel(2,3,"bob","#0000ff","1234"));
    //this.pixels.push(new Pixel(2,3,"john","#00ff00","1234"));
    //this.pixels.push(new Pixel(2,3,"torben","#ffff00","1234"));

    this.socket.on('message', (msg:any, rinfo:any) => {
      console.log('I got this message: ' + msg.toString());
      this.handleMessage(msg.toString());
    });
    this.socket.bind(7000);

    window.setInterval( () => {
      /// call your function here
      this.sendPixelState();
    }, 1000, ); 
    
  }
  private handleMessage(message:string)
  {
    //if this and that... respond to commands
    this.pixels.push(new Pixel(3,4,msg.toString(), "#ff0000", rinfo.address));
  } 

  private sendPixelState()
  {
    for (let pixel of this.pixels) {
      console.log(pixel.getState());
      this.stateSender.send(pixel.getState(), 0, pixel.getState().length, this.portState, pixel.ip );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
