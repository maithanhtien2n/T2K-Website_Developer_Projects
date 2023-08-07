import { createApp } from "vue";
import { createPinia } from "pinia";

import AppWrapper from "./AppWrapper.vue";
import router from "./services/router";
import "./assets/main.css";

import PrimeVue from "primevue/config";

// PrimeVue Component
import "primevue/resources/themes/lara-light-indigo/theme.css";
import "primevue/resources/primevue.min.css";

// PrimeVue Icon
import "primeicons/primeicons.css";

// PrimeVue CSS
import "/node_modules/primeflex/primeflex.css";

// Components
import CardBody from "@/components/CardBody.vue";
import CardProducts from "@/components/CardProducts.vue";
import Avatar from "@/components/common/Avatar.vue";
import RatingCustom from "@/components/common/RatingCustom.vue";
import BackgroundRemovePopup from "@/components/common/BackgroundRemovePopup.vue";

import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import Galleria from "primevue/galleria";
import Carousel from "primevue/carousel";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Dialog from "primevue/dialog";
import ProgressSpinner from "primevue/progressspinner";
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import FileUpload from "primevue/fileupload";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Editor from "primevue/editor";
import ScrollPanel from "primevue/scrollpanel";
import Image from "primevue/image";
import Rating from "primevue/rating";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import Tooltip from "primevue/tooltip";
import Textarea from "primevue/textarea";
import Checkbox from "primevue/checkbox";
import Listbox from "primevue/listbox";
import ConfirmationService from "primevue/confirmationservice";
import ConfirmDialog from "primevue/confirmdialog";

const app = createApp(AppWrapper);

app.use(createPinia());
app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.directive("tooltip", Tooltip);
app.use(ConfirmationService);

app.component("CardBody", CardBody);
app.component("CardProducts", CardProducts);
app.component("Avatar", Avatar);
app.component("RatingCustom", RatingCustom);
app.component("BackgroundRemovePopup", BackgroundRemovePopup);

app.component("InputText", InputText);
app.component("Password", Password);
app.component("Button", Button);
app.component("Galleria", Galleria);
app.component("Carousel", Carousel);
app.component("Dropdown", Dropdown);
app.component("Calendar", Calendar);
app.component("Dialog", Dialog);
app.component("ProgressSpinner", ProgressSpinner);
app.component("TabView", TabView);
app.component("TabPanel", TabPanel);
app.component("FileUpload", FileUpload);
app.component("DataTable", DataTable);
app.component("Column", Column);
app.component("Editor", Editor);
app.component("ScrollPanel", ScrollPanel);
app.component("Image", Image);
app.component("Rating", Rating);
app.component("Toast", Toast);
app.component("Textarea", Textarea);
app.component("Checkbox", Checkbox);
app.component("Listbox", Listbox);
app.component("ConfirmDialog", ConfirmDialog);

app.mount("#app");
