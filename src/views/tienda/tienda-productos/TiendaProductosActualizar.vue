<template>
<div>
    <b-card>
        <b-card-title>Actualizar Productos</b-card-title>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Referencia" label-for="referencia">
                        <b-form-input id="referencia" placeholder="Referencia" v-model="products.referencia" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-input id="nombre" placeholder="Nombre" v-model="products.nombre" disabled />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Talla" label-for="talla">
                        <b-form-input id="talla" placeholder="XS, S, M, L, XL, XXL" v-model="products.talla" disabled />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Precio" label-for="precio">
                        <b-form-input id="precio" placeholder="Precio (0.00)" v-model="products.precio" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Cantidad" label-for="cantidad">
                        <b-form-input id="cantidad" placeholder="Cantidad" v-model="products.cantidad" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button @click="makeToast()" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" :click="editarProducto()" :to="{name: 'tienda-productosBD'}">
                        Actualizar Producto
                    </b-button>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
</div>
</template>

<script>
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import {
    BCard,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton,
    BCardTitle
} from 'bootstrap-vue'
export default {
    data() {
        return {
            products: []
        }
    },
    components: {
        BCard,
        BForm,
        BRow,
        BCol,
        BFormGroup,
        BFormInput,
        BFormFile,
        BButton,
        BCardTitle
    },
    created() {
        axios.get('http://localhost/shop.php/?referencia=' + this.$route.params.referencia)
            .then((resp) => {
                this.products = resp.data[0]
                console.log(this.products)
            })
    },
    methods: {
        editarProducto() {
            var datosEnviar = {
                referencia: this.$route.params.referencia,
                precio: this.products.precio,
                cantidad: this.products.cantidad
            }

            const axios = require('axios');
            let data = JSON.stringify(datosEnviar);

            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://localhost/shop.php/?actualizar='+ this.$route.params.referencia,
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                })
                .catch((error) => {
                    console.log(error);
                });
        },
        makeToast() {
            this.$bvToast.toast('El producto se ha actualizado correctamente', {
                title: `Actualización de producto`,
                variant: 'primary',
                solid: true
            })
        }
    },
    directives: {
        Ripple
    }
}
</script>

<style>

</style>
