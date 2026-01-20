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
import { useUserLoginLogoutStore } from "@/stores/userLoginLogoutStore";

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
    ...mapActions(useUserLoginLogoutStore, ["getMeRefresh"]),
    async saveFieldHandler(data){
      const dataUser = {
        [data.field]: data.value
      }
      console.log('adat mentés', dataUser);
      await this.updateMe(dataUser);
      await this.getMeRefresh();
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