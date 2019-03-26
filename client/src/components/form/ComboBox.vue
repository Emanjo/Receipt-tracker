<template>
  <v-combobox
          v-model="value"
          :items="items"
          :label="label"
          :placeholder="placeholder"
          :auto-select-first="true"
        ></v-combobox>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    apiUrl: {
    type: String,
    default: null 
    },
    label: {
    type: String,
    default: null 
    },
    placeholder: {
    type: String,
    default: null 
    }
  },
  data() {
    return {
      items: [],
      value: ''

    }
  },
  mounted() {
    axios.get(this.apiUrl)
    .then( response => this.items = response.data.data);
  },
  watch: {
    value() {
      this.$emit('onChange', this.value)
    }
  }
}
</script>

<style scoped>

</style>