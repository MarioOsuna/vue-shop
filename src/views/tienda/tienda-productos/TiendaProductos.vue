<template>
  <div>
    <section class="ecommerce-header">
      <div class="row">
        <div class="ecommerce-header-items">
          <div class="view-options d-flex">
            <b-overlay
              :show="show"
              rounded="sm"
              variant="transparent"
            >
              <b-tabs>
                <b-tab active>
                  <template #title>
                    <feather-icon
                      icon="ListIcon"
                      size="16"
                      class="mr-0 mr-sm-50"
                    />
                  </template>
                  <vistaTabla
                    :product="products"
                    @refresh="getData()"
                  />
                </b-tab>
                <b-tab>
                  <template #title>
                    <feather-icon
                      icon="GridIcon"
                      size="16"
                      class="mr-0 mr-sm-50"
                    />
                  </template>
                  <vistaCarta
                    :product="products"
                    @refresh="getData()"
                  />
                </b-tab>
              </b-tabs>
            </b-overlay>
          </div>
        </div>
      </div>
    </section>
    <b-sidebar
      id="sidebar-right"
      ref="sidebar"
      bg-variant="white"
      right
      backdrop
      shadow
    >
      <b-overlay
        :show="show"
        rounded="sm"
        variant="transparent"
      >
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
                    @click="crear"
                  >
                    Crear Producto
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card>
        </div>
      </b-overlay>
    </b-sidebar>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BTabs,
  BTab,
  BSidebar,
  BCard,
  BCardTitle,
  BForm,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  VBToggle,
  BButton,
  BOverlay,
} from 'bootstrap-vue'
import vistaTabla from './TiendaProductosTable.vue'
import vistaCarta from './TiendaProductosCard.vue'

export default {
  components: {
    BTabs,
    BTab,
    BSidebar,
    BCard,
    BCardTitle,
    BForm,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
    vistaTabla,
    vistaCarta,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  data: () => ({
    products: [],
    buscar: '',
    show: false,
  }),
  computed: {
    filtrarProducto() {
      if (this.products) {
        return this.products.filter(item => item.nombre.match(this.buscar))
      }
      return false
    },
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.show = true
      fetch('https://vuealvaro.000webhostapp.com/shop.php/?consultar')
        .then(res => res.json())
        .then(json => {
          this.products = json
          this.show = false
        })
    },
    crearProducto() {
      const datosEnviar = {
        referencia: this.products.referencia,
        nombre: this.products.nombre,
        talla: this.products.talla,
        precio: this.products.precio,
        cantidad: this.products.cantidad,
      }
      this.show = true
      fetch('https://vuealvaro.000webhostapp.com/shop.php/?insertar', {
        method: 'POST',
        body: JSON.stringify(datosEnviar),
      })
        .then(res => {
          this.$refs.sidebar.hide()
          this.show = false
          this.getData()
        }).catch(
          error => console.log(error),
        )
    },
    crear() {
      this.$swal({
        title: '¡Añadido!',
        text: '¡El producto se añadió a la base de datos correctamente!',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonStyling: false,
      })
      this.crearProducto()
    },
  },
}
</script>

<style>
</style>
