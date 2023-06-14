<template>
<div>
    <b-overlay rounded="sm" variant="transparent">
        <b-card>
            <b-form-file v-model="file" ref="fileInput" placeholder="Escoge el archivo a subir" drop-placeholder="Drop file here..." />
            <b-card-text class="my-1">
                Archivo Seleccionado: <strong>{{ file ? file.name : '' }}</strong>
            </b-card-text>
        </b-card>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="leerFichero">
            Extraer Datos JSON
        </b-button>
    </b-overlay>
    <br>
    <div class="table">
        <h2>Datos del archivo JSON</h2>
        <br>
        <table>
            <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>¿Es Final?</th>
                <th>Descripción</th>
                <th>Descripción Corta</th>
                <th>Calidad</th>
                <th>Tipo</th>
            </tr>
            <tr v-for="item in datos" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.isFinal }}</td>
                <td>{{ item.description }}</td>
                <td>{{ item.shortDescription }}</td>
                <td>{{ item.quality }}</td>
                <td>{{ item.type }}</td>
            </tr>

        </table>

    </div>
    <br>
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="leerFichero">
        Importar JSON
    </b-button>
</div>
</template>

<script>
import Ripple from "vue-ripple-directive";
import {
    BCard,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
    BCardText,
    BFormFile,
} from "bootstrap-vue";
import axios from 'axios';
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
            datos: [],
            jsonData: []
        }
    },
    directives: {
        Ripple,
    },
    methods: {
        leerFichero() {
            if (this.file) {
                const reader = new FileReader();

                reader.onload = (event) => {
                    this.jsonData = JSON.parse(event.target.result)
                    this.datos = this.jsonData.map(item => item)
                    this.crearCategoria()
                    console.log(this.datos)
                };
                reader.readAsText(this.file);
            } else {
                console.log("Error")
            }

        },
        crearCategoria() {
            const variables = {
                name: this.datos[0].name,
                client: "Q2xpZW50Tm9kZTpvUndtRUNLQ1hhQng0SjdB"
                
            };

            axios.post("", {
                    query: `mutation($name: String!, $client: ID!){ 
                                createCategory(input: {name: $name, client: $client }){
                                    category{
                                        id
                                    }
                                }
                            }`,
                    variables
                })
                .then((result) => {
                    console.log("Categoría creada correctamente");
                })
                .catch((err) => {
                    console.log(err);
                });
        }

    }
}
</script>

<style>

</style>
