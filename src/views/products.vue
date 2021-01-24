<template>
  <div v-if="getAuth.role == 'admin'" class="row">
    <header
      class="col sticky-top bg-white d-flex justify-content-between py-4 shadow"
    >
      <Navbar />
      <h2 class="font-weight-bold">Products</h2>
      <h2></h2>
    </header>
    <main class="col-12 mt-4">
      <div class="row">
        <div class="col-12 col-lg-8">
          <div class="card-body shadow">
            <!-- Button trigger modal Add Product -->
            <button type="button" class="btn btn-primary shadow mb-3" data-toggle="modal" data-target="#modalAddProduct">
              Add Product
            </button>

            <!-- Modal Add Product -->
            <div class="modal fade" id="modalAddProduct" tabindex="-1" role="dialog" aria-labelledby="modalAddProductTitle" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="modalAddProductTitle">
                      Add Product
                    </h3>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <form class="modal-body">
                    <div class="form-group">
                      <div class="row">
                        <label for="nama" class="col-3 form-label pt-1">Name</label>
                        <div class="col-9">
                          <input type="text" v-model="formAddProduct.nama" class="form-control" name="nama" value="">
                        </div>
                      </div>
                      <div class="row pt-3">
                        <label for="price" class="col-3 form-label pt-1">Price</label>
                        <div class="col-9">
                          <input type="number" v-model="formAddProduct.harga" class="form-control" name="price" value="">
                        </div>
                      </div>
                      <div class="row pt-3">
                        <label for="url_img" class="col-3 form-label pt-1">Image</label>
                        <div class="col-9">
                          <input type="file" class="form-control" id="file" ref="fileInput">
                        </div>
                      </div>
                      <div class="row pt-3">
                        <label for="kategori_id" class="col-3 form-label pt-1">Category</label>
                        <div class="col-9">
                          <select class="form-select form-control" aria-label="Default select example" v-model="formAddProduct.kategori_id">
                            <option selected></option>
                            <option v-for="category in categories" :key="category.id" :value=category.id>
                              {{category.tipe}}
                            </option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <button type="button" class="btn btn-primary" @click="addProduct(formAddProduct)">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="table-responsive">
              <table class="table text-center">
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Category ID</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <th scope="row">{{product.id}}</th>
                    <td>{{product.nama}}</td>
                    <td>{{product.harga}}</td>
                    <td>{{product.kategori_id}}</td>
                    <td>
                      <!-- Button trigger modal Edit Product -->
                      <button
                        type="button"
                        class="btn btn-warning"
                        data-toggle="modal"
                        data-target="#modalEditProduct"
                        @click="editProduct(product)"
                      >
                        Edit
                      </button>

                      <!-- Modal Edit Product -->
                      <div
                        class="modal fade"
                        id="modalEditProduct"
                        tabindex="-1"
                        role="dialog"
                        aria-labelledby="modalEditProductTitle"
                        aria-hidden="true"
                      >
                        <div class="modal-dialog modal-dialog-centered" role="document">
                          <div class="modal-content">
                            <div class="modal-header">
                              <h3 class="modal-title" id="modalEditProductTitle">
                                Edit Product
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
                            <form class="modal-body text-left">
                              <div class="form-group">
                                <div class="text-center" >
                                  <img :src="formProduct.url_img" alt="" style="max-width: 100%; height: auto;">
                                </div>
                                <input type="hidden" v-model="formProduct.id" class="form-control" name="kategori_id" value="">
                                <div class="row pt-4">
                                  <label for="nama" class="col-3 form-label pt-1">Name</label>
                                  <div class="col-9">
                                    <input type="text" v-model="formProduct.nama" class="form-control" name="nama" value="">
                                  </div>
                                </div>
                                <div class="row pt-3">
                                  <label for="price" class="col-3 form-label pt-1">Price</label>
                                  <div class="col-9">
                                    <input type="number" v-model="formProduct.harga" class="form-control" name="price" value="">
                                  </div>
                                </div>
                                <div class="row pt-3">
                                  <label for="url_img" class="col-3 form-label pt-1">Image</label>
                                  <div class="col-9">
                                    <input type="file" class="form-control" id="fileUpdate" ref="fileUpdate">
                                  </div>
                                </div>
                                <div class="row pt-3">
                                  <label for="kategori_id" class="col-3 form-label pt-1">Category</label>
                                  <div class="col-9">
                                    <select class="form-select form-control" aria-label="Default select example" v-model="formProduct.kategori_id">
                                      <option selected></option>
                                      <option v-for="category in categories" :key="category.id" :value=category.id>
                                        {{category.tipe}}
                                      </option>
                                    </select>  
                                  </div>
                                </div>
                              </div>
                              <div class="text-right">
                                <button type="button" class="btn btn-warning" @click="updateProduct(formProduct)">Update</button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </div>
                      <button type="button" class="btn btn-danger ml-2" @click="delProduct(product)">
                        Del
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
          </div>
        </div>
        <div class="col-12 col-lg-4">
          <div class="card-body shadow">
            <!-- Button trigger modal Add Category -->
            <button
              type="button"
              class="btn btn-primary shadow mb-3"
              data-toggle="modal"
              data-target="#modalAddCategory"
            >
              Add Category
            </button>

            <!-- Modal Add Category -->
            <div
              class="modal fade"
              id="modalAddCategory"
              tabindex="-1"
              role="dialog"
              aria-labelledby="modalAddCategoryTitle"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h3 class="modal-title" id="modalAddCategoryTitle">
                      Add Category
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
                        <label for="tipe" class="col-4 form-label pt-1">Name Category</label>
                        <div class="col-8">
                          <input type="text" v-model="formAddCategory.tipe" class="form-control" name="tipe">
                        </div>
                      </div>
                    </div>
                    <div class="text-right">
                      <button type="button" class="btn btn-primary" @click="addCategory(formAddCategory)">Add</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <table class="table text-center">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Category</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="category in categories" :key="category.id">
                  <th scope="row">{{category.id}}</th>
                  <td>{{category.tipe}}</td>
                  <td class="d-flex justify-content-center">
                    <!-- Button trigger modal Edit Category -->
                    <button
                      type="button"
                      class="btn btn-warning"
                      data-toggle="modal"
                      data-target="#modalEditCategory"
                      @click="editCategory(category)"
                    >
                      Edit
                    </button>

                    <!-- Modal Edit Category -->
                    <div
                      class="modal fade"
                      id="modalEditCategory"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="modalEditCategoryTitle"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                          <div class="modal-header">
                            <h3 class="modal-title" id="modalEditCategoryTitle">
                              Edit Category
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
                          <form class="modal-body text-left">
                            <div class="form-group">
                              <input type="hidden" v-model="formCategory.id" class="form-control" name="tipe" value="">
                              <div class="row">
                                <label for="tipe" class="col-4 form-label pt-1">Name Category</label>
                                <div class="col-8">
                                  <input type="text" v-model="formCategory.tipe" class="form-control" name="tipe" value="" required>
                                </div>
                              </div>
                            </div>
                            <div class="text-right">
                              <button type="button" class="btn btn-warning" @click="updateCategory(formCategory)">Update</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                    <button type="button" class="btn btn-danger ml-2" @click="delCategory(category)">
                      Del
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import Navbar from "../components/navbar.vue";
import axios from "axios";
import router from '../routes';
import FormData from 'form-data';
import {mapGetters, mapMutations} from 'vuex';

