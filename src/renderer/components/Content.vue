<template>
  <b-row>
    <b-col md="4"> <ContentList></ContentList> </b-col>
    <b-col md="8">
      <h2>
        <i>Unidad: {{ courseData.currentUnit + 1 }}</i
        >: {{ unitData.description }}
      </h2>
      <b-card no-body>
        <b-tabs pills card>
          <b-tab :active="activeTab === 0" @click="activeTab = 0">
            <template slot="title">
              <i class="fa fa-search" aria-hidden="true"></i> Temas clave
            </template>
            <b-list-group>
              <b-list-group-item
                v-for="(keyTopic, _i) in unitData.key_topics"
                :key="_i"
              >
                {{ keyTopic }}
              </b-list-group-item>
            </b-list-group>
          </b-tab>
          <b-tab :active="activeTab === 1" @click="activeTab = 1">
            <template slot="title">
              <i class="fa fa-bullseye" aria-hidden="true"></i> Objetivos
            </template>
            <b-list-group>
              <b-list-group-item
                v-for="(learningObjective, _i) in unitData.learning_objectives"
                :key="_i"
              >
                <i class="fa fa-check"> {{ learningObjective }} </i>
              </b-list-group-item>
            </b-list-group>
          </b-tab>
          <b-tab :active="activeTab === 2" @click="activeTab = 2">
            <template slot="title">
              <i class="fa fa-list-ul" aria-hidden="true"></i> Contenido
              temático
            </template>
            <ThematicContent></ThematicContent>
          </b-tab>
          <b-tab :active="activeTab === 3" @click="activeTab = 3">
            <template slot="title">
              <i class="fa fa-question" aria-hidden="true"></i> Evaluación
            </template>
            <Evaluation></Evaluation>
          </b-tab>
        </b-tabs>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import ContentList from "./ContentList.vue";
import ThematicContent from "./ThematicContent.vue";
import Evaluation from "./Evaluation.vue";

export default {
  name: "Content",
  data() {
    return {
      activeTab: 0
    };
  },
  components: {
    ContentList,
    ThematicContent,
    Evaluation
  }
};
</script>
