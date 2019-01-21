import Vue from "vue";
import Vuex from "vuex";
import BootstrapVue from "bootstrap-vue";
import App from "./App.vue";
import VueI18n from "vue-i18n";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "font-awesome/css/font-awesome.css";
import json from "./data/modules";

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(BootstrapVue);

const store = new Vuex.Store({
  state: {
    courseData: null
  },
  mutations: {}
});
Vue.mixin({
  store: store,
  data: function() {
    return {
      get mainContent() {
        return json;
      }
    };
  },
  computed: {
    courseData: {
      get() {
        return this.$store.state.courseData;
      },
      set(newValue) {
        this.$store.state.courseData = newValue;
      }
    },
    unitData() {
      return this.mainContent.modules[this.courseData.currentModule].units[
        this.courseData.currentUnit
      ];
    }
  }
});

new Vue({
  el: "#app",
  components: {
    App
  },
  render: h => h(App)
});
/* eslint-disable no-new */
/* new Vue({
  components: { App },
  store,
  template: '<App/>'
}).$mount('#app') */
