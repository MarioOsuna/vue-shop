<template>
  <div>
    <!-- Media -->
    <b-media
      v-for="usuario in users"
      :key="usuario.id"
      class="mb-2"
    >
      <template #aside />
      <h4 class="mb-1">
        {{ usuario.name }}
      </h4>
      <div class="d-flex flex-wrap">
        <b-button
          variant="primary"
          @click="$refs.refInputEl.click()"
        >
          <span class="d-none d-sm-inline">Actualizar</span>
          <feather-icon
            icon="EditIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
        <b-button
          variant="outline-secondary"
          class="ml-1"
        >
          <span class="d-none d-sm-inline">Eliminar</span>
          <feather-icon
            icon="TrashIcon"
            class="d-inline d-sm-none"
          />
        </b-button>
      </div>
    </b-media>

    <!-- User Info: Input Fields -->
    <b-form>
      <b-row
        v-for="usuario in users"
        :key="usuario.id"
      >

        <!-- Field: Username -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nombre De Usuario"
            label-for="username"
          >
            <b-form-input
              id="username"
              {{usuario.username}}
            />
          </b-form-group>
        </b-col>

        <!-- Field: Full Name -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Nombre Completo"
            label-for="full-name"
          >
            <b-form-input
              id="full-name"
              {{usuario.name}}
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Email"
            label-for="email"
          >
            <b-form-input
              id="email"
              {{usuario.email}}
              type="email"
            />
          </b-form-group>
        </b-col>

        <!-- Field: Phone -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Telefono"
            label-for="phone"
          >
            <b-form-input
              id="phone"
              {{usuario.phone}}
            />
          </b-form-group>
        </b-col>

        <!-- Field: Role -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Ciudad"
            label-for="city"
          >
            <b-form-input
              id="city"
              {{usuario.address.city}}
            />
          </b-form-group>
        </b-col>

        <!-- Field: Email -->
        <b-col
          cols="12"
          md="4"
        >
          <b-form-group
            label="Código Postal"
            label-for="zipcode"
          >
            <b-form-input
              id="zipcode"
              {{usuario.address.zipcode}}
            />
          </b-form-group>
        </b-col>

      </b-row>
    </b-form>
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
import vSelect from 'vue-select'
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
    vSelect,
  },
  data: () => ({
    users: [],
  }),
  created() {
    axios.get('https://fakestoreapi.com/users')
      .then(resp => {
        this.users = resp.data
      })
  },

}
</script>

    <style>

    </style>
