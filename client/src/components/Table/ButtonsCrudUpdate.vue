<template>
  <div>
    <button type="button" class="btn btn-outline-info btn-sm"
        @click="onClickButton()"
    >
        <i class="bi bi-pencil"></i>
    </button>
  </div>
</template>

<script>
export default {
    name: 'ButtonsCrudDelete',
    props: {
        id : {type: Number, required: true}
     },
    methods: {
        onClickButton(){
            this.$emit('update', this.id);
        }
    }

}
</script>

<style>

</style>