<template>
  <div class="row">
    <div class="container-fluid bgLogin pt-5">
      <div class="d-flex justify-content-center">
        <div class="card w-50 shadow">
          <div class="card-header d-flex justify-content-center">
            <img src="../assets/coffee house.png" alt="">
          </div>
          <div class="card-body">
            <form>
              <div class="input-group form-group">
                <input type="text" v-model="formLogin.email" class="form-control" placeholder="email">
              </div>
              <div class="input-group form-group">
                <input type="password" v-model="formLogin.pswd" class="form-control" placeholder="password">
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="col btn btn-secondary"
                  data-toggle="modal"
                  data-target="#modalRegister"
                >
                  Register
                </button>

                <!-- Modal Add Product -->
                <div
                  class="modal fade"
                  id="modalRegister"
                  tabindex="-1"
                  role="dialog"
                  aria-labelledby="modalRegisterTitle"
                  aria-hidden="true"
                >
                  <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h3 class="modal-title" id="modalRegisterTitle">
                          Register
                        </h3>
                        <button
                          type="button"
                          class="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <form class="modal-body">
                        <div class="form-group">
                          <div class="row">
                            <label for="name" class="col-3 form-label pt-1">Name</label>
                            <div class="col-9">
                              <input type="text" v-model="formRegister.name" class="form-control" name="name" value="" required>
                            </div>
                          </div>
                          <div class="row pt-3">
                            <label for="email" class="col-3 form-label pt-1">Email</label>
                            <div class="col-9">
                              <input type="text" v-model="formRegister.email" class="form-control" name="email" value="" required>
                            </div>
                          </div>
                          <div class="row pt-3">
                            <label for="pwsd" class="col-3 form-label pt-1">Password</label>
                            <div class="col-9">
                              <input type="password" v-model="formRegister.pswd" class="form-control" name="pwsd" value="" required>
                            </div>
                          </div>
                        </div>
                        <div class="text-right">
                          <button type="button" class="btn btn-secondary" @click="register(formRegister)">Register</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>                
                <button type="button" class="col btn btn-info" @click="cartNull() & login(formLogin)">Login</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
// import router from '../routes';
import {mapActions} from 'vuex';

export default {
  name: "login",
  data(){
    return{
      formLogin:{
        email: null,
        pswd: null,
      },
      formRegister:{
        name: null,
        email: null,
        pswd: null,
        role: 'user',
      },
    }
  },
  methods:{
    ...mapActions(['cartNull', 'login']),
    register(value){
      const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;

      if(value.name === '' || value.name === null){
        return alert('Isi namanya!')
      }
      if(value.email === '' || value.email === null){
        return alert('Isi emailnya!')
      }
      if(!emailRegex.test(value.email)){
        return alert('Format email salah!')
      }
      if(value.pswd === '' || value.pswd === null){
        return alert('Isi passwordnya!')
      }
      axios
      .post(process.env.VUE_APP_USERS, value)
      .then((res) => {
        if(res.data.result[0].msg === 'Nama / Email sudah terdaftar!'){
          alert('Nama / Email sudah terdaftar!');
        }else{
          alert('Success Register!');
          this.formRegister.name = null;
          this.formRegister.email = null;
          this.formRegister.pswd = null;
        }
      })
      .catch((err) => {
        alert('Gagal Register!');
        console.log(err);
      });
    },
  },
};
</script>s