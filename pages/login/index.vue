<template>
    <div>
      <div class="row">
        <div class="col-12 mt-5 mb-4"></div>
      </div>
      <div class="row justify-content-center">
        <div class="card col-6 pt-2 pb-2">       
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
          </div>
          <!-- <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div> -->
          
          <div class="row justify-content-center">
            <button type="submit" class="col-12 btn btn-primary" @click="onSubmitLogin">Submit</button>
              <p class="col-auto mt-2">-or-</p>
            <button type="submit" class="col-12 btn btn-light" @click="onClickRegister">Register</button>
          </div>  
        </div>
      </div>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
export default {
  data() {
    return{
      email:'',
      password:''
    }
  },
  methods:{
    onClickRegister(){
      this.$router.push("/register")
    },
    onSubmitLogin(){
      console.log(this.email+" : "+this.password)
    }
  }
}
</script>