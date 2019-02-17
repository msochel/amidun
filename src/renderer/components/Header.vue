<template>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-toggle target="nav_text_collapse"></b-navbar-toggle>
    <b-navbar-brand>
      <img src="../media/img-001-header.png" class="d-inline-block" alt="BV" />
      AMID-UN
    </b-navbar-brand>
    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-text></b-nav-text>
        <b-navbar-brand right>
          <b-button-group >
            <b-button variant="success" @click="saveProgress()">
              <i class="fa fa-floppy-o" aria-hidden="true"></i>
            </b-button>
            <b-button variant="info" @click="loadCourse()">
              <i class="fa fa-folder-open-o" aria-hidden="true"></i>
            </b-button>
          </b-button-group>
        </b-navbar-brand>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
const fs = window.require('fs');
const { dialog } = window.require('electron').remote;
export default {
  name: "Header",
  props: {
    msg: String
  },
  methods: {
    saveProgress() {
      var progress = {
        "unit": this.courseData.currentUnit,
        "module": this.courseData.currentModule
      }
      dialog.showSaveDialog({ filters: [
        { name: 'json', extensions: ['json'] }
        ]}, function (fileName) {
        if (fileName === undefined) return;
        fs.writeFile(fileName, JSON.stringify(progress), function (err) {   
          dialog.showMessageBox({ message: "The file has been saved! :-)",
          buttons: ["OK"] });
        });
      }); 
    },
    loadCourse() {
      dialog.showOpenDialog((filenames) => {
        console.log(filenames)
        if (filenames === undefined) {
          console.log("NO FILES")
          return;
        }
        fs.readFile(filenames[0], "utf-8", (err, data) => {
          if(err) {
            console.log("Cannot read file ", err);
            return;
          }

          data = JSON.parse(data)
          this.courseData = {
            totalModules: 2,
            totalUnits: 4,
            currentModule: 0,
            currentUnit: 0,
            unitProgress: data.unit,
            moduleScope: data.module,
            unitScope: 0
          }
        });
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.navbar {
  position: fixed;
  z-index: 3000;
  width: 100%;
}
</style>
