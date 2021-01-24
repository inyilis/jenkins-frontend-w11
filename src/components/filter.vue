<template>
    <div class="row">
        <div class="col-6 col-md-3 d-flex justify-content-center mt-3">
            <h5>Name</h5>
            <select class="form-select ml-3" aria-label="Default select example" v-model="sorted.nama" @click="sortedProduct()">
            <option selected></option>
            <option value="ASC">A - Z</option>
            <option value="DESC">Z - A</option>
            </select>
        </div>
        <div class="col-6 col-md-3 d-flex justify-content-center mt-3">
            <h5>Price</h5>
            <select class="form-select ml-3" aria-label="Default select example" v-model="sorted.harga" @click="sortedProduct()">
            <option selected></option>
            <option value="DESC">High</option>
            <option value="ASC">Low</option>
            </select>
        </div>
        <div class="col-6 col-md-3 d-flex justify-content-center mt-3">
            <h5>Category</h5>
            <select class="form-select ml-3" aria-label="Default select example" v-model="sorted.kategori" @click="sortedProduct()">
            <option selected></option>
            <option value="ASC">Drinks</option>
            <option value="DESC">Foods</option>
            </select>
        </div>
        <div class="col-6 col-md-3 d-flex justify-content-center  mt-3">
            <h5>Products</h5>
            <select class="form-select ml-3" aria-label="Default select example" v-model="sorted.terbaru" @click="sortedProduct()">
            <option selected></option>
            <option value="DESC">New</option>
            <option value="ASC">Old</option>
            </select>
        </div>
    </div>
</template>


<script>
export default {
  name: "sorted",
  data(){
    return{
      sorted:{
        nama:'',
        kategori:'',
        terbaru:'',
        harga:'',
      },
    }
  },
  methods: {
      sortedProduct(){
          this.$emit('sorted', this.sorted)
      }
  }
};
</script>