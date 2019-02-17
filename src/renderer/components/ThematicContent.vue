<template>
  <div>
    <h2>{{ sectionData.content.title }}</h2>
    <p
      v-for="(paragraph, _i) in sectionData.content.body"
      :key="_i"
      align="justify"
    >
      <template v-if="typeof paragraph === 'string'">
        {{ paragraph }}
      </template>
      <template v-else>
        <ul v-for="(item, _k) in paragraph" :key="_k">
          <li class="justify">{{ item }}</li>
        </ul>
      </template>
    </p>
    <div v-if="sectionData.activities.length" role="tablist">
      <hr />
      <b-card
        v-for="(activity, _i) in sectionData.activities"
        :key="_i"
        no-body
        class="mb-1"
      >
        <b-card-header header-tag="header" class="p-1" role="tab">
          <b-button
            block
            variant="info"
            @click="activeActivity = activeActivity === _i ? -1 : _i"
          >
            Actividad »
          </b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-' + _i"
          :visible="activeActivity === _i"
          role="tabpanel"
        >
          <b-card-body>
            <div width="100%" height="315">
              <img
                style="max-width: 100%;"
                alt="amidun main-image"
                :src="getActivity(activity)"
                class="responsive"
              />
            </div>
          </b-card-body>
          <p>
            It appears you don't have a PDF plugin for this browser. No
            biggie... you can
            <a :href="getActivity(activity)">
              click here to download the PDF file.</a
            >
          </p>
        </b-collapse>
      </b-card>
    </div>
    <b-form-group label="Secciones">
      <b-form-radio-group id="radio-sections"
                          buttons
                          button-variant="outline-primary"
                          size="lg"
                          v-model="activeSection"
                          :options="sectionOptions"/>
    </b-form-group>
  </div>
</template>
<script>
export default {
  name: "ThematicContent",
  data() {
    return {
      activeSection: 0,
      activeActivity: -1,
    };
  },
  beforeUpdate: function() {
    if (this.activeSection > this.unitData.pedagogical_approach.length - 1) {
      this.activeSection = 0;
    }
  },
  methods: {
    getActivity(name){
      return require("../data/activities/".concat(name, ".png"));
    },

    downloadActivity(name){
      const http = require('http');
      const fs = require('fs');

      const file = fs.createWriteStream("file.jpg");
      const request = http.get("http://i3.ytimg.com/vi/J---aiyznGQ/mqdefault.jpg", function(response) {
        console.log(file);
        
        response.pipe(file);
      });
    }
  },
  computed: {
    sectionData() {
      return this.unitData.pedagogical_approach[this.activeSection];
    },
    sectionOptions() {
      return this.unitData.pedagogical_approach.map((section, _i, sections) => {
        return {
          text: _i + 1,
          value: _i
        }
      })
    }
  },
  watch: {
    activeSection() {
      window.scrollTo(0, 0);

    }
  },
};
</script>

<style scoped></style>