export default {
  name: "products",
  components: {
    Navbar,
  },
  data(){
    return{
      products:[],
      formAddProduct:{
        nama:null,
        harga:null,
        kategori_id:null,
      },
      formProduct:{
        id:null,
        nama:null,
        harga:null,
        kategori_id:null,
      },
      categories: [],
      formAddCategory:{
        tipe:null,
      },
      formCategory:{
        id:null,
        tipe:null,
      },
    }
  },
  methods:{
    ...mapMutations(['delAuth']),
    loadProducts(){
      axios.get(process.env.VUE_APP_PRODUCT, {
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
        }else
        if(res.data.result[0].msg === 'Not Found'){
          // alert('404 | Not Found');
          router.push('home');
        }else{
          this.products = res.data.result;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addProduct(data){
      if(data.nama === '' || data.nama === null){
        return alert('Isi namanya!')
      }
      if(data.harga === '' || data.harga === null){
        return alert('Isi harganya!')
      }
      if(this.$refs.fileInput.value === '' || this.$refs.fileInput.value === null){
        return alert('Isi gambarnya!')
      }
      if(data.kategori_id === '' || data.kategori_id === null){
        return alert('Isi kategorinya!')
      }

      let formData = new FormData;
      formData.append('nama', data.nama);
      formData.append('harga', data.harga);
      formData.append('url_img', this.$refs.fileInput.files[0]);
      formData.append('kategori_id', data.kategori_id);

      axios.post(process.env.VUE_APP_PRODUCT, formData, {
        headers: {
          authtoken: this.getAuth.token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        this.loadProducts()
        this.formAddProduct.nama=null
        this.formAddProduct.harga=null
        this.formAddProduct.kategori_id=null
        this.$refs.fileInput.value=null
        // alert('Success Add Product!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Add Product!')
      });
    },
    editProduct(value){
      this.formProduct.id = value.id;
      this.formProduct.nama = value.nama;
      this.formProduct.harga = value.harga;
      this.formProduct.url_img = value.url_img;
      this.formProduct.kategori_id = value.kategori_id;
    },
    updateProduct(data){
      if(data.nama === '' || data.nama === null){
        return alert('Isi namanya!')
      }
      if(data.harga === '' || data.harga === null){
        return alert('Isi harganya!')
      }
      if(data.kategori_id === '' || data.kategori_id === null){
        return alert('Isi kategorinya!')
      }

      let formData = new FormData;
      formData.append('id', data.id);
      formData.append('nama', data.nama);
      formData.append('harga', data.harga);
      if(this.$refs.fileUpdate[0].value === '' || this.$refs.fileUpdate[0].value === null){
        formData.append('url_img', data.url_img);
      }else{
        formData.append('url_img', this.$refs.fileUpdate[0].files[0]);
      }
      formData.append('kategori_id', data.kategori_id);
      
      axios.put(process.env.VUE_APP_PRODUCT, formData, {
        headers: {
          authtoken: this.getAuth.token,
          "Content-Type": "multipart/form-data"
        }
      })
      .then(() => {
        this.loadProducts()
        alert('Success Update Product!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Update Product!')
      });
    },
    delProduct(value){
      axios.delete(process.env.VUE_APP_PRODUCT + `/${value.id}`, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then(() => {
        this.loadProducts()
        alert('Success Delete Product!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Delete Product!')
      });
    },

    loadCategories(){
      axios.get(process.env.VUE_APP_CATEGORY, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then((res) => {
        this.categories = res.data.result;
        // console.log(this.categories);
      })
      .catch((err) => {
        console.log(err);
      });
    },
    addCategory(value){
      axios.post(process.env.VUE_APP_CATEGORY, value, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then(() => {
        this.loadCategories()
        this.formAddCategory.tipe=null
        // alert('Success Add Category!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Add Category!')
      });
    },
    editCategory(value){
      this.formCategory.id = value.id;
      this.formCategory.tipe = value.tipe;
    },
    updateCategory(value){
      axios.put(process.env.VUE_APP_CATEGORY, value, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then(() => {
        this.loadCategories()
        alert('Success Update Category!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Update Category!')
      });
    },
    delCategory(value){
      axios.delete(process.env.VUE_APP_CATEGORY + `/${value.id}`, {
        headers: {
          authtoken: this.getAuth.token
        }
      })
      .then(() => {
        this.loadCategories()
        alert('Success Delete Category!')
      })
      .catch((err) => {
        console.log(err);
        alert('Error Delete Category!')
      });
    },
  },
  computed: {
    ...mapGetters(['getAuth']),
  },
  mounted(){
    this.loadCategories()
    this.loadProducts()
  }
};
</script>
