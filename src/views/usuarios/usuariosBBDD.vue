<template>
  <div>
    <section class="ecommerce-header">
      <div class="row">
        <div class="col-sm-12">
          <div class="ecommerce-header-items">
            <div class="view-options d-flex">
              <!-- Botones Vistas -->
              <b-overlay
                :show="show"
                rounded="sm"
              >
                <b-tabs>
                  <!-- Tab: Vista Tabla -->
                  <b-tab active>
                    <template #title>
                      <feather-icon
                        icon="MenuIcon"
                        size="16"
                        class="mr-0 mr-sm-50"
                      />
                    </template>
                    <usuariosBBDDTabla
                      :user="users"
                      @refresh="getData()"
                    />

                  </b-tab>
                  <!-- Tab: Vista Cards -->
                  <b-tab>
                    <template #title>
                      <feather-icon
                        icon="GridIcon"
                        size="16"
                        class="mr-0 mr-sm-50"
                      />
                    </template>
                    <usuariosBBDDCards
                      :user="users"
                      @refresh="getData()"
                    />
                  </b-tab>
                </b-tabs>
              </b-overlay>
            </div>
          </div>
        </div>
      </div>
    </section>
    <br>
    <div>
      <b-sidebar
        id="sidebar-right"
        ref="mySidebar"
        bg-variant="white"
        right
        backdrop
        shadow
      >
        <b-overlay
          :show="show"
          rounded="sm"
        >
          <template>
            <b-form
              id="miform"
              @submit.prevent="agregarRegistro"
            >

              <div class="m-2">
                <div class="text-center mb-3">
                  <!-- Name -->
                  <b-card-text class="mt-2 h4 color-inherit text-reset">
                    Crear Usuarios
                  </b-card-text>
                </div>
                <b-row>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Usuario"
                      label-for="usuario"
                    >
                      <b-form-input
                        id="usuario"
                        v-model="users.usuario"
                        placeholder="alex1234"
                        required
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Nombre"
                      label-for="nombre"
                    >
                      <b-form-input
                        id="nombre"
                        v-model="users.nombre"
                        placeholder="Francisco"
                        required
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Apellido"
                      label-for="apellido"
                    >
                      <b-form-input
                        id="apellido"
                        v-model="users.apellido"
                        placeholder="Sanchez"
                        required
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Email"
                      label-for="email"
                    >
                      <b-form-input
                        id="email"
                        v-model="users.email"
                        type="email"
                        placeholder="francis@example.com"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Teléfono"
                      label-for="telefono"
                    >
                      <b-form-input
                        id="telefono"
                        v-model="users.telefono"
                        type="number"
                        placeholder="675890123"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Ciudad"
                      label-for="ciudad"
                    >
                      <b-form-input
                        id="ciudad"
                        v-model="users.ciudad"
                        placeholder="Madrid"
                        required
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Dirección"
                      label-for="direccion"
                    >
                      <b-form-input
                        id="direccion"
                        v-model="users.direccion"
                        placeholder="Calle Borja Pavon"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    cols="12"
                    md="6"
                  >
                    <b-form-group
                      label="Número"
                      label-for="numero"
                    >
                      <b-form-input
                        id="numero"
                        v-model="users.numero"
                        type="number"
                        placeholder="2"
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="justify-content-center">
                  <b-col>
                    <b-form-group
                      label="Código Postal"
                      label-for="codigo_postal"
                      style="text-align: center;"
                    >
                      <b-form-input
                        id="codigo_postal"
                        v-model="users.codigo_postal"
                        type="number"
                        placeholder="14700"
                        required
                      />
                    </b-form-group>
                  </b-col>
                </b-row>
                <b-row class="justify-content-center m-1">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                    @click="completado"
                  >
                    Crear Usuario
                  </b-button>

                </b-row>
                <b-row class="justify-content-center m-1">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    type="reset"
                    variant="secondary"
                    class="mb-1 mb-sm-0 mr-0 mr-sm-1"
                    style=""
                  >
                    Resetear Campos
                  </b-button>
                </b-row>
              </div>
            </b-form>
          </template>
        </b-overlay>
      </b-sidebar>
    </div>

  </div>
</template>

