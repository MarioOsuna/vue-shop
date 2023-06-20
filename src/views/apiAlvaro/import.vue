<template>
<div>
    <b-card>
        <b-form-file v-model="file" placeholder="Seleccione el archivo a importar..." />
        <b-card-text class="my-1">
            Archivo seleccionado: <strong>{{ file ? file.name : '' }}</strong>
        </b-card-text>
    </b-card>
    <b-button id="import" v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="leerFichero">
        Importar JSON
    </b-button>

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
    BButton
} from "bootstrap-vue";
import Ripple from 'vue-ripple-directive'
import axios from '@axios'
import useGraphJwt from "@/auth/jwt/useGraphJwt";
export default {
    data: () => {
        return {
            file: null,
            jsonData: null,
            tituloBtn: 'Importar JSON',
            datos: [],
            array: [],
            idContent: null,
            idResource: null
        }
    },
    components: {
        BCard,
        BFormFile,
        BCardText,
        BButton
    },
    directives: {
        Ripple
    },
    mounted() {
        this.login();
    },
    methods: {
        leerFichero() {
            const reader = new FileReader();
            reader.onload = (event) => {
                this.jsonData = JSON.parse(event.target.result);
                this.datos = this.jsonData.map(item => item)
                this.comprobarCategoria(this.datos[0], true)
            };

            reader.readAsText(this.file);
        },
        comprobarCategoria(array, a = false, padre) {
            if (a) {
                this.crearCategoria(true, array) // CREACIÓN PADRE
                if (array.isFinal == false) { // SI TIENE HIJAS
                    if (array.childCategories.totalCount > 0) { // SI TIENE HIJAS
                        array.childCategories.edges.forEach((child) => { // RECORREMOS HIJAS Y SACAMOS INFO
                            this.comprobarCategoria(child.node, false, array.id)
                        });
                    }
                }
            } else {
                if (array.parent.id == padre) {
                    console.log("PADRES IGUALES")
                }
                if (array.isFinal == false) {
                    if (array.childCategories.totalCount > 0) {
                        array.childCategories.edges.forEach((child) => {
                            this.comprobarCategoria(child.node, false)
                        });
                    }
                }
            }
        },
        crearCategoria(a = false, array, padre) {
            let variables = {
                client: "Q2xpZW50Tm9kZTpvUndtRUNLQ1hhQng0SjdB",
                name: array.name,
                isFinal: array.isFinal,
                type: array.type,
                quality: array.quality,
                hasSubtitle: array.hasSubtitle,
                modeGrid: array.modeGrid,
                description: array.description,
                shortDescription: array.shortDescription,
                friendlyUrl: array.friendlyUrl,
                seoTitle: array.seoTitle,
                seoDescription: array.seoDescription,
                image: array.image,
                imageMobile: array.imageMobile,
                background: array.background,
                backgroundMobile: array.backgroundMobile,
                backgroundRoot: array.backgroundRoot,
                backgroundRootMobile: array.backgroundRootMobile,
                alternativeImage: array.alternativeImage,
                titleImage: array.titleImage,
                mediaLocation: array.mediaLocation,
                imageURL: array.imageUrl,
                imageMobileUrl: array.imageMobileUrl,
                backgroundUrl: array.backgroundUrl,
                backgroundMobileUrl: array.backgroundMobileUrl,
                backgroundRootUrl: array.backgroundRootUrl,
                backgroundRootMobileUrl: array.backgroundRootMobileUrl,
                alternativeImageUrl: array.alternativeImageUrl,
                titleImageUrl: array.titleImageUrl,
                trailerUrl: array.trailerUrl,
                isPremium: array.isPremium,
                isContentFree: array.isContentFree,
                trailer: array.trailer,
                staticUrl: array.staticUrl,
                isBackgroundBlur: array.isBackgroundBlur,
                isBackgroundKenBurns: array.isBackgroundKenBurns,
                isTitle: array.isTitle,
                contentDesign: array.contentDesign,
                templateCategory: array.templateCategory,
                order: array.order,
                orderType: array.orderType,
                startSecondChapter: array.startSecondChapter,
                finishSecondChapter: array.finishSecondChapter,
                reference: array.reference,
                technicalDetails: array.technicalDetails,
                isActive: array.isActive,
                parent: padre
            }

            if (a) {
                axios.post("", {
                    query: `mutation($name: String!, $client: ID!, $isFinal: Boolean, $type: CategoryTypeInput, $quality: CategoryQualityInput, $hasSubtitle: Boolean, $modeGrid: Boolean, $description: String, $shortDescription: String, $friendlyUrl: String, $seoTitle: String, $seoDescription: String, $image: String, $imageMobile: Upload, $background: Upload, $backgroundMobile: Upload, $backgroundRoot: Upload, $backgroundRootMobile: Upload, $alternativeImage: Upload, $titleImage: Upload, $mediaLocation: CategoryMediaLocationInput, $imageUrl: String, $imageMobileUrl: String,  $backgroundUrl: String, $backgroundMobileUrl: String, $backgroundRootUrl: String, $backgroundRootMobileUrl: String, $alternativeImageUrl: String, $titleImageUrl: String, $trailerUrl: String, $isPremium: Boolean, $isContentFree: Boolean, $trailer: Upload, $staticUrl: String, $isBackgroundBlur: Boolean, $isBackgroundKenBurns: Boolean, $isTitle: Boolean, $contentDesign: CategoryContentDesignInput, $templateCategory: CategoryTemplateCategoryInput, $order: Int, $orderType: CategoryOrderTypeInput, $startSecondChapter: Int, $finishSecondChapter: Int, $reference: String, $technicalDetails: String, $isActive: Boolean){ 
                                createCategory(input: {name: $name, client: $client, isFinal: $isFinal, type: $type, quality: $quality, hasSubtitle: $hasSubtitle, modeGrid: $modeGrid, description: $description, shortDescription: $shortDescription, friendlyUrl: $friendlyUrl, seoTitle: $seoTitle, seoDescription: $seoDescription, image: $image, imageMobile: $imageMobile, background: $background, backgroundMobile: $backgroundMobile, backgroundRoot: $backgroundRoot, backgroundRootMobile: $backgroundRootMobile, alternativeImage: $alternativeImage, titleImage: $titleImage, mediaLocation: $mediaLocation, imageUrl: $imageUrl, imageMobileUrl: $imageMobileUrl, backgroundUrl: $backgroundUrl, backgroundMobileUrl: $backgroundMobileUrl, backgroundRootUrl: $backgroundRootUrl, backgroundRootMobileUrl: $backgroundRootMobileUrl, alternativeImageUrl: $alternativeImageUrl, titleImageUrl: $titleImageUrl, trailerUrl: $trailerUrl, isPremium: $isPremium, isContentFree: $isContentFree, trailer: $trailer, staticUrl: $staticUrl, isBackgroundBlur: $isBackgroundBlur, isBackgroundKenBurns: $isBackgroundKenBurns, isTitle: $isTitle, contentDesign: $contentDesign, templateCategory: $templateCategory, order: $order, orderType: $orderType,  startSecondChapter: $startSecondChapter, finishSecondChapter: $finishSecondChapter, reference: $reference, technicalDetails: $technicalDetails, isActive: $isActive }){
                                    category {
                                        id
                                    }
                                }
                            }`,
                    variables
                }).then(result => {
                    if (!array.isFinal) {
                        if (array.childCategories.totalCount > 0) {
                            array.childCategories.edges.forEach(child => {
                                this.crearCategoria(false, child.node, result.data.data.createCategory.category.id)
                            })
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                axios.post("", {
                    query: `mutation($name: String!, $client: ID!, $parent: ID, $isFinal: Boolean, $type: CategoryTypeInput, $quality: CategoryQualityInput, $hasSubtitle: Boolean, $modeGrid: Boolean, $description: String, $shortDescription: String, $friendlyUrl: String, $seoTitle: String, $seoDescription: String, $image: String, $imageMobile: Upload, $background: Upload, $backgroundMobile: Upload, $backgroundRoot: Upload, $backgroundRootMobile: Upload, $alternativeImage: Upload, $titleImage: Upload, $mediaLocation: CategoryMediaLocationInput, $imageUrl: String, $imageMobileUrl: String,  $backgroundUrl: String, $backgroundMobileUrl: String, $backgroundRootUrl: String, $backgroundRootMobileUrl: String, $alternativeImageUrl: String, $titleImageUrl: String, $trailerUrl: String, $isPremium: Boolean, $isContentFree: Boolean, $trailer: Upload, $staticUrl: String, $isBackgroundBlur: Boolean, $isBackgroundKenBurns: Boolean, $isTitle: Boolean, $contentDesign: CategoryContentDesignInput, $templateCategory: CategoryTemplateCategoryInput, $order: Int, $orderType: CategoryOrderTypeInput, $startSecondChapter: Int, $finishSecondChapter: Int, $reference: String, $technicalDetails: String, $isActive: Boolean){ 
                                createCategory(input: {name: $name, client: $client, parent: $parent, isFinal: $isFinal, type: $type, quality: $quality, hasSubtitle: $hasSubtitle, modeGrid: $modeGrid, description: $description, shortDescription: $shortDescription, friendlyUrl: $friendlyUrl, seoTitle: $seoTitle, seoDescription: $seoDescription, image: $image, imageMobile: $imageMobile, background: $background, backgroundMobile: $backgroundMobile, backgroundRoot: $backgroundRoot, backgroundRootMobile: $backgroundRootMobile, alternativeImage: $alternativeImage, titleImage: $titleImage, mediaLocation: $mediaLocation, imageUrl: $imageUrl, imageMobileUrl: $imageMobileUrl, backgroundUrl: $backgroundUrl, backgroundMobileUrl: $backgroundMobileUrl, backgroundRootUrl: $backgroundRootUrl, backgroundRootMobileUrl: $backgroundRootMobileUrl, alternativeImageUrl: $alternativeImageUrl, titleImageUrl: $titleImageUrl, trailerUrl: $trailerUrl, isPremium: $isPremium, isContentFree: $isContentFree, trailer: $trailer, staticUrl: $staticUrl, isBackgroundBlur: $isBackgroundBlur, isBackgroundKenBurns: $isBackgroundKenBurns, isTitle: $isTitle, contentDesign: $contentDesign, templateCategory: $templateCategory, order: $order, orderType: $orderType,  startSecondChapter: $startSecondChapter, finishSecondChapter: $finishSecondChapter, reference: $reference, technicalDetails: $technicalDetails, isActive: $isActive }){
                                    category {
                                        id
                                    }
                                }
                            }`,
                    variables
                }).then(result => {
                    if (!array.isFinal) {
                        if (array.childCategories.totalCount > 0) {
                            array.childCategories.edges.forEach(child => {
                                this.crearCategoria(false, child.node, result.data.data.createCategory.category.id)
                            })
                        }
                    } else {
                        if (array.categoryContentOrder.totalCount > 0) {
                            for (let i = 0; i < array.categoryContentOrder.edges.length; i++) {
                                for (let x = 0; x < array.categoryContentOrder.edges[i].node.content.resources.edges.length; x++) {
                                    this.creteContent(array.categoryContentOrder.edges[i].node.content, array.categoryContentOrder.edges[i].node.content.resources.edges[x].node, result.data.data.createCategory.category.id)
                                }
                            }
                        } else {
                            for (let i = 0; i < array.categoryContent.edges.length; i++) {
                                for (let x = 0; x < array.categoryContent.edges[i].node.resources.edges.length; x++) {
                                    this.creteContent(array.categoryContent.edges[i].node, array.categoryContent.edges[i].node.resources.edges.node, result.data.data.createCategory.category.id)
                                }

                            }
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })

            }
        },
        creteContent(arrayCont, arrayRes, categoria) {
            console.log(arrayCont)
            let variablesContent = {
                client: "Q2xpZW50Tm9kZTpvUndtRUNLQ1hhQng0SjdB",
                name: arrayCont.name,
                isActive: arrayCont.isActive,
                description: arrayCont.description,
                shortDescription: arrayCont.shortDescription,
                duration: arrayCont.duration,
                maxViews: arrayCont.maxViews,
                imageUrl: arrayCont.imageUrl,
                alternativeImageUrl: arrayCont.alternativeImageUrl,
                imageMobileUrl: arrayCont.imageMobileUrl,
                backgroundUrl: arrayCont.backgroundUrl,
                backgroundMobileUrl: arrayCont.backgroundMobileUrl,
                titleImageUrl: arrayCont.titleImageUrl,
                trailerUrl: arrayCont.trailerUrl,
                quality: arrayCont.quality,
                hasSubtitle: arrayCont.hasSubtitle,
                state: arrayCont.state,
                comment: arrayCont.comment,
                isPremium: arrayCont.isPremium,
                type: arrayCont.type,
                friendlyUrl: arrayCont.friendlyUrl,
                seoTitle: arrayCont.seoTitle,
                seoDescription: arrayCont.seoDescription,
                trailer: arrayCont.trailer,
                staticUrl: arrayCont.staticUrl,
                staticMediumUrl: arrayCont.staticMediumUrl,
                staticTinyUrl: arrayCont.staticTinyUrl,
                staticTrailerUrl: arrayCont.staticTrailerUrl,
                hashtag: arrayCont.hashtag,
                isBackgroundBlur: arrayCont.isBackgroundBlur,
                isBackgroundKenBurns: arrayCont.isBackgroundKenBurns,
                reference: arrayCont.reference,
                unfitTv: arrayCont.unfitTv,
                isDownload: arrayCont.isDownload,
                nDisplay: arrayCont.nDisplay,
                isAds: arrayCont.isAds,
                optaId: arrayCont.optaId,
                categories: categoria
            }
            axios.post("", {
                query: `mutation ($name: String!, $client: ID, $categories: [ID]) {
                            createContents(input: {name: $name, client: $client, categories: $categories }) {
                                content {
                                    id
                                }
                            }
                        }`,
                variablesContent
            }).then(result => {
                this.idContent = result.data.data.createContents.content.id
            }).catch(err => {
                console.log(err);
            })

            let variableResource = {
                client: "Q2xpZW50Tm9kZTpvUndtRUNLQ1hhQng0SjdB",
                name: arrayRes.name,
                description: arrayRes.description,
                type: arrayRes.type,
            }
            axios.post("", {
                query: `mutation($client: ID!, $name: String!, $description: String, $type: ResourceTypeInput){
                            createResource(input: {client: $client, name: $name, description: $description, type: $type}){
                                resource {
                                    id
                                }
                            }
                        }`,
                variableResource
            }).then(result => {
                this.idResource = result.data.data.createResource.resource.id
            }).catch(err => {
                console.log(err);
            })

            let variableContentResource = {
                content: this.idContent,
                resource: this.idResource
            }
            axios.post("", {
                query: `mutation($content: ID, $resource: ID) {
                            createContentsResource(input: {content: $content, resource: $resource}) {
                                contentResource2 {
                                    id
                                }
                            }
                        }`,
                variableContentResource
            }).then(result => {
                
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
