<template>
  <div>
    <p v-for="(p, _i) in unitData.unit_evaluation.body"
        :key="'pe' + _i"
        align="justify">
      {{ p }}
    </p>
    <b-form-checkbox-group
      stacked
      v-for="(value, index) in unitData.unit_evaluation.questions.options"
      :key="index"
    >
    <b-form-checkbox @change="addAnswers(value)">{{ value.text }}</b-form-checkbox>
    </b-form-checkbox-group>
    <b-col align="right">
      <b-button variant="success">
        <i class="fa fa-check-circle" aria-hidden="true"></i>
        Hecho
      </b-button>
    </b-col>
  </div>
</template>

<script>
export default {
  name: "Evaluation",
  data: function() {
    return {
      answers: {},
      temporally: []
    }
  },
  created: function() {
    this.answers = this.unitData.unit_evaluation.questions.options.map(option => {
      return {
        value: option.text,
        right: option.right
      };
    });
  },
  methods: {
    addAnswers(value) {
      this.temporally.push(value.text)
    }
  }
};
</script>

<style scoped>
.ui-scrollpanel{
  height: 100%;
  width: calc(100% + 18px);
  padding: 0;
  position: relative;
  overflow: auto;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
</style>