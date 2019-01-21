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
            Actividad {{ _i + 1 }}
          </b-button>
        </b-card-header>
        <b-collapse
          :id="'accordion-' + _i"
          :visible="activeActivity === _i"
          role="tabpanel"
        >
          <b-card-body>
            <div width="100%" height="315">
              <object
                :data="'../data/activities/'.concat(activity, '.pdf')"
                type="application/pdf"
                width="100%"
                height="315"
              >
                <p>
                  It appears you don't have a PDF plugin for this browser. No
                  biggie... you can
                  <a :href="'../data/activities/'.concat(activity, '.pdf')">
                    click here to download the PDF file.</a
                  >
                </p>
              </object>
            </div>
          </b-card-body>
        </b-collapse>
      </b-card>
    </div>
  </div>
</template>
<script>
export default {
  name: "ThematicContent",
  data() {
    return {
      activeSection: 0,
      activeActivity: -1
    };
  },
  computed: {
    sectionData() {
      return this.unitData.pedagogical_approach[this.activeSection];
    }
  }
};
</script>

<style scoped></style>
