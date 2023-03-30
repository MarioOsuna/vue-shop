<template>
<div>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Men's Clothing</span>
    </b-button>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Jewelery</span>
    </b-button>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Electronics</span>
    </b-button>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" class="btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0" style="margin: auto;">
        <span>Women's Clothing</span>
    </b-button>
</div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
export default {
    name: 'Buttons',
    directives: {
        Ripple,
    }
}
</script>

<style>

</style>
