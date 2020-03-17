import Vue from 'vue';
import Vuex from 'vuex';
import { Pixel } from './models/pixel';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        name: 'Pixels:',
        pixels: Array<Pixel>(),

    },  
    mutations: {
        ADD_PIXEL: (state, pixel: Pixel) => {
            state.pixels.push(pixel);
        },
        REMOVE_PIXEL: (state, pixel: Pixel) =>
        {
            state.pixels = state.pixels.filter(p => p.ip.localeCompare(pixel.ip) != 0);
        },
        CHANGE_PIXEL: (state, pixel:Pixel) =>
        {
            for (let i = 0; i < state.pixels.length; i++) {
                if (pixel.ip.localeCompare(state.pixels[i].ip) == 0)
                {
                   state.pixels[i].color = pixel.color;
                   state.pixels[i].lastCommand = pixel.lastCommand;
                   state.pixels[i].name = pixel.name;
                   state.pixels[i].speed = pixel.speed;
                   state.pixels[i].state = pixel.state;
                   state.pixels[i].x = pixel.x;
                   state.pixels[i].y = pixel.y;
                }
                
            }
        }
    },
    actions: {
        addPixel: (context, pixel: Pixel) =>
        {
            context.commit("ADD_PIXEL", pixel);
        },
        removePixel: (context, pixel: Pixel) =>
        {
            context.commit("REMOVE_PIXEL", pixel);
        },
        changePixel: (context, pixel: Pixel) =>
        {
            context.commit("CHANGE_PIXEL", pixel);
        }
    },
    getters: {
        numberOfPixels: (state) =>
        {
            return state.pixels.length;
        }
    }

});