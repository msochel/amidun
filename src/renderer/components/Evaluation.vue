<template>
  <div>
    <p align="center" v-b-scrollspy="20">
      <img src="../media/article.png" alt="notice" />
    </p>
    <p align="justify">{{ unitData.unit_evaluation.body.join(" ") }}</p>
    <b-form-checkbox-group
      stacked
      v-for="(value, index) in unitData.unit_evaluation.questions.options"
      :key="index"
    >
      <b-form-checkbox>{{ value.text }}</b-form-checkbox>
      {{ value.right }}
    </b-form-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "Evaluation"
};
</script>
