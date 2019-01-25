<template>
  <div id="app" class="bg-light">
    <div v-if="!courseData">
      <b-jumbotron>
        <template slot="header">
          <img
            style="max-width: 400px;"
            alt="amidun main-image"
            src="./media/img-001.png"
            class="responsive"
          />
          <p>Bienvenido a <span id="logo">amidun</span></p>
        </template>
        <template slot="lead">
          <p>¿Qué desea hacer?</p>
        </template>
        <b-button-group>
          <b-button variant="primary" @click="initCourse()">
            Comenzar curso
          </b-button>
          <b-button variant="success" @click="loadCourse">
            Cargar curso
          </b-button>
        </b-button-group>
        <hr class="my-4" />
      </b-jumbotron>
    </div>
    <div v-else>
      <Header></Header>
      <Content></Content>
    </div>
  </div>
</template>

<script>
import Content from "./components/Content.vue";
import Header from "./components/Header.vue";

export default {
  name: "app",
  metaInfo: {
    meta: [
      /* {
        'http-equiv': "Content-Security-Policy",
        content: `
          default-src 'self' data:
          'unsafe-eval';
          style-src 'self' 'unsafe-inline';
          media-src *;
          script-src 'sha256-a/cpcFpfKx0vODbmd+nOXXPpEYFcN75q0gF4+l8YxP0='
        `
      } */
    ]
  },
  components: {
    Header,
    Content
  },
  methods: {
    initCourse(data) {
      this.courseData = data
        ? data
        : {
            totalModules: 2,
            totalUnits: 4,
            currentModule: 0,
            currentUnit: 0,
            unitProgress: 0,
            moduleScope: 0,
            unitScope: 0
          };
    },
    loadCourse() {
      // Add open file dialog here.
    }
  }
};
</script>

<style>
body {
  color: #414550;
  background-color: rgb(204, 204, 204);
}
#logo {
  font-family: "Open Sans", sans-serif;
  color: #555;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: -3px;
  line-height: 1;
  text-shadow: rgb(43, 43, 43) 3px 2px 0;
  position: relative;
}
#logo:after {
  content: "dreamdealer";
  position: absolute;
  left: 8px;
  top: 32px;
}
#logo:after {
  /*background: url(https://subtlepatterns.com/patterns/crossed_stripes.png) repeat;*/
  background-image: -webkit-linear-gradient(
    left top,
    transparent 0%,
    transparent 25%,
    #555 25%,
    #555 50%,
    transparent 50%,
    transparent 75%,
    #555 75%
  );
  background-size: 4px 4px;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: -5;
  display: block;
  text-shadow: none;
}
</style>
