import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: {
            light: {
                primary: 'FF5722'
            },
            dark: {
                primary: 'FF5722'
            }
        }
    }
    
}

export default new Vuetify(opts);
