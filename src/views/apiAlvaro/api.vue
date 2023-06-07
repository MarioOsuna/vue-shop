<template>
<div>
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
    <b-button v-ripple.400="'rgba(255, 255, 255, 0.15)'" variant="primary" @click="getData(id)">
        Exportar JSON
    </b-button>
</div>
</template>

<script>
import axios from '@axios'
import Ripple from 'vue-ripple-directive'
import useGraphJwt from "@/auth/jwt/useGraphJwt";
import {
    BCard,
    BFormGroup,
    BFormInput,
    BButton
} from 'bootstrap-vue'
import {
    forEach
} from 'postcss-rtl/lib/affected-props';
export default {
    data: () => ({
        user: null,
        id: '',
        array: [],
        arrayHijas: [],
        arrayFinal: []
    }),
    components: {
        BCard,
        BFormGroup,
        BFormInput,
        BButton
    },
    directives: {
        Ripple
    },
    mounted() {
        this.login()
    },
    methods: {
        /*getData() {
            axios.post("", {
                query: `{
                    allCategories(id: "${this.id}") {
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
                            }
                        }
                    }
                }`
            }).then(result => {
                console.log(result.data.data.allCategories.edges)
                let array = [];
                result.data.data.allCategories.edges.forEach(element => {
                    array.push(element.node);
                });
                const jsonData = JSON.stringify(array);
                const blob = new Blob([jsonData], {
                    type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'datos.json';
                link.click();
                URL.revokeObjectURL(url);
            }).catch(err => {
                console.log(err)
            })

        }*/
        getData(id, childC = false) {
            console.log(id);
            axios.post("", {
                query: `{
                    allCategories(id: "${id}") {
                        edges {
                            node {
                                id
                                name
                                isFinal
                                type
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
                }`
            }).then(result => {
                result.data.data.allCategories.edges.forEach(parent => {
                    if (!childC) {
                        this.array.push(parent.node);
                    } else {
                        console.log(parent.node)
                        for (let i = 0; i < this.array.length; i++) {
                            for (let x = 0; x < this.array[i].childCategories.edges.length; x++) {
                                console.log(this.array[i].childCategories.edges[x].node.id + " - " + parent.node.id)
                                if (this.array[i].childCategories.edges[x].node.id == parent.node.id) {
                                    this.array[i].childCategories.edges[x].node = parent.node
                                }
                            }
                        }
                    }
                    if (parent.node.isFinal == false) {
                        if (parent.node.childCategories.totalCount > 0) {
                            parent.node.childCategories.edges.forEach(child => {
                                this.getData(child.node.id, childC = true);
                            })
                        }
                    }
                });
                console.log(this.array);

            }).catch(err => {
                console.log(err)
            })
            /*const jsonData = JSON.stringify(this.array);
            const blob = new Blob([jsonData], {
                type: 'application/json'
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'datos.json';
            link.click();
            URL.revokeObjectURL(url);*/
        },
        login() {
            useGraphJwt.login("", "").then(response => {
                const {
                    data,
                    errors
                } = response.data;

                this.user = data
                if (errors) {
                    console.log(errors[0].message)

                    return;
                }

                if (data.tokenAuth.user.isSuperuser) {
                    console.log("isSuperuser")
                    // this.loginErrors = [{ message: "Superusers access denied." }];

                    useGraphJwt.setToken(this.user.tokenAuth.token);

                    return

                }
                if (!data.tokenAuth.user.profile) {

                    return;
                }

                const ability = {
                    ability: [{
                        action: "manage",
                        subject: "all"
                    }]
                };

                useGraphJwt.setToken(data.tokenAuth.token);
                const userData = {
                    ...data.tokenAuth.user,
                    ...ability
                };
                setUserData(userData)
                localStorage.setItem('userData', window.btoa(unescape(encodeURIComponent(JSON.stringify(userData)))))

                this.$ability.update(userData.ability);

            }).catch(error => {})

        }
    }
}
</script>

<style>

</style>
