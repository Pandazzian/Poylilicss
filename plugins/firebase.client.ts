import { initializeApp } from 'firebase/app'
import { getAuth } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getAnalytics } from "firebase/analytics"

export default defineNuxtPlugin(nuxtApp => {
    //const config = useRuntimeConfig()

    const firebaseConfig = {
        apiKey: "AIzaSyBwdgCBVopAK3AVdp43wNGI8JaC5kcG-pc",
        authDomain: "poylilicss.firebaseapp.com",
        projectId: "poylilicss",
        storageBucket: "poylilicss.appspot.com",
        messagingSenderId: "135674424280",
        appId: "1:135674424280:web:c8986e3441fff98169a0ad",
        measurementId: "G-V3HP0N0EK8"
      };

    const app = initializeApp(firebaseConfig)

    const analytics = getAnalytics(app)
    const auth = getAuth(app)
    const firestore = getFirestore(app)
    nuxtApp.vueApp.provide('auth', auth)
    nuxtApp.provide('auth', auth)

    nuxtApp.vueApp.provide('firestore', firestore)
    nuxtApp.provide('firestore', firestore)
})