import './assets/main.css' // Itt importálod a globális stílust

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//Bootstrap: css, js
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
//Icons: css
import "bootstrap-icons/font/bootstrap-icons.min.css"

const app = createApp(App)

//Globális komponensek
import ToastContainer from '@/components/Message/ToastContainer.vue'
import GenericTable from '@/components/Table/GenericTable.vue'
app.component('ToastContainer', ToastContainer);
app.component('GenericTable', GenericTable);

app.use(createPinia())
app.use(router)

app.mount('#app')
