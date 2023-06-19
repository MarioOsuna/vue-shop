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
            idPadre: null
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

                console.log(this.datos)

                this.getData(this.datos[0].id);
                console.log(this.array)
            };
            reader.readAsText(this.file);

            for (let i = 0; i < this.array.length; i++){
                if (this.array[i].parent == null){
                    this.crearCategoria(true, this.array[i]);
                }
            }
        },
        getData(id){
            axios
                .post("", {
                    query: `{
                        allCategories(id: "${id}") {
                            edges {
                                node {
                                    id
                                    name
                                    isFinal
                                    type
                                    quality
                                    hasSubtitle
                                    modeGrid
                                    description
                                    shortDescription
                                    friendlyUrl
                                    seoTitle
                                    seoDescription
                                    image
                                    imageMobile
                                    background
                                    backgroundMobile
                                    backgroundRoot
                                    backgroundRootMobile
                                    alternativeImage
                                    titleImage
                                    mediaLocation
                                    imageUrl
                                    imageMobileUrl
                                    backgroundUrl
                                    backgroundMobileUrl
                                    backgroundRootUrl
                                    backgroundRootMobileUrl
                                    alternativeImageUrl
                                    titleImageUrl
                                    trailerUrl
                                    isPremium
                                    isContentFree
                                    trailer
                                    staticUrl
                                    isBackgroundBlur
                                    isBackgroundKenBurns
                                    isTitle
                                    contentDesign
                                    templateCategory
                                    order
                                    orderType
                                    startSecondChapter
                                    finishSecondChapter
                                    reference
                                    technicalDetails
                                    isActive
                                    parent{
                                        id
                                    }
                                    categoryContent {
                                        totalCount
                                        edges {
                                            node {
                                                id
                                            }
                                        }
                                    }
                                    categoryContentOrder {
                                        totalCount
                                        edges{
                                            node {
                                                id
                                            }
                                        }
                                    }
                                    childCategories {
                                        totalCount
                                        edges {
                                            node {
                                                id
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }`,
                })
                .then((result) => {
                    result.data.data.allCategories.edges.forEach((parent) => {
                        this.array.push(parent.node);

                        if (parent.node.isFinal == false) {
                            if (parent.node.childCategories.totalCount > 0) {
                                parent.node.childCategories.edges.forEach((child) => {
                                    this.getData(child.node.id);
                                });
                            }
                        }
                    })
                });
        },
        crearCategoria(a = false, array) {
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
                parent: this.idPadre
            }

            if (a) {
                axios.post("", {
                    query: `mutation($name: String!, $client: ID!, $isFinal: Boolean, $type: CategoryTypeInput, $quality: CategoryQualityInput, $hasSubtitle: Boolean, $modeGrid: Boolean, $description: String, $shortDescription: String, $friendlyUrl: String, $seoTitle: String, $seoDescription: String, $image: String, $imageMobile: Upload, $background: Upload, $backgroundMobile: Upload, $backgroundRoot: Upload, $backgroundRootMobile: Upload, $alternativeImage: Upload, $titleImage: Upload, $mediaLocation: CategoryMediaLocationInput, $imageUrl: String, $imageMobileUrl: String,  $backgroundUrl: String, $backgroundMobileUrl: String, $backgroundRootUrl: String, $backgroundRootMobileUrl: String, $alternativeImageUrl: String, $titleImageUrl: String, $trailerUrl: String, $isPremium: Boolean, $isContentFree: Boolean, $trailer: Upload, $staticUrl: String, $isBackgroundBlur: Boolean, $isBackgroundKenBurns: Boolean, $isTitle: Boolean, $contentDesign: CategoryContentDesignInput, $templateCategory: CategoryTemplateCategoryInput, $order: Int, $orderType: CategoryOrderTypeInput, $startSecondChapter: Int, $finishSecondChapter: Int, $reference: String, $technicalDetails: String, $isActive: Boolean){ 
                                createCategory(input: {name: $name, client: $client, isFinal: $isFinal, type: $type, quality: $quality, hasSubtitle: $hasSubtitle, modeGrid: $modeGrid, description: $description, shortDescription: $shortDescription, friendlyUrl: $friendlyUrl, seoTitle: $seoTitle, seoDescription: $seoDescription, image: $image, imageMobile: $imageMobile, background: $background, backgroundMobile: $backgroundMobile, backgroundRoot: $backgroundRoot, backgroundRootMobile: $backgroundRootMobile, alternativeImage: $alternativeImage, titleImage: $titleImage, mediaLocation: $mediaLocation, imageUrl: $imageUrl, imageMobileUrl: $imageMobileUrl, backgroundUrl: $backgroundUrl, backgroundMobileUrl: $backgroundMobileUrl, backgroundRootUrl: $backgroundRootUrl, backgroundRootMobileUrl: $backgroundRootMobileUrl, alternativeImageUrl: $alternativeImageUrl, titleImageUrl: $titleImageUrl, trailerUrl: $trailerUrl, isPremium: $isPremium, isContentFree: $isContentFree, trailer: $trailer, staticUrl: $staticUrl, isBackgroundBlur: $isBackgroundBlur, isBackgroundKenBurns: $isBackgroundKenBurns, isTitle: $isTitle, contentDesign: $contentDesign, templateCategory: $templateCategory, order: $order, orderType: $orderType,  startSecondChapter: $startSecondChapter, finishSecondChapter: $finishSecondChapter, reference: $reference, technicalDetails: $technicalDetails, isActive: $isActive }){
                                    category{
                                        id
                                    }
                                }
                            }`,
                    variables
                }).then(result => {
                    this.idPadre = result.data.data.createCategory.category.id
                }).catch(err => {
                    console.log(err);
                })
            } else {
                axios.post("", {
                    query: `mutation($name: String!, $client: ID!, $parent: ID, $isFinal: Boolean, $type: CategoryTypeInput, $quality: CategoryQualityInput, $hasSubtitle: Boolean, $modeGrid: Boolean, $description: String, $shortDescription: String, $friendlyUrl: String, $seoTitle: String, $seoDescription: String, $image: String, $imageMobile: Upload, $background: Upload, $backgroundMobile: Upload, $backgroundRoot: Upload, $backgroundRootMobile: Upload, $alternativeImage: Upload, $titleImage: Upload, $mediaLocation: CategoryMediaLocationInput, $imageUrl: String, $imageMobileUrl: String,  $backgroundUrl: String, $backgroundMobileUrl: String, $backgroundRootUrl: String, $backgroundRootMobileUrl: String, $alternativeImageUrl: String, $titleImageUrl: String, $trailerUrl: String, $isPremium: Boolean, $isContentFree: Boolean, $trailer: Upload, $staticUrl: String, $isBackgroundBlur: Boolean, $isBackgroundKenBurns: Boolean, $isTitle: Boolean, $contentDesign: CategoryContentDesignInput, $templateCategory: CategoryTemplateCategoryInput, $order: Int, $orderType: CategoryOrderTypeInput, $startSecondChapter: Int, $finishSecondChapter: Int, $reference: String, $technicalDetails: String, $isActive: Boolean){ 
                                createCategory(input: {name: $name, client: $client, isFinal: $isFinal, type: $type, quality: $quality, hasSubtitle: $hasSubtitle, modeGrid: $modeGrid, description: $description, shortDescription: $shortDescription, friendlyUrl: $friendlyUrl, seoTitle: $seoTitle, seoDescription: $seoDescription, image: $image, imageMobile: $imageMobile, background: $background, backgroundMobile: $backgroundMobile, backgroundRoot: $backgroundRoot, backgroundRootMobile: $backgroundRootMobile, alternativeImage: $alternativeImage, titleImage: $titleImage, mediaLocation: $mediaLocation, imageUrl: $imageUrl, imageMobileUrl: $imageMobileUrl, backgroundUrl: $backgroundUrl, backgroundMobileUrl: $backgroundMobileUrl, backgroundRootUrl: $backgroundRootUrl, backgroundRootMobileUrl: $backgroundRootMobileUrl, alternativeImageUrl: $alternativeImageUrl, titleImageUrl: $titleImageUrl, trailerUrl: $trailerUrl, isPremium: $isPremium, isContentFree: $isContentFree, trailer: $trailer, staticUrl: $staticUrl, isBackgroundBlur: $isBackgroundBlur, isBackgroundKenBurns: $isBackgroundKenBurns, isTitle: $isTitle, contentDesign: $contentDesign, templateCategory: $templateCategory, order: $order, orderType: $orderType,  startSecondChapter: $startSecondChapter, finishSecondChapter: $finishSecondChapter, reference: $reference, technicalDetails: $technicalDetails, isActive: $isActive }){
                                    category{
                                        id
                                    }
                                }
                            }`,
                    variables
                }).then(result => {
                    this.idPadre = result.data.data.createCategory.category.id
                }).catch(err => {
                    console.log(err);
                })
            }
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
