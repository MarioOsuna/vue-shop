<template>
<b-row>
    <b-col cols="12" md="3">
        <b-card :img-src="require('@/assets/images/shop/electronica.jpg')" img-top no-body>
            <b-card-body>
                <b-card-title>Electronics</b-card-title>
            </b-card-body>
        </b-card>
    </b-col>
    <b-col cols="12" md="3">
        <b-card :img-src="require('@/assets/images/shop/joyeria.jpg')" img-top no-body>
            <b-card-body>
                <b-card-title>Jewelery</b-card-title>
            </b-card-body>
        </b-card>
    </b-col>
    <b-col cols="12" md="3">
        <b-card :img-src="require('@/assets/images/shop/hombre.jpg')" img-top no-body>
            <b-card-body>
                <b-card-title>Men's Clothing</b-card-title>
            </b-card-body>
        </b-card>
    </b-col>
    <b-col cols="12" md="3">
        <b-card :img-src="require('@/assets/images/shop/mujer.jpg')" img-top no-body>
            <b-card-body>
                <b-card-title>Women's Clothing</b-card-title>
            </b-card-body>
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
    BCardTitle
} from 'bootstrap-vue'

export default {
    components: {
        BRow,
        BCol,
        BCardGroup,
        BCard,
        BCardBody,
        BCardTitle
    }
}
</script>

<style>

</style>
