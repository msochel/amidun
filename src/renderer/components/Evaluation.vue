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
    <form id="question-table">
      <table id="table-answers">
        <thead>
          <tr>
            <th v-for="(name, i) in unitData.unit_evaluation.thead" :key="i">{{ name }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(p, i) in unitData.unit_evaluation.tds" :key="i">
              <td v-for="(element, _i) in p" :key="_i">
                <template v-if="unitData.unit_evaluation.table_img && element !== null">
                  <img
                    style="max-width: 800px;"
                    alt="amidun main-image"
                    :src="getActivity(element)"
                    class="responsive"
                  />
                </template>
                <template v-else-if="element !== null">{{ element }}</template>
                <template v-else><input :type="'correct' in unitData.unit_evaluation ? 'number': 'text'" :name="parseInt((i+1)) + _i" value=""></template>
              </td>
          </tr>
        </tbody>
      </table>
    </form>
    <hr>
    <div v-for="(question, i) in unitData.unit_evaluation.questions.options" :key="i">
      <span><b>{{question.question}}</b></span>
      <b-form-checkbox-group
        stacked
        v-for="(value, index) in question.answers"
        v-model="temporally"
        :key="index"
      >
      <b-form-checkbox :value="value.text">{{ value.text }}</b-form-checkbox>
      </b-form-checkbox-group>
      <hr>
    </div>
    <b-col align="right">
      <b-button variant="success" @click="addModuleScope" v-b-modal="'myModal'" :disabled="this.courseData.moduleScope !== this.courseData.currentModule">
        <i class="fa fa-check-circle" aria-hidden="true"></i>
        Hecho
      </b-button>
    </b-col>
    <b-modal hide-footer ref="myModalRef" centered title="Resultados" :no-close-on-backdrop=true :hide-header-close=true :no-close-on-esc=true>
      <template v-if="courseData.moduleScope === 10">
        <h5>Su puntaje final es: </h5>
        <span class="score">
          <h6>{{getScoreFinal()}}</h6>
        </span>
      </template>
      <template v-else-if="!('thead' in unitData.unit_evaluation) && !success">
        <p>Las respuestas correctas son: </p>
        <div v-for="(question, i) in unitData.unit_evaluation.questions.options" :key="i">
          <span><b>{{question.question}}</b></span>
          <div
            v-for="(value, index) in question.answers"
            :key="index"
          >
            <li v-if="value.right">{{value.text}}</li>
          </div>
        </div>
      </template>
      <template v-else-if="'thead' in unitData.unit_evaluation && !success">
        <template v-if="'correct' in unitData.unit_evaluation">
          <p>El orden correcto es: </p>
          <li v-for="(value, i) in unitData.unit_evaluation.order" :key="i">
            {{value}}
          </li>
        </template>
        <template v-else>
          <p>Respuestas equivocadas.</p>
        </template>
      </template>
      <template v-else-if="success">
        <p>¡Felicidades!</p>
      </template>
      <b-button class="mt-3" variant="outline-info" block @click="hideModal">
        {{courseData.moduleScope === 10 ? "Finalizar" : "Siguiente Módulo"}}
      </b-button>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "Evaluation",
  data: function() {
    return {
      answers: [],
      temporally: [],
      success: false
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
  },
  beforeUpdate: function() {
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
    getScoreFinal() {
      return (this.score / 11 * 100).toFixed(2)
    },
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      if (this.courseData.moduleScope === this.courseData.currentModule) {
        this.courseData.moduleScope += 1;
        if (this.courseData.currentModule !== this.courseData.totalModules - 1) {
          this.courseData.currentModule += 1;
          document.querySelector("#question-table").reset();
        }
      }
      this.$refs.myModalRef.hide()
    },
    getActivity(name){
      return require("../media/".concat(name, ".png"));
    },
    addModuleScope() {
      this.success = false;
      var form = document.querySelector("#question-table");
      var isNumber = 'correct' in this.unitData.unit_evaluation;
      var answers = Object.values(form).reduce((obj,field) => { obj[field.name] = isNumber ? parseInt(field.value):field.value ; return obj }, {});
      if (isNumber) {
        var isCorrect = JSON.stringify(this.unitData.unit_evaluation.correct)===JSON.stringify(Object.values(answers));
      }
      if (isCorrect) {
        this.score += 1;
        this.success = true;
      } else {
        if (!isNumber) {
          if ('thead' in this.unitData.unit_evaluation) {
            if (!Object.values(answers).includes("")) {
              this.score += 1
              this.success = true;
            } else {
              this.success = false;
            }
          }
        }
      }
      if (!('thead' in this.unitData.unit_evaluation)) {
        if (this.temporally.filter(r => !this.answers.includes(r)).length === 0 && this.temporally.length === this.answers.length) {
          this.score += 1;
          this.success = true;
        } else {
          this.success = false;
        }
      }
      this.showModal();
    }
  },
  watch: {
    unitData() {
      if (this.temporally.length) {
        this.temporally = [];
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

.score{
  margin: auto;
  display: table;
}

#table-answers {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

#table-answers td, #table-answers th {
  border: 1px solid #ddd;
  padding: 3px;
}

#table-answers tr:nth-child(even){background-color: #f2f2f2;}

#table-answers tr:hover {background-color: #ddd;}

#table-answers th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #17a2b8;
  color: white;
}
</style>