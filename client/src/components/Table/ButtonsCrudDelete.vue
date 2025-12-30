<template>
  <div>
    <button type="button" class="btn btn-outline-danger btn-sm"
        @click="onClickButton()"
    >
        <i class="bi bi-trash3"></i>
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
            this.$emit('delete', this.id);
        }
    }

}
</script>

<style>

</style>