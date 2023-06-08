<template>
<div>
    <b-overlay :show="show" rounded="sm" variant="transparent">
        <b-card>
            <b-form-group label="API KEY" label-for="apikey">
                <b-form-input id="apikey" value="oRwmECKCXaBx4J7A" disabled />
            </b-form-group>
            <b-form-group label="CLIENT ID" label-for="clientid">
                <b-form-input id="clientid" value="F434ZsYAF0cQheSc6DCs69iIz1vXx1fA9SSS0tp2" disabled />
            </b-form-group>
            <b-form-group label="USERNAME" label-for="username">
                <b-form-input id="username" value="rotary" disabled />
            </b-form-group>
            <b-form-group label="PASSWORD" label-for="password">
                <b-form-input id="password" value="LlaveAzul321*" disabled />
            </b-form-group>
            <b-form-group label="ID CATEGORIA" label-for="categoria">
                <b-form-input id="categoria" placeholder="ID CATEGORIA" v-model="id" />
            </b-form-group>
        </b-card>
        <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="getCategory(id)">
            Exportar JSON
        </b-button>
    </b-overlay>
</div>
</template>

<script>
import axios from "@axios";
import Ripple from "vue-ripple-directive";
import useGraphJwt from "@/auth/jwt/useGraphJwt";
import {
    BCard,
    BFormGroup,
    BFormInput,
    BButton,
    BOverlay,
} from "bootstrap-vue";
import {
    forEach
} from "postcss-rtl/lib/affected-props";
export default {
    data: () => ({
        user: null,
        id: "",
        array: [],
        arrayFinal: [],
        show: false,
    }),
    components: {
        BCard,
        BFormGroup,
        BFormInput,
        BButton,
        BOverlay,
    },
    directives: {
        Ripple,
    },
    mounted() {
        this.login();
    },
    methods: {
        getCategory(id) {
            this.executionCount = this.executionCount || 0;
            this.executionCount++;
            axios.post("", {
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
                                lft
                                rght
                                treeId
                                level
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
                                    this.getCategory(child.node.id);
                                });
                            }
                        }
                    });

                    // RECORRO HIJAS Y VOY ANIDANDO
                    for (let i = 1; i < this.array.length; i++) {
                        if (!this.array[i].isFinal) {
                            if (this.array[i].childCategories.totalCount > 0) {
                                for (let x = 0; x < this.array[i].childCategories.edges.length; x++) {
                                    for (let k = 0; k < this.array.length; k++) {
                                        if (this.array[i].childCategories.edges[x].node.id == this.array[k].id) {
                                            this.array[i].childCategories.edges[x].node = this.array[k];
                                        }
                                    }
                                }
                            }
                        }
                    }

                    // AÑADO HIJAS ANIDADAS DENTRO DE LA PADRE
                    for (let i = 0; i < this.array.length; i++) {
                        for (let x = 0; x < this.array[0].childCategories.edges.length; x++) {
                            if (this.array[0].childCategories.edges[x].node.id == this.array[i].id) {
                                this.array[0].childCategories.edges[x].node = this.array[i];
                            }
                        }
                    }

                    // CUANDO ACABE DE EJECUTAR, DESCARGO EL ARCHIVO .JSON
                    if (this.executionCount === this.array.length) {
                        this.arrayFinal[0] = this.array[0];
                        const jsonData = JSON.stringify(this.arrayFinal);
                        const blob = new Blob([jsonData], {
                            type: "application/json",
                        });
                        const url = URL.createObjectURL(blob);
                        const link = document.createElement("a");
                        link.href = url;
                        link.download = "Categoria " + this.arrayFinal[0].name;
                        link.click();
                        URL.revokeObjectURL(url);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
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
        },
    },
};
</script>

<style>
</style>
