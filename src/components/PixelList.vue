<template>
  <div class="PixelList">
    
    <h1>{{ title }}</h1>
    <ul id="example-1">
      <li v-for="pixel in pixels" :key='pixel.index'>
          {{ pixel }}
          
      </li>
    </ul>
    <hr />
    <center>
      Total number of pixels:
      <br />
      {{ numberOfPixels }}
    </center> 
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State, Pixel} from '../models/pixel';
import store from "@/store";
const dgram = require('dgram');

@Component
export default class PixelList extends Vue {
  
  @Prop() private msg!: string;

  //private ppixels: Pixel[] = [];
  public socket: any;
  public stateSender: any;

  public portState = 7007;
  public portCommand = 7000;
  public ipaddress = "nada";
  
  private millisToRemovePixel = 10000;

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
      this.handleMessage(msg, rinfo);
    });
    this.socket.bind(7000);
    this.socket.on('listening', () => {
      let a = this.socket.address();
      this.ipaddress = a.address;
      console.log(this.ipaddress);
      console.log(a.address);
      this.portCommand++;
      console.log(this.portCommand);
    });

    window.setInterval( () => {
      for (let i = 0; i < this.pixels .length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.lastCommand+this.millisToRemovePixel < Date.now())
        {
          this.$store.dispatch("removePixel", pixel);        
        }
      }
    }, 250);

    window.setInterval( () => {
      /// call your function here
      this.sendPixelState();
    }, 1000, ); 
  
  }
  get port(): number
  {
    return this.portCommand;
  }
  
  get ip(): string
  {
    return this.ipaddress;
  }

  get title(): string
  {
    let t = this.$store.state.name;
    return t;
  }

  get numberOfPixels()
  {
    return this.$store.getters.numberOfPixels;
  }

  get pixels(): Pixel[]
  {
    let pixels = this.$store.state.pixels;
    return pixels;

  }

  private handleMessage(msg: any, rinfo: any)
  {
    //let p:Pixel = new Pixel(3, 4, msg.toString(), "#ff0000", rinfo.address);
    //this.$store.dispatch("addPixel", p);
  
 
 //if this and that... respond to commands
    if (msg.toString().match("^init [0-9]+ [0-9]+"))
    {
      //this.pixels.push(new Pixel(3, 4, msg.toString(), "#ff0000", rinfo.address));
      let cmdArray = msg.toString().split(" ");

      let p:Pixel = new Pixel(cmdArray[1], cmdArray[2], "unnamed", "#ff0000", rinfo.address);
      this.$store.dispatch("removePixel", p);
      this.$store.dispatch("addPixel", p);
      this.sendReply("OK", rinfo.address);

      console.log("INIT " + rinfo.address);
    }
    
    else if (msg.toString().match("^color [0-9]+ [0-9]+ [0-9]+"))
    {
      let cmdArray = msg.toString().split(" ");
      if (this.isValidColorcode(cmdArray[1]) && this.isValidColorcode(cmdArray[2]) && this.isValidColorcode(cmdArray[3]) )
      {
        console.log("Set color to " + cmdArray[1] + " " + cmdArray[2] + " " + cmdArray[3]);
        for (let i = 0; i < this.pixels.length; i++) {
          const pixel: Pixel = this.pixels[i];
          if (pixel.ip.localeCompare(rinfo.address) == 0)
          {
            pixel.color = "#" + this.toHex(cmdArray[1]) + this.toHex(cmdArray[2]) + this.toHex(cmdArray[3]);
            pixel.lastCommand = Date.now();
            this.$store.dispatch("changePixel", pixel);
            this.sendReply("OK", rinfo.address);

          }
        }
      } else this.sendReply("ERROR", rinfo.address);


    }
    
    else if (msg.toString().match("^moveup"))
    {
      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.state = State.MovingUp;
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);

        }
      }
    }

    else if (msg.toString().match("^movedown"))
    {
      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.state = State.MovingDown;
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);
        }
      }
    }

    else if (msg.toString().match("^moveleft"))
    {
      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.state = State.MovingLeft;
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);
        }
      }
    }

    else if (msg.toString().match("^moveright"))
    {
      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.state = State.MovingRight;
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);
        }
      }
    }

    else if (msg.toString().match("^stop"))
    {
      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.state = State.Stationary;
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);

        }
      }
    }

    else if (msg.toString().match("^speed [0-9]+"))
    {
      let cmdArray = msg.toString().split(" ");

      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.speed = cmdArray[1];
          if (pixel.speed > 10) pixel.speed = 10;
          if (pixel.speed < 0) pixel.speed = 0;
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);

        }
      }
    }

    else if (msg.toString().match("^name [a-zA-Z0-9]+"))
    {
      let cmdArray = msg.toString().split(" ");

      for (let i = 0; i < this.pixels.length; i++) {
        const pixel: Pixel = this.pixels[i];
        if (pixel.ip.localeCompare(rinfo.address) == 0)
        {
          pixel.name = cmdArray[1];
          pixel.lastCommand = Date.now();
          this.$store.dispatch("changePixel", pixel);
          this.sendReply("OK", rinfo.address);
        }
      }
    }

    else
      {
        console.log("ERROR " + msg.toString());
         this.sendReply("ERROR", rinfo.address); 
      }
    
  } 

  private toHex(d: any): string {
    return  ("0"+(Number(d).toString(16))).slice(-2).toUpperCase()
  }

  private isValidColorcode(n: number): boolean
  {
    if (n < 0 || n > 255) return false;
    return true;
  }

  private sendPixelState()
  {
    for (let pixel of this.pixels) {
      console.log(pixel.getState());
      this.stateSender.send(pixel.getState(), 0, pixel.getState().length, this.portState, pixel.ip );
    }
  }
  private sendReply(msg: string, ip: string)
  {
    this.socket.send(msg, 0, msg.length, this.portCommand, ip);
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
