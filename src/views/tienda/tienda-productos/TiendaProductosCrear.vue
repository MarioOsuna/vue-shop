<template>
  <div>
    <b-card>
      <b-card-title>Crear Productos</b-card-title>
      <b-form>
        <b-row>
          <b-col>
            <b-form-group
              label="Referencia"
              label-for="referencia"
              style="text-align: center;"
            >
              <b-form-input
                id="referencia"
                v-model="products.referencia"
                placeholder="Referencia"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Nombre"
              label-for="nombre"
              style="text-align: center;"
            >
              <b-form-input
                id="nombre"
                v-model="products.nombre"
                placeholder="Nombre"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Talla"
              label-for="talla"
              style="text-align: center;"
            >
              <b-form-input
                id="talla"
                v-model="products.talla"
                placeholder="XS, S, M, L, XL, XXL"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Precio"
              label-for="precio"
              style="text-align: center;"
            >
              <b-form-input
                id="precio"
                v-model="products.precio"
                placeholder="Precio (0.00)"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-form-group
              label="Cantidad"
              label-for="cantidad"
              style="text-align: center;"
            >
              <b-form-input
                id="cantidad"
                v-model="products.cantidad"
                placeholder="Cantidad"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              variant="primary"
              style="align-items: center;"
              @click="crearProducto()"
            >
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
  BCardTitle,
} from 'bootstrap-vue'

export default {
  components: {
    BCard,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton,
    BCardTitle,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      products: [],
    }
  },
  methods: {
    crearProducto() {
      const datosEnviar = {
        referencia: this.products.referencia,
        nombre: this.products.nombre,
        talla: this.products.talla,
        precio: this.products.precio,
        cantidad: this.products.cantidad,
      }
      axios.post('http://localhost/shop.php/?insertar', JSON.stringify(datosEnviar))
        .then(resp => {
          console.log('Producto creado')
        })
      this.actualizarTabla
    },
    actualizarTabla() {
      axios.get('http://localhost/shop.php/')
        .then(resp => {
          this.products = resp.data
        })
    },
  },
}
</script>

<style>
</style>
