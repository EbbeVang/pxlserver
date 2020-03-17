<template>

  <div id="app">
    <div style="width: 100%; height: 100vh;" >
      <div style="width:20%; height: 100vh;background-color: #D3D3D3; float:left;" >
        
        <PixelList msg="Hello World"/>
        
      </div>
      <div style="width:80%; height: 100vh; background-color:#ffffff; float:left;">

        <PixelCanvas msg="fucked up canvas?"/>


      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import PixelList from './components/PixelList.vue';
import PixelCanvas from './components/PixelCanvas.vue';

@Component({
  components: {
    PixelList,
    PixelCanvas,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
#app {
    
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
</style>
