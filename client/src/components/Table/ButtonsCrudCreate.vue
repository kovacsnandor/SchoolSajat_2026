<template>
  <div>
    <button type="button" class="btn btn-success btn-sm"
        @click="onClickButton()"
    >
        <i class="bi bi-plus-lg"></i>
    </button>
  </div>
</template>

<script>
export default {
    name: 'ButtonsCrudCreate',
    methods: {
        onClickButton(){
            this.$emit('create');
        }
    }

}
</script>

<style>

</style>