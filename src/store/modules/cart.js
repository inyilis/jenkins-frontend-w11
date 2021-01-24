const cart = {
  state: {
    cart: [],
  },
  getters: {
    allCart: (state) => {
      return state.cart;
    },
    calculate: (state) => {
      let price = 0;
      for (const key in state.cart) {
        price = price + state.cart[key].product.harga * state.cart[key].qty;
      }
      return price;
    },
    quantity: (state) => {
      let qty = 0;
      for (const key in state.cart) {
        qty = qty + state.cart[key].qty;
      }
      return qty;
    },
  },
  actions: {
    addCart({commit, state}, data) {
      let indexItem
      let isExist = state.cart.filter((item, index) => {
        if(item.product.id == Number(data.id)){
          indexItem = index;
          return true;
        }else{
          return false;
        }
      })

      if(isExist.length){
        commit('incrementQty', indexItem);
      }else{
        commit('addCart', {product: data, qty: 1});
      }
    },
    delCart({commit, state}, idCart) {
      if(state.cart[idCart].qty > 1){
        commit('decrementQty', idCart);
      }else{
        commit('delCart', idCart);
      }
    },
    cartNull({commit}) {
      commit('cartNull');
    },
  },
  mutations: {
    addCart(state, data){
      state.cart.push(data)
    },
    incrementQty(state, idx){
      state.cart[idx].qty++
    },
    delCart(state, idx){
      state.cart.splice(idx, 1)
    },
    decrementQty(state, idx){
      state.cart[idx].qty--
    },
    cartNull(state){
      state.cart = []
    },
  },
}

export default cart