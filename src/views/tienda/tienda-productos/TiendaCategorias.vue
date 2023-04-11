<template>
<b-row class="match-height">
    <b-col md="12" lg="3">
        <b-card class="ecommerce-card" no-body>
            <b-link :to="{name: 'tienda-categorias-productos', params: {name: names[0]}}">
                <b-img src="@/assets/images/shop/electronica.jpg" fluid />
                <b-card-body>
                    <b-card-title>Electronics</b-card-title>
                </b-card-body>
            </b-link>
        </b-card>
    </b-col>
    <b-col md="12" lg="3">
        <b-card class="ecommerce-card" no-body>
            <b-link :to="{name: 'tienda-categorias-productos', params: {name: names[1]}}">
                <b-img src="@/assets/images/shop/joyeria.jpg" fluid />
                <b-card-body>
                    <b-card-title>Jewelery</b-card-title>
                </b-card-body>
            </b-link>
        </b-card>
    </b-col>
    <b-col md="12" lg="3">
        <b-card class="ecommerce-card" no-body>
            <b-link :to="{name: 'tienda-categorias-productos', params: {name: names[2]}}">
                <b-img src="@/assets/images/shop/hombre.jpg" fluid />
                <b-card-body>
                    <b-card-title>Men's Clothing</b-card-title>
                </b-card-body>
            </b-link>
        </b-card>
    </b-col>
    <b-col md="12" lg="3">
        <b-card class="ecommerce-card" no-body>
            <b-link :to="{name: 'tienda-categorias-productos', params: {name: names[3]}}">
                <b-img src="@/assets/images/shop/mujer.jpg" fluid />
                <b-card-body>
                    <b-card-title>Women's Clothing</b-card-title>
                </b-card-body>
            </b-link>
        </b-card>
    </b-col>

</b-row>
</template>

<script>
import {
    BRow,
    BCol,
    BCardGroup,
    BCard,
    BCardBody,
    BCardTitle,
    BImg,
    BLink
} from 'bootstrap-vue'

export default {
    /*props: {
    name: {
      type: String,
      default: false,
    }
  },*/
    data: () => {
        return {
            names: ["electronics", "jewelery", "men's clothing", "women's clothing"]
        }
    },
    components: {
        BRow,
        BCol,
        BCardGroup,
        BCard,
        BCardBody,
        BCardTitle,
        BImg,
        BLink
    }
}
</script>
