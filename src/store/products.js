 
  const products = {
  namespaced: true,
  state: {
    products: [
    // {
    //"cat_id":"SUSHI",
    //"id":"1",
    //"name":"Salmon Roll",
    //"description":"Simply delicious!",
    //"price":"18",
    //"image":"04.jpg",
    //"visible": "1",
    //}
    ]
  },
  getters: {
    getProducts (state) {
      return state.products;
    },
    getProduct: (state) => (id) => {
      let index = state.products.findIndex(p => p.id == id)
      return state.products[index]
    },    
  }, 
  mutations: {
    addProducts(state, products){
        state.products = products
    },

	},
  actions: {
    async getProductsFromDB({commit}) {
			try {
				const response = await fetch('http://daw.deei.fct.ualg.pt/~a72730/LAB11/api/products.php')
				const data = await response.json()
                commit('addProducts', data)
			} 
			catch (error) {
                console.log('error: ', error)
			}
		},
  },
  modules: {
  }
}
export default 
	products