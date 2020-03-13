<template>
  <div class="PixelCanvas">
      <canvas id="myCanvas" ></canvas>

    <h1>{{ msg }}{{name}}{{number}}</h1>
    
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class PixelCanvas extends Vue {
    @Prop() private msg!: string;
    public name: string;
    public number = 0;

    constructor() {
        super();
        this.name = "ebbe vang";
        window.setInterval(function(){
        /// call your function here
        console.log('hi');
        }, 500);       
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
canvas{
    border:1px solid #000000;
    width: 400px;
    height: 400px;
}
</style>
