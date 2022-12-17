<template >
    <div class="card bg-danger text-white tex" style="top: 5rem;">
          <div class="card-body text-center border">
              <h3>{{errorMsg}}</h3> 
          </div>
      </div>
  </template>
  
  
  <script>
  export default {
      props: ['errorMsg']
  }
  </script>