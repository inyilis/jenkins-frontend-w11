<template>
  <div class="card mb-1">
    <div class="row">
      <div class="col-4">
        <img :src="image" class="card-img py-4 ml-3" :alt="name" />
      </div>
      <div class="col-8">
        <div class="">
          <p class="card-text pt-2">{{ name }}</p>
          <div class="btn border" @click="delCart(id)">-</div>
          <div class="btn border">{{ qty }}</div>
          <div class="btn border" @click="addCart(cart)">+</div>
          <h5 class="card-title pt-3">Rp.{{ price * qty }}</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';

export default {
  name: "cart",
  props: {
    id: {
      type: Number,
      required: true,
    },
    image: {
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
    qty: {
      type: Number,
      required: true,
    },
    cart: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(['addCart', 'delCart'])
  }
};
</script>