<script>
import {
  BDropdown,
  VBToggle,
  BTab,
  BTabs,
  BDropdownItem,
  BFormRadioGroup,
  BFormRadio,
  BRow,
  BCol,
  BInputGroup,
  BInputGroupAppend,
  BFormInput,
  BCard,
  BCardBody,
  BLink,
  BImg,
  BCardText,
  BButton,
  BPagination,
  BSidebar,
  BListGroup,
  BListGroupItem,
  BFormGroup,
  BForm,
  BOverlay,
  BAvatar,

} from 'bootstrap-vue'
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import usuariosBBDDCards from './usuariosBBDDCards.vue'
import usuariosBBDDTabla from './usuariosBBDDTabla.vue'

export default {
  directives: {
    'b-toggle': VBToggle,
    Ripple,
  },
  components: {
    usuariosBBDDCards,
    usuariosBBDDTabla,
    // BSV
    BDropdown,
    BDropdownItem,
    BTab,
    BTabs,
    BFormRadioGroup,
    BFormRadio,
    BRow,
    BForm,
    BCol,
    BFormGroup,
    BInputGroup,
    BInputGroupAppend,
    BFormInput,
    BCard,
    BCardBody,
    BLink,
    BImg,
    BCardText,
    BButton,
    BPagination,
    BSidebar,
    BListGroup,
    BListGroupItem,
    BOverlay,
    BAvatar,
  },
  data: () => ({
    users: [],
    show: false,
    search: '',
  }),
  computed: {
    filteredUsers() {
      if (this.users) {
        return this.users.filter(item => item.usuario.match(this.search))
      }
      return false
    },
  },
  created() {
    this.getData()
  },
  methods: {
    eliminarValor(id) {
      fetch(`https://vueproyect.000webhostapp.com/vue_project.php/?borrar=${id}`, {
        method: 'POST',
      })
        .then(resp => {
          console.log(resp)
          console.log('Usuario Eliminado Correctamente')
          // location.reload()
          // this.getData();
        })
    },
    getData() {
      this.show = true
      fetch('https://vueproyect.000webhostapp.com/vue_project.php/')
        .then(response => response.json())
        .then(responseData => {
          this.users = responseData
          this.show = false
        })
    },

    agregarRegistro() {
      console.log(this.users)
      const datosEnviar = {
        usuario: this.users.usuario,
        nombre: this.users.nombre,
        apellido: this.users.apellido,
        email: this.users.email,
        telefono: this.users.telefono,
        ciudad: this.users.ciudad,
        direccion: this.users.direccion,
        numero: this.users.numero,
        codigo_postal: this.users.codigo_postal,
      }
      this.show = true
      fetch('https://vueproyect.000webhostapp.com/vue_project.php/?insertar=1', {
        method: 'POST',
        body: JSON.stringify(datosEnviar),
      })
        .then(resp => {
          console.log(resp)
          console.log('Actualizado Correctamente')
          console.log(resp)
          // location.reload()
          // this.crearUsuarioToast('primary')
          this.$refs.mySidebar.hide()
          this.show = false
          this.getData()
          this.resetearDatos()
        })
    },
    crearUsuarioToast(variant = null) {
      this.$bvToast.toast('La Creación Del Usuario Se Ha Ejecutado Correctamente', {
        title: 'Usuario Creado Correctamente',
        variant,
        solid: false,
      })
    },

    makeToast(variant = null) {
      this.$bvToast.toast('El Usuario Se Ha Eliminado Correctamente', {
        title: 'Usuario Eliminado Correctamente',
        variant,
        solid: false,
      })
    },
    resetearDatos() {
      document.getElementById('miform').reset()
      this.$refs.mySidebar.hide()
    },
    completado() {
      this.$swal({
        title: '¡Usuario Creado!',
        text: 'Usuario Creado Correctamene',
        icon: 'success',
        customClass: {
          confirmButton: 'btn btn-primary',
        },
        buttonsStyling: false,
      })
    },
    confirmarEliminar(id) {
      this.$swal({
        title: '¿Estas Seguro?',
        text: '¡Una Vez Eliminado No Lo Podrás Recuperar!',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Si, eliminar',
        customClass: {
          confirmButton: 'btn btn-primary',
          cancelButton: 'btn btn-outline-danger ml-1',
        },
        buttonsStyling: false,
      }).then(result => {
        if (result.value) {
          this.$swal({
            icon: 'success',
            title: '¡Usuario Eliminado!',
            text: 'El Usuario Se Ha Eliminado Correctamente',
            customClass: {
              confirmButton: 'btn btn-success',
            },
          })
          this.eliminarValor(id)
        }
      })
    },
  },

}
</script>

<style>

</style>
