<template>
  <div>
    <b-card>
      <b-form>
        <b-row>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Usuario"
              label-for="username"
            >
              <b-form-input
                id="username"
                v-model="usuario"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Nombre"
              label-for="nombree"
            >
              <b-form-input
                id="nombree"
                v-model="nombre"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Apellido"
              label-for="apellidoo"
            >
              <b-form-input
                id="apellidoo"
                v-model="apellido"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Email"
              label-for="mail"
            >
              <b-form-input
                id="mail"
                v-model="email"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Teléfono"
              label-for="tlf"
            >
              <b-form-input
                id="tlf"
                v-model="telefono"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Ciudad"
              label-for="ciudadd"
            >
              <b-form-input
                id="ciudadd"
                v-model="ciudad"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Dirección"
              label-for="direc"
            >
              <b-form-input
                id="direc"
                v-model="direccion"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Numero"
              label-for="num"
            >
              <b-form-input
                id="num"
                v-model="numero"
              />
            </b-form-group>
          </b-col>
          <b-col
            cols="12"
            md="4"
          >
            <b-form-group
              label="Código Postal"
              label-for="zip"
            >
              <b-form-input
                id="zip"
                v-model="cp"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
    <!-- Action Buttons -->
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="primary"
      class="mb-1 mb-sm-0 mr-0 mr-sm-1"
      @click="makeToast('primary')"
      @click="updateValue"
    >
      Guardar Cambios
    </b-button>
    <b-button
      variant="outline-secondary"
      type="reset"
    >
      Resetear
    </b-button>

  </div>
</template>

<script>
import {
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
} from 'bootstrap-vue'
import axios from '@axios'

export default {
  components: {
    BButton,
    BMedia,
    BAvatar,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BFormCheckbox,

  },
  data: () => ({
    users: [],
    usuario: null,
    nombre: null,
    apellido: null,
    ciudad: null,
    telefono: null,
    email: null,
    direccion: null,
    numero: null,
    cp: null,

  }),
  created() {
    axios.get(`https://fakestoreapi.com/users/${this.$route.params.id}`)
      .then(resp => {
        this.users = resp.data
        this.usuario = this.users.username
        this.nombre = this.users.name.firstname
        this.apellido = this.users.name.lastname
        this.ciudad = this.users.address.city
        this.telefono = this.users.phone
        this.email = this.users.email
        this.direccion = this.users.address.street
        this.numero = this.users.address.number
        this.cp = this.users.address.zipcode
      })
  },
  methods: {
    updateValue() {
      'PUT',
      JSON.stringify({
        email,
        username: usuario,
        name: {
          firstname: nombre,
          lastname: apellido,
        },
        address: {
          city: ciudad,
          street: direccion,
          number: numero,
          zipcode: cp,
          geolocation: {
            lat: '-37.3159',
            long: '81.1496',
          },
        },
        phone: telefono,
      })
      axios.post(`https://fakestoreapi.com/users/${this.$route.params.id}`)
        .then(resp => {
          console.log(resp)
        })
    },
    makeToast(variant = null) {
      this.$bvToast.toast('La Información Del Usuario Se Ha Actualizado Correctamente', {
        title: 'Usuario Actualizado Correctamente',
        variant,
        solid: false,
      })
    },
  },
}
</script>

<style>

</style>
