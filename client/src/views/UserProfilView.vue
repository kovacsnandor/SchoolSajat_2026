<template>
  <div>
    <UserProfil 
    :user="item"
    />
  </div>
</template>

<script>
import UserProfil from "@/components/User/UserProfil.vue";
import { mapActions, mapState } from "pinia";
import { useUserMeStore } from "@/stores/userMeStore";

export default {
  name: "UserProfilView",
  components: {
    UserProfil,
  },
  methods: {
    ...mapActions(useUserMeStore, ["getMe"]),
  },
  computed:{
    ...mapState(useUserMeStore, ["item"])
  },
  async mounted(){
    await this.getMe();
    console.log("item:",this.item);
    
  }
};
</script>

<style>
</style>