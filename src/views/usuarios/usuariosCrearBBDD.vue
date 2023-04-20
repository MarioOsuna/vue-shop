<template>
  <div>
    <h2>Crear Usuarios</h2>
    <hr>
    <b-card>
        <b-form > 
            <b-row>
                <b-col cols="12" md="4">
                    <b-form-group label="Usuario" label-for="usuario">
                        <b-form-input id="usuario" v-model="users.usuario" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Nombre" label-for="nombre">
                        <b-form-input id="nombre" v-model="users.nombre" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Apellido" label-for="apellido">
                        <b-form-input id="apellido" v-model="users.apellido" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Email" label-for="email">
                        <b-form-input id="email" v-model="users.email" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Teléfono" label-for="telefono">
                        <b-form-input id="telefono" v-model="users.telefono" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Ciudad" label-for="ciudad">
                        <b-form-input id="ciudad" v-model="users.ciudad" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Dirección" label-for="direccion">
                        <b-form-input id="direccion" v-model="users.direccion" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Número" label-for="numero">
                        <b-form-input id="numero" v-model="users.numero" />
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="4">
                    <b-form-group label="Código Postal" label-for="codigo_postal">
                        <b-form-input id="codigo_postal" v-model="users.codigo_postal" />
                    </b-form-group>
                </b-col>
            </b-row>
        </b-form>
    </b-card>
    <!-- Action Buttons -->
    <b-button type="submit"  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
       v-on:click="agregarRegistro" @click="makeToast('primary')" variant="primary" class="mb-1 mb-sm-0 mr-0 mr-sm-1">
        Crear Usuario
    </b-button>
    <b-button variant="outline-secondary" type="reset">
        Resetear
    </b-button>

</div>
</template>

<script>
import Ripple from 'vue-ripple-directive'
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
import fetch from 'node-fetch';
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
    directives: {
        Ripple
    },
    data: () => {
        return {
            users: [],
        };

    },
    methods: {
        agregarRegistro() {
            console.log(this.users)
            var datosEnviar={usuario:this.users.usuario,
                nombre:this.users.nombre,
                apellido:this.users.apellido,
                email:this.users.email,
                telefono:this.users.telefono,
                ciudad:this.users.ciudad,
                direccion:this.users.direccion,
                numero:this.users.numero,
                codigo_postal:this.users.codigo_postal} 

            fetch('http://localhost/users.php/?insertar=1', {
                method:"POST",
                body:JSON.stringify(datosEnviar)
            })
            .then((resp) => {
                console.log(resp)
                console.log("Actualizado Correctamente")
                console.log(resp)
            })

        },
        makeToast(variant = null) {
            this.$bvToast.toast('La Creación Del Usuario Se Ha Ejecutado Correctamente', {
                title: `Usuario Creado Correctamente`,
                variant,
                solid: false,
            })
        },
    },

}
</script>

<style>

</style>