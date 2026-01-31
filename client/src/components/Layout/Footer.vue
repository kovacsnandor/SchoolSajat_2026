<template>
  <div class="p-4">
    {{ content }}
    <slot></slot>
  </div>
</template>

<script>
export default {
    name:'Footer',
    props: {
        content: {type: String, default: "Lábléc"}
    }

}
</script>

<style>

</style>