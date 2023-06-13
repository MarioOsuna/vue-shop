<template>
<div>
    <b-overlay :show="show" rounded="sm" variant="transparent">
        <b-card>
            <b-form-file v-model="file" placeholder="Escoge el archivo a subir" drop-placeholder="Drop file here..." />

            <b-card-text class="my-1">
                Archivo Seleccionado: <strong>{{ file ? file.name : '' }}</strong>
            </b-card-text>
        </b-card>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary">
            Importar JSON
        </b-button>
    </b-overlay>
</div>
</template>

<script>
import {
    BCard,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
    BCardText,
    BFormFile,
} from "bootstrap-vue";
export default {
    components: {
        BCard,
        BFormGroup,
        BFormInput,
        BButton,
        BOverlay,
        BCardText,
        BFormFile,
    },
    data() {
    return {
      file: null,
    }
  },
}
</script>

<style>

</style>
