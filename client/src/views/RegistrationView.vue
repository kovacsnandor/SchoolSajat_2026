<template>
  <div>
    <UserRegistration
      @createUser="createUserHandler"
    />
  </div>
</template>

<script>
import UserRegistration from '@/components/User/UserRegistration.vue';   
import { mapActions, mapState } from "pinia";
import { useUserStore } from "@/stores/userStore"; 

export default {
    name: 'RegistrationView',
    components:{
        UserRegistration
    },
    methods:{
      ...mapActions(useUserStore, ["create"]),
      createUserHandler(data){
        this.create(data);
      }
    }
}
</script>

<style>

</style>