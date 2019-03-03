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
                <template v-else><input :type="'correct' in unitData.unit_evaluation ? 'number': 'text'" :name="parseInt((i+1)) + _i"></template>
              </td>
          </tr>
        </tbody>
      </table>
    </form>
    <hr>
    <template v-if="'questions' in unitData.unit_evaluation">
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
    </template>
    <b-col align="right">
      <b-button variant="success" @click="addModuleScope" v-b-modal="'myModal'" :disabled="this.courseData.moduleScope !== this.courseData.currentModule">
        <i class="fa fa-check-circle" aria-hidden="true"></i>
        Hecho
      </b-button>
    </b-col>
  <b-modal hide-footer ref="myModalRef" centered title="Las respuestas correctas son:" :no-close-on-backdrop=true :hide-header-close=true :no-close-on-esc=true>
    <template v-if="!('thead' in unitData.unit_evaluation) && !success">
      <div v-for="(question, i) in unitData.unit_evaluation.questions.options" :key="i">
        <span><b>{{question.question}}</b></span>
        <div
          v-for="(value, index) in question.answers"
          :key="index"
        >
          <li v-if="value.right">{{value.text}}</li>
        </div>
        <!-- {{nextModule()}} -->
      </div>
    </template>
    <template v-else-if="'thead' in unitData.unit_evaluation && !success">
      <p>Respuestas equivocadas.</p>
      <!-- {{nextModule()}} -->
    </template>
    <template v-else-if="success">
      <p>¡Felicidades!</p>
      <!-- {{nextModule()}} -->
    </template>
    <b-button class="mt-3" variant="outline-info" block @click="hideModal">Cerrar</b-button>
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
    //console.log(this.answers = this.unitData.unit_evaluation.questions.options.map(option => option.answers))
    // this.answers = this.unitData.unit_evaluation.questions.options.map(option => option.answers).filter(option => option.right).map(option => option.text)
  },
  beforeUpdate: function() {
    // this.success = false;
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
    showModal() {
      this.$refs.myModalRef.show()
    },
    hideModal() {
      if (this.courseData.moduleScope === this.courseData.currentModule) {
        this.courseData.moduleScope += 1;
        if (this.courseData.currentModule !== this.courseData.totalModules - 1) {
          console.log("hola");
          
          this.courseData.currentModule += 1;
        }
      }
      this.$refs.myModalRef.hide()
    },
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
      this.success = false;
      var form = document.querySelector("#question-table");
      var isNumber = 'correct' in this.unitData.unit_evaluation;
      var answers = Object.values(form).reduce((obj,field) => { obj[field.name] = isNumber ? parseInt(field.value):field.value ; return obj }, {});
      if (isNumber) {
        console.log("ORDEEEEEEEEEEEEEEN");
        var isCorrect = JSON.stringify(this.unitData.unit_evaluation.correct)===JSON.stringify(Object.values(answers));
      }
      if (isCorrect) {
        this.score += 1;
      } else {
        if ('thead' in this.unitData.unit_evaluation) {
          if (!Object.values(answers).includes("")) {
            this.score += 1
            console.log("Felicidades", "tabla")
          } else {
            console.log("Error", "Tabla")
          }
        }
      }
      if (!('thead' in this.unitData.unit_evaluation)) {
        if (this.temporally.filter(r => !this.answers.includes(r)).length === 0 && this.temporally.length === this.answers.length) {
          this.score += 1;
          this.success = true;
          console.log("Felicidades");
        } else {
          this.success = false;
          console.log("Error");
        }
      }
      this.showModal();
      return
      if (this.courseData.moduleScope === this.courseData.currentModule) {
        this.courseData.moduleScope += 1;
        if (this.courseData.currentModule !== this.courseData.totalModules - 1) {
          this.courseData.currentModule += 1;
        }
      }
      return
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