<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light fixed row">
        <div class="col-6">
            <a class="navbar-brand" href="#">
                <img src="@/assets/images/logo.png" alt="Kitten" width="50">
                Poylilicss
            </a>
        </div>
        <div class="col-6 justify-content-right" style="text-align: -webkit-right;">
            <button type="button" class="btn btn-primary" @click="goToLogin()">Login</button>
        </div>
    </nav>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
    methods:{
        goToLogin(){
            console.log("hello")
            this.$router.push('/login')
        },
    }
}
</script>

<style>
.fixed{
  overflow: hidden;
  /* background-color: #333; */
  position: fixed; /* Set the navbar to fixed position */
  top: 0; /* Position the navbar at the top of the page */
  width: 100%; /* Full width */
  z-index: 1000;
}
</style>