<template>
  <div class="d-flex justify-content-center pb-3">
    <div class="shadow" style="width: 18rem;" @click="addCart(product)">
      <img :src="images" :alt="name" class="card-img-top" />
      <div class="card-body border-top">
        <h5>{{ name }}</h5>
        <h3 class="font-weight-bold">Rp.{{ price }}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "card",
  props: {
    images: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['addCart'])
  }
};
</script>
