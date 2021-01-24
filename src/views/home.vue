<template>
  <div v-if="getAuth.role == 'admin' || getAuth.role == 'user'" class="row">
    <div class="col-sm-12 col-xl-9">
      <header class="row sticky-top bg-white py-4 shadow">
        <div class="col-3 col-md-1">
          <Navbar />
        </div>
        <div class="col-9 col-md-7 d-flex justify-content-between">
          <h5 class="mt-2"> Hi, {{ getAuth.name }}</h5>
          <h2 class="font-weight-bold">Food Items</h2>
          <h1></h1>
        </div>
        <div class="col-12 col-md-4 d-flex justify-content-end">
          <form action="#" class="form-inline my-2 my-lg-0">
            <input
              v-model="srcName.nama"
              class="form-control mr-sm-2"
              type="search"
              @keyup="searchName()"
              @keyup.delete="searchName()"
            />
          </form>
          <button class="btn" @click="searchName()">
            <img src="../assets/search.png" alt="" />
          </button>
          <button class="btn" @click="filterOn()">
            <img src="../assets/filter.png" alt="" />
          </button>
        </div>
        <div v-if="filter" class="col-12 text-center border-top pt-3 mt-3">
          <Sorted @sorted="sortedData" />
        </div>
      </header>
      <main class="row pt-4 bg-light">
        <article
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="items in datas"
          :key="items.id"
        >
          <Card :images="items.url_img" :name="items.nama" :price="items.harga" :product="items"/>
        </article>
      </main>
    </div>
    <aside class="col-xl-3 bg-white border-left">
      <div
        class="row sticky-top bg-white py-4 d-flex justify-content-center border-bottom"
      >
        <h2 class="text-center font-weight-bold">
          Cart
          <span class="p-cart-0 bg-info text-white rounded-circle">
            {{ quantity }}
          </span>
        </h2>
      </div>
      <div class="row pt-2" v-if="allCart.length > 0">
        <div
          v-for="(item, index) in allCart"
          :key="item.id"
          class="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-12"
        >
          <Cart
            :id="index"
            :image="item.product.url_img"
            :name="item.product.nama"
            :price="item.product.harga"
            :qty="item.qty"
            :cart="item.product"
          />
        </div>

        <div class="col-12 pt-4">
          <div class="d-flex justify-content-between">
            <h3>Total:</h3>
            <h3>Rp.{{ calculate }}</h3>
          </div>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="col btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModalLong"
          >
            Checkout
          </button>

          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModalLong"
            tabindex="-1"
            role="dialog"
            aria-labelledby="exampleModalLongTitle"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h3 class="modal-title" id="exampleModalLongTitle">
                    Checkout
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
                <div class="modal-body">
                  <div
                    class="d-flex justify-content-between"
                    v-for="item of allCart"
                    :key="item.product.id"
                  >
                    <p class="font-weight-bold">{{ item.product.nama }}</p>
                    <p class="font-weight-bold">Rp.{{ item.product.harga }}</p>
                  </div>
                  <p class="font-weight-bold text-right">
                    Total : Rp.{{ calculate }}
                  </p>
                  <p class="font-weight-bold text-left">
                    Cashier : {{ cashier }}
                  </p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="col btn btn-secondary" data-dismiss="modal" @click="addCheckout(allCart, calculate, cashier, getAuth.name) & cartNull()">
                    Print
                  </button>
                  <button type="button" class="col btn btn-primary" data-dismiss="modal" @click="addCheckout(allCart, calculate, cashier, getAuth.name) & cartNull()">
                    Send Email
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            type="button"
            class="col btn btn-danger mt-2"
            @click="cartNull()"
          >
            Cencel
          </button>
        </div>
      </div>
      <div class="row" v-else>
        <div class="col container text-center">
          <img src="../assets/food-and-restaurant.png" alt="" />
          <h3>Your cart is empty</h3>
          <p class="text-muted" style="font-size: 0.9rem;">
            Please add some items from the menu
          </p>
        </div>
      </div>
    </aside>
  </div>
</template>

<script>
import Navbar from "../components/navbar.vue";
import Card from "../components/card.vue";
import Cart from "../components/cart.vue";
import Sorted from "../components/filter.vue";
import axios from "axios";
import router from '../routes';
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
  name: "home",
  components: {
    Navbar,
    Card,
    Cart,
    Sorted,
  },
  data() {
    return {
      datas: null,
      checkout:{
        nama:null,
        kasir:null,
        total:null,
        user:null,
      },
      cashier: "inyiL",
      sorted:{
        nama:'',
        kategori:'',
        terbaru:'',
        harga:'',
      },
      srcName:{
        nama:''
      },
      filter: false,
    };
  },
  methods: {
    ...mapActions(['cartNull']),
    ...mapMutations(['delAuth']),
    sortedProduct(){
      axios
      .get(process.env.VUE_APP_SEARCH + `/?nama=${this.sorted.nama}&kategori=${this.sorted.kategori}&terbaru=${this.sorted.terbaru}&harga=${this.sorted.harga}`,{
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then((res) => {
        if(res.data.result.name === 'TokenExpiredError'){
          this.delAuth();
          alert('Token Expired! Silahkan Login Lagi');
          router.push({ path: '/login' });
        }else
        if(res.data.result[0].msg === 'Login dulu!'){
          alert('Login Dulu!');
          router.push({ path: '/login' });
        }else{
          this.datas = null;
          this.datas = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    searchName(){
      axios
      .get(process.env.VUE_APP_SEARCH + `/${this.srcName.nama}`, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then((res) => {
        this.datas = null;
        this.datas = res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addCheckout(valueNama, valueTotal, valueKasir, valueUser){
      this.checkout.nama = `{`
      for(let i = 0; i < valueNama.length; i++) {
        if(valueNama.length == 1){
          this.checkout.nama += `${valueNama[i].product.nama}`
        }else{
          if(i == 0){
            this.checkout.nama += `${valueNama[i].product.nama}`
          }else{
            this.checkout.nama += `,${valueNama[i].product.nama}`
          }
        }
      }
      this.checkout.nama += `}`
      this.checkout.total = valueTotal;
      this.checkout.kasir = valueKasir;
      this.checkout.user = valueUser;
      
      axios.post(process.env.VUE_APP_HISTORY, this.checkout, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then(() => {
        this.chart = [];
        alert('Success Checkout!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Add Product!')
      });
    },
    filterOn() {
      this.filter = !this.filter;
      this.sorted.nama = '';
      this.sorted.kategori = '';
      this.sorted.terbaru = '';
      this.sorted.harga = '';
      this.sortedProduct();
    },
    sortedData(data){
      this.sorted.nama = data.nama;
      this.sorted.kategori = data.kategori;
      this.sorted.terbaru = data.terbaru;
      this.sorted.harga = data.harga;
      this.sortedProduct();
    }
  },
  computed: {
    ...mapGetters(['allCart', 'calculate', 'quantity', 'getAuth']),
  },
  mounted() {
    this.sortedProduct()
    this.searchName()
  },
};
</script>

<style scoped>
.p-cart-0 {
  padding: 0 0.7rem 0.2rem 0.7rem;
}

.dropdown-menu {
  border: 0;
  padding: 0;
}
</style>
