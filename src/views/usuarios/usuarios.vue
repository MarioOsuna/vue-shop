<template>
<div class="table">
    <!-- Searchbar -->
    <div class="ecommerce-searchbar mt-1">
        <b-row>
            <b-col cols="12">
                <b-input-group class="input-group-merge">
                    <b-form-input v-model="search" placeholder="Buscar Usuario..." class="search-product" />
                    <b-input-group-append is-text>
                        <feather-icon icon="SearchIcon" class="text-muted" />
                    </b-input-group-append>
                </b-input-group>
            </b-col>
        </b-row>
    </div>

    <table>
        <tr>
            <td>Usuario</td>
            <td>Nombre</td>
            <td>Apellido</td>
            <td>Email</td>
            <td>Teléfono</td>
            <td>Editar</td>
        </tr>

        <tr v-for="usuario in filteredUsers" :key="usuario.username">
            <td>{{usuario.username}}</td>
            <td>{{ usuario.name.firstname}}</td>
            <td>{{ usuario.name.lastname }}</td>
            <td>{{usuario.email}}</td>
            <td>{{usuario.phone}}</td>
            <td>
                <b-dropdown variant="link" no-caret :right="$store.state.appConfig.isRTL">
                    <template #button-content>
                        <feather-icon icon="MoreVerticalIcon" size="16" class="align-middle text-body" />
                    </template>
                    <b-dropdown-item :to="{ name: 'users-usuarios-editar', params: { id: usuario.id }} ">
                        <feather-icon icon="EditIcon" />
                        <span class="align-middle ml-50">Editar</span>
                    </b-dropdown-item>
                    <b-dropdown-item>
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">Eliminar</span>
                    </b-dropdown-item>
                </b-dropdown>
            </td>
        </tr>
    </table>

</div>
</template>

<script>
import axios from '@axios'
import {
    BDropdown,
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
} from 'bootstrap-vue'

export default {
    data: () => {
        return {
            users: [],
            search: '',
        }

    },
    components: {
        // BSV
        BDropdown,
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
    },

    created() {
        axios.get('https://fakestoreapi.com/users')
            .then((resp) => {
                this.users = resp.data
            })
    },
    computed: {
        filteredUsers() {
            if (this.users) {
                return this.users.filter((usuario) => {
                    return usuario.username.match(this.search);
                });
            }
            return false;
        }
    }

}
</script>

<style>

</style>
