<template>
<div>
    <b-overlay :show="show" rounded="sm" variant="transparent">
        <b-card>
            <b-form-file v-model="file" placeholder="Seleccione el archivo a importar..." />
            <b-card-text class="my-1">
                Archivo seleccionado: <strong>{{ file ? file.name : '' }}</strong>
            </b-card-text>
        </b-card>
        <b-button id="import" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="leerFichero">
            Importar JSON
        </b-button>
    </b-overlay>

    <br />

    <div class="table">
        <table>
            <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>¿Es final?</td>
            </tr>
            <tr v-for="item in datos" :key="item.id">
                <td>{{ item.id }}</td>
                <td>{{ item.name}}</td>
                <td>{{ item.isFinal }}</td>
            </tr>
        </table>
    </div>
</div>
</template>

<script>
import {
    BCard,
    BFormFile,
    BCardText,
    BButton,
    BOverlay
} from "bootstrap-vue";
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import useGraphJwt from "@/auth/jwt/useGraphJwt";
export default {
    data: () => {
        return {
            file: null,
            jsonData: null,
            show: false,
            tituloBtn: 'Importar JSON',
            datos: []
        }
    },
    components: {
        BCard,
        BFormFile,
        BCardText,
        BButton,
        BOverlay
    },
    directives: {
        Ripple
    },
    mounted() {
        this.login();
    },
    methods: {
        importar() {
            this.leerFichero()
            this.crearCategoria()
        },
        leerFichero() {
            this.show = true;
            const reader = new FileReader();
            reader.onload = (event) => {
                this.jsonData = JSON.parse(event.target.result);
                this.datos = this.jsonData.map(item => item)
                this.show = false;
            };
            reader.readAsText(this.file);

            axios.post("", {
                query: `mutation($name: String!, $client: ID!, $isFinal: Boolean!) {
                        createCategory(input:{name: $name, client: $client, isFinal: $isFinal}) {
                            category {
                                id
                            }
                        }
                    }`,
                variables: {
                    "client": "Q2xpZW50Tm9kZTpvUndtRUNLQ1hhQng0SjdB",
                    "name": this.datos[0].name,
                    "isFinal": this.datos[0].isFinal,
                    "type": this.datos[0].type,
                    "quality": this.datos[0].quality,
                    "hasSubtitle": this.datos[0].hasSubtitle,
                    "modeGrid": this.datos[0].modeGrid,
                    "description": this.datos[0].description,
                    "shortDescription": this.datos[0].shortDescription,
                    "friendlyUrl": this.datos[0].friendlyUrl,
                    "seoTitle": this.datos[0].seoTitle,
                    "seoDescription": this.datos[0].seoDescription,
                    "image": this.datos[0].image,
                    "imageMobile": this.datos[0].imageMobile,
                    "background": this.datos[0].background,
                    "backgroundMobile": this.datos[0].backgroundMobile,
                    "backgroundRoot": this.datos[0].backgroundRoot,
                    "backgroundRootMobile": this.datos[0].backgroundRootMobile,
                    "alternativeImage": this.datos[0].alternativeImage,
                    "titleImage": this.datos[0].titleImage,
                    "mediaLocation": this.datos[0].mediaLocation,
                    "imageURL": this.datos[0].imageUrl,
                    "imageMobileUrl": this.datos[0].imageMobileUrl,
                    "backgroundUrl": this.datos[0].backgroundUrl,
                    "backgroundMobileUrl": this.datos[0].backgroundMobileUrl,
                    "backgroundRootUrl": this.datos[0].backgroundRootUrl,
                    "backgroundRootMobileUrl": this.datos[0].backgroundRootMobileUrl,
                    "alternativeImageUrl": this.datos[0].alternativeImageUrl,
                    "titleImageUrl": this.datos[0].titleImageUrl,
                    "trailerUrl": this.datos[0].trailerUrl,
                    "isPremium": this.datos[0].isPremium,
                    "isContentFree": this.datos[0].isContentFree,
                    "trailer": this.datos[0].trailer,
                    "staticUrl": this.datos[0].staticUrl,
                    "isBackgroundBlur": this.datos[0].isBackgroundBlur,
                    "isBackgroundKenBurns": this.datos[0].isBackgroundKenBurns,
                    "isTitle": this.datos[0].isTitle,
                    "contentDesign": this.datos[0].contentDesign,
                    "templateCategory": this.datos[0].templateCategory,
                    "order": this.datos[0].order,
                    "orderType": this.datos[0].orderType,
                    "startSecondChapter": this.datos[0].startSecondChapter,
                    "finishSecondChapter": this.datos[0].finishSecondChapter,
                    "reference": this.datos[0].reference,
                    "technicalDetails": this.datos[0].technicalDetails,
                    "isActive": this.datos[0].isActive
                }
            }).then(result => {
                console.log("Categoria creada correctamente");
            }).catch(err => {
                console.log(err);
            })
        },
        login() {
            useGraphJwt
                .login("", "")
                .then((response) => {
                    const {
                        data,
                        errors
                    } = response.data;

                    this.user = data;
                    if (errors) {
                        console.log(errors[0].message);

                        return;
                    }

                    if (!data.tokenAuth.user.profile) {
                        return;
                    }

                    const ability = {
                        ability: [{
                            action: "manage",
                            subject: "all",
                        }, ],
                    };

                    useGraphJwt.setToken(data.tokenAuth.token);
                    const userData = {
                        ...data.tokenAuth.user,
                        ...ability,
                    };
                    setUserData(userData);
                    localStorage.setItem(
                        "userData",
                        window.btoa(unescape(encodeURIComponent(JSON.stringify(userData))))
                    );

                    this.$ability.update(userData.ability);
                })
                .catch((error) => {});
        }
    }
}
</script>

<style>

</style>
