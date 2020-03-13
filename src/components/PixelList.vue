<template>
  <div class="PixelList">
    <h1>{{ msg }}</h1>
    list of Pixels
    <ul id="example-1">
      <li v-for="pixel in pixels" :key="pixel.name">
        {{ pixel }}
    </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Pixel} from '../models/pixel';
var dgram = require('dgram');


@Component
export default class PixelList extends Vue {
  @Prop() private msg!: string;

  public pixels: Pixel[] = [];
  public socket: any;

  constructor()
  {
    super();
    this.pixels.push(new Pixel(2,3,"ebbe","#ff0000","1234"));
    this.pixels.push(new Pixel(2,3,"bob","#0000ff","1234"));
    this.pixels.push(new Pixel(2,3,"john","#00ff00","1234"));
    this.pixels.push(new Pixel(2,3,"torben","#ffff00","1234"));

    this.socket = dgram.createSocket('udp4');
    this.socket.on('message', function(msg:any, rinfo:any) {
      console.log('I got this message: ' + msg.toString());
      //this.pixels.push(new Pixel(3,4,msg.toString(), "#ff0000","1234"))
    });
    this.socket.bind(7000);

    /*window.setInterval(function(p: Pixel[]) {
      /// call your function here
      p.push(new Pixel(2,3,"torben","#ffff00"));
      console.log('hi');
    }, 500, this.pixels); 
    */
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
