<template>
<div class="table">
    <table>
        <tr>
            <td>Referencia</td>
            <td>Nombre</td>
            <td>Talla</td>
            <td>Precio</td>
            <td>Cantidad</td>
            <td>Acciones</td>
        </tr>
        <tr v-for="item in products" :key="item.referencia">
            <td>{{ item.referencia }}</td>
            <td>{{ item.nombre }}</td>
            <td>{{ item.talla }}</td>
            <td>{{ item.precio }}</td>
            <td>{{ item.cantidad }}</td>
            <td>
                <b-dropdown variant="link">
                    <b-dropdown-item>
                        <feather-icon icon="TrashIcon" />
                        <span class="align-middle ml-50">Delete</span>
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
    BDropdownItem
} from 'bootstrap-vue'
export default {
    components: {
        BDropdown,
        BDropdownItem
    },
    data: () => {
        return {
            products: []
        }
    },
    created() {
        let BD = 'http://localhost/shop.php/'
        axios.get(BD)
            .then((resp) => {
                this.products = resp.data
            })
    }
}
</script>

<style>

</style>
