<template>
<div>
    <b-card>
        <b-card-title>Crear Productos</b-card-title>
        <b-form>
            <b-row>
                <b-col>
                    <b-form-group label="Referencia" label-for="referencia" style="text-align: center;">
                        <b-form-input id="referencia" placeholder="Referencia" v-model="products.referencia" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Nombre" label-for="nombre" style="text-align: center;">
                        <b-form-input id="nombre" placeholder="Nombre" v-model="products.nombre" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Talla" label-for="talla" style="text-align: center;">
                        <b-form-input id="talla" placeholder="XS, S, M, L, XL, XXL" v-model="products.talla" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Precio" label-for="precio" style="text-align: center;">
                        <b-form-input id="precio" placeholder="Precio (0.00)" v-model="products.precio" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Cantidad" label-for="cantidad" style="text-align: center;">
                        <b-form-input id="cantidad" placeholder="Cantidad" v-model="products.cantidad" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button @click="crearProducto()" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" style="align-items: center;">
                        Crear Producto
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
    directives: {
        Ripple
    },
    methods: {
        crearProducto() {
            var datosEnviar = {
                referencia: this.products.referencia,
                nombre: this.products.nombre,
                talla: this.products.talla,
                precio: this.products.precio,
                cantidad: this.products.cantidad
            }
            axios.post("http://localhost/shop.php/?insertar", JSON.stringify(datosEnviar))
                .then((resp) => {
                    console.log("Producto creado")
                })
                this.actualizarTabla
        },
        actualizarTabla() {
            axios.get("http://localhost/shop.php/")
                .then((resp) => {
                    this.products = resp.data
                })
        }
    }
}
</script>

<style>
</style>
