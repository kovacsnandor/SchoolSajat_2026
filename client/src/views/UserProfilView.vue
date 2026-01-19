<template>
  <div>
    <UserProfil 
    :user="item"
    :loadingStates="loadings"
    @saveField="saveFieldHandler"
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
  data(){
    return {
      loadings: { name: false, email: false }
    }
  },
  methods: {
    ...mapActions(useUserMeStore, ["getMe", "updateMe"]),
    saveFieldHandler(data){
      const dataUser = {
        [data.field]: data.value
      }
      console.log('adat mentés', dataUser);
      this.updateMe(dataUser);
      
    }
  },
  computed:{
    ...mapState(useUserMeStore, ["item"])
  },
  async mounted(){
    await this.getMe();
    console.log("UserProfilView.vue item:",this.item);
    
  }
};
</script>

<style>
</style>