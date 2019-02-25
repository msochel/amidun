<template>
  <div>
    <p v-for="(p, _i) in unitData.unit_evaluation.body"
        :key="'pe' + _i"
        align="justify">
      {{ p }}
    </p>
    <div v-if="unitData.unit_evaluation.img !== null" style="text-align:center;">
      <img
        style="max-width: 800px;"
        alt="amidun main-image"
        :src="getActivity(unitData.unit_evaluation.img)"
        class="responsive"
      />
    </div>
    <div v-else-if="unitData.unit_evaluation.pdf !== null" style="text-align:center;">
      <b-carousel
        id="carousel-no-anim"
        style="text-shadow: 0px 0px 1px #000"
        no-animation
        indicators
        img-width="1024px"
        img-height="480"
        controls
        :interval="4000"
      >
        <b-carousel-slide v-for="(img, pos) in unitData.unit_evaluation.pdf" :key="pos" :caption="(pos+1).toString()" img-blank-color="#e80b0b" :img-src="getActivity(img)" />
      </b-carousel>
    </div>
    <hr>
    <div v-for="(question, i) in unitData.unit_evaluation.questions.options" :key="i">
      <span><b>{{question.question}}</b></span>
      <b-form-checkbox-group
        stacked
        v-for="(value, index) in question.answers"
        :key="index"
      >
      <b-form-checkbox @change="addAnswers(value)">{{ value.text }}</b-form-checkbox>
      </b-form-checkbox-group>
      <hr>
    </div>
    <b-col align="right">
      <b-button variant="success" @click="addModuleScope" :disabled="this.courseData.moduleScope !== this.courseData.currentModule">
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
      answers: [],
      temporally: [],
    }
  },
  mounted: function() {
    this.answers = [];
    this.unitData.unit_evaluation.questions.options.forEach(questions => {
      questions.answers.forEach(element => {
        if (element.right) {
          this.answers.push(element.text);
        }
      });
    });
    //console.log(this.answers = this.unitData.unit_evaluation.questions.options.map(option => option.answers))
    // this.answers = this.unitData.unit_evaluation.questions.options.map(option => option.answers).filter(option => option.right).map(option => option.text)
  },
  beforeUpdate: function() {
    this.temporally = [];
    this.answers = [];
    this.unitData.unit_evaluation.questions.options.forEach(questions => {
      questions.answers.forEach(element => {
        if (element.right) {
          this.answers.push(element.text);
        }
      });
    });
  },
  methods: {
    getActivity(name){
      return require("../media/".concat(name, ".png"));
    },
    addAnswers(value) {
      if (!this.temporally.includes(value.text)) {
        this.temporally.push(value.text)
      } else {
        this.temporally.splice(this.temporally.indexOf(value.text), 1)
      }
    },
    addModuleScope() {
      if (this.temporally.filter(r => !this.answers.includes(r)).length === 0 && this.temporally.length === this.answers.length) {
        this.score += 1;
        console.log("Felicidades") 
      } else {
        console.log("Error")
      }
      // return
      if (this.courseData.moduleScope === this.courseData.currentModule) {
        this.courseData.moduleScope += 1;
        if (this.courseData.currentModule !== this.courseData.totalModules - 1) {
          this.courseData.currentModule += 1;
        }
      }
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