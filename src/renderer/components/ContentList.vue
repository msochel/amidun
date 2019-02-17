<template>
  <div role="tablist">
    <b-card
      v-for="(contentModule, _i) in mainContent.modules"
      :key="_i"
      no-body
      class="mb-1"
    >
      <b-card-header header-tag="header" class="p-1" role="tab">
        <b-button block variant="info" @click="courseData.currentModule = _i" :disabled="isLocked(_i)">
          Módulo {{ _i + 1 }}
        </b-button>
      </b-card-header>
      <b-collapse
        :id="'accordion-' + _i"
        :visible="courseData.currentModule === _i"
        role="tabpanel"
      >
        <b-card-body>
          <p class="card-text">{{ contentModule.description }}</p>
          <small> Unidades: </small>
          <b-button-group class="mx-1">
            <b-button
              v-for="(unit, _k) in contentModule.units"
              :key="_k"
              :id="'btn-unit-' + _k"
              :variant="_k === courseData.currentUnit ? 'info' : null"
              @click="setUnit(_k)"
            >
              {{ _k + 1 }}
              <b-tooltip
                v-if="_k !== courseData.currentUnit"
                :target="'btn-unit-' + _k"
                placement="bottom"
              >
                {{
                  mainContent.modules[courseData.currentModule].units[
                    courseData.currentUnit
                  ].description
                }}
              </b-tooltip>
            </b-button>
          </b-button-group>
        </b-card-body>
      </b-collapse>
    </b-card>
  </div>
</template>
<script>
export default {
  name: "ContentList",
  data() {
    return {
      activeTab: 0
    };
  },
  methods: {
    isLocked(moduleIndex, unitIndex) {
      if (moduleIndex === undefined && unitIndex === undefined) {
        return true;
      }
      if (moduleIndex > this.courseData.moduleScope) {
        return true;
      }
      return false;
    },
    setUnit(index) {
      this.courseData.currentUnit = index;
    }
  }
};
</script>

<style scoped></style>
