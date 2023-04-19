<template>
<div>
    <b-card>
        <b-form v-on:submit.prevent="agregarProducto">
            <b-row>
                <b-col>
                    <b-form-group label="Referencia" label-for="referencia">
                        <b-form-input id="referencia" placeholder="Referencia" v-model="producto.referencia" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-input id="nombre" placeholder="Nombre" v-model="producto.nombre" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-form-group label="Talla" label-for="talla">
                        <b-form-input id="talla" placeholder="XS, S, M, L, XL, XXL" v-model="producto.talla" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Precio" label-for="precio">
                        <b-form-input id="precio" placeholder="Precio (0.00)" v-model="producto.precio" />
                    </b-form-group>
                </b-col>
                <b-col>
                    <b-form-group label="Cantidad" label-for="cantidad">
                        <b-form-input id="cantidad" placeholder="Cantidad" v-model="producto.cantidad" />
                    </b-form-group>
                </b-col>
            </b-row>
            <b-row>
                <b-col>
                    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" type="submit">
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
    BButton
} from 'bootstrap-vue'
export default {
    data() {
        return {
            producto: {}
        }
    },
    methods: {
        agregarProducto() {
            console.log(this.producto)

            var datosEnviar = {
                referencia: this.producto.referencia,
                nombre: this.producto.nombre,
                talla: this.producto.talla,
                precio: this.producto.precio,
                cantidad: this.producto.cantidad
            }

            axios.post('http://localhost/shop.php/?insertar=1', JSON.stringify(datosEnviar))
            .then((resp) => {
                console.log(resp);
                console.log("Producto añadido");
                console.log(resp);
            })
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
        BButton
    },
    directives: {
        Ripple
    }
}
</script>

<style>

</style>
