import axios from "axios";
import router from '../../routes';

const auth = {
    state: {
      auth: {
        token: '',
        role: '',
        name: '',
        login: false,
      },
    },
    getters: {
      getAuth: (state) => {
        return state.auth;
      },
    },
    actions: {
      login({commit}, data) {
        const emailRegex = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        
        if(data.email === '' || data.email === null){
          return alert('Isi emailnya dulu!')
        }
        if(!emailRegex.test(data.email)){
          return alert('Format email salah!')
        }
        if(data.pswd === '' || data.pswd === null){
          return alert('Isi passwordnya juga!')
        }
        axios.post(process.env.VUE_APP_AUTH, data)
        .then((res) => {
            if(res.data.result[0].msg === 'Email belum terdaftar'){
                alert('Email belum terdaftar');
            }
            if(res.data.result[0].msg === 'Anda gagal Login, password salah'){
                alert('Anda gagal Login, password salah');
            }
            if(res.data.result[0].msg === 'Token Created'){
                commit('setAuth', res.data);
                router.push('/home');
            }
        })
        .catch((err) => {
            console.log(err);
        });
      },
      logout({commit}){
        commit('delAuth');
      }
    },
    mutations: {
      setAuth(state, data){
        state.auth.token = data.result[0].token;
        state.auth.role = data.result[0].role;
        state.auth.name = data.result[0].name;
        state.auth.login = true;
      },
      delAuth(state){
        state.auth.token = '';
        state.auth.role = '';
        state.auth.name = '';
        state.auth.login = false;
      },
    },
  }
  
  export default auth