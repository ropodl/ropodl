import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

const opts = {
    theme: {
        dark: true,
        themes: {
            light: {
                primary: '#EF5047'
            },
            dark: {
                primary: '#EF5047'
            }
        }
    }
}

export default new Vuetify(opts);