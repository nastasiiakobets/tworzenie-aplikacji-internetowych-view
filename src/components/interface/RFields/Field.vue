<template>
  <div class="field">
    <div class="field-general">
      <h2>{{ name }}:</h2>
      <div class="fields">
        <h2 v-if="!editCondition">{{ modelValue }}</h2>
        <input
          v-else
          :style="{ width: inputWidth }"
          type="text"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
        />
        <div
          @click="editCondition = !editCondition"
          :style="{ width: imgWidth }"
          class="edit"
        >
          <img src="../../../assets/imgs/edit.png" alt="" />
        </div>
      </div>
    </div>
    <p class="error">{{ error }}</p>
  </div>
</template>

<style scoped>
.edit img {
  width: 100%;
}

.error {
  color: red;
  font-size: 105%;
  padding-left: 5px;
}

.field,
.field-general {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.fields {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
@media screen and (max-width: 500px) {
  .field-general {
    flex-direction: column;
    text-align: center;
  }
  .fields {
    flex-direction: column;
    align-items: center;
  }
}
</style>

<script>
export default {
  name: "Field",
  data: () => ({ editCondition: false }),
  props: ["modelValue", "name", "imgWidth", "inputWidth", "error"],
  emits: ["update:modelValue"],
};
</script>