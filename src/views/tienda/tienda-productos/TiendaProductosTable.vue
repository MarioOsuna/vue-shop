<template>
  <div>
    <div class="ecommerce-searchbar mt-1">
      <b-row>
        <b-col>
          <b-input-group class="input-group-merge">
            <b-form-input
              v-model="buscar"
              placeholder="Buscar producto"
              class="search-product"
            />
            <b-input-group-append is-text>
              <feather-icon
                icon="SearchIcon"
                class="text-muted"
              />
            </b-input-group-append>
          </b-input-group>
        </b-col>
        <b-button
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          v-b-toggle.sidebar-right
          variant="primary"
          class="btn-icon"
          style="float: right;"
        >
          <feather-icon icon="PlusIcon" />
        </b-button>
      </b-row>
    </div>
    <hr>
    <div>
      <b-table
        :fields="fields"
        :items="product"
        responsive="sm"
      >
        <template #cell(action)="data">
          <b-dropdown
            variant="link"
            no-caret
            :right="$store.state.appConfig.isRTL"
          >
            <template #button-content>
              <feather-icon
                icon="MoreVerticalIcon"
                size="16"
                class="align-middle text-body"
              />
            </template>
            <b-dropdown-item>
              <b-link
                :to="{ name: 'tienda-productos-editar', params: { referencia: data.item.referencia }}"
                :product="product"
              >
                <feather-icon icon="EditIcon" />
                <span class="align-middle ml-50">Editar</span>
              </b-link>
            </b-dropdown-item>
            <b-dropdown-item @click="eliminar(data.item.referencia)">
              <b-link>
                <feather-icon icon="TrashIcon" />
                <span class="align-middle ml-50">Eliminar</span>
              </b-link>
            </b-dropdown-item>
          </b-dropdown>
        </template>
      </b-table>

    </div>
  </div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
import {
  BTable,
  BRow,
  BCol,
  BInputGroup,
  BFormInput,
  BInputGroupAppend,
  BButton,
  BDropdown,
  BDropdownItem,
  BLink,
  VBToggle,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BRow,
    BCol,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BDropdown,
    BDropdownItem,
    BLink,
  },
  directives: {
    Ripple,
    'b-toggle': VBToggle,
  },
  props: {
    product: {
      type: Array,
      default: () => [],
    },
  },
  data: () => ({
    fields: [
      'referencia',
      'nombre',
      'tipo',
      'talla',
      'precio',
      'cantidad',
      {
        key: 'action',
        label: 'Acciones',
      },
    ],
    buscar: '',
    show: false,
  }),
  computed: {
    filtrarProducto() {
      if (this.product) {
        return this.product.filter(item => item.nombre.match(this.buscar))
      }
      return false
    },
  },
  methods: {
    crearProducto() {
      const datosEnviar = {
        referencia: this.product.referencia,
        nombre: this.product.nombre,
        talla: this.product.talla,
        precio: this.product.precio,
        cantidad: this.product.cantidad,
      }
      fetch('https://vuealvaro.000webhostapp.com/shop.php/?insertar', {
        method: 'POST',
        body: JSON.stringify(datosEnviar),
      })
        .then(res => {
          this.$refs.sidebar.hide()
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
    eliminarProducto(referencia) {
      fetch(`https://vuealvaro.000webhostapp.com/shop.php/?borrar='${referencia}'`, {
        method: 'POST',
      })
        .then(res => {
          this.$emit('refresh')
        })
        .catch(error => {
          console.log(error)
        })
    },
    eliminar(referencia) {
      this.$swal({
        title: '¿Estás seguro?',
        text: 'El producto se eliminará de la base de datos',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Sí, eliminar!',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: '¡Eliminado!',
            text: `La referencia ${referencia} ha sido eliminada.`,
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.eliminarProducto(referencia)
        } else {
          this.$swal({
            icon: 'error',
            title: '¡Cancelado!',
            text: `La referencia ${referencia} no ha sido eliminada.`,
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
        }
      })
    },
  },
}
</script>

<style>

</style>
