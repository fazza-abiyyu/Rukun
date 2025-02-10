import "preline/preline";
import { type IStaticMethods } from "preline/preline";
import HSComboBox from "@preline/combobox";

declare global {
    interface Window {
        HSComboBox: typeof HSComboBox; // Menambahkan HSComboBox ke dalam window global
        HSStaticMethods: IStaticMethods; // Menambahkan HSStaticMethods ke dalam window global
    }
}

// Memastikan bahwa kode hanya dijalankan di lingkungan browser
if (typeof window !== 'undefined') {
    window.HSComboBox = HSComboBox; // Menambahkan HSComboBox ke window secara eksplisit
}

// Mendefinisikan plugin Nuxt
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.hook("page:finish", () => {
        // Memastikan HSStaticMethods dan autoInit ada sebelum memanggilnya
        if (window.HSStaticMethods?.autoInit) {
            window.HSComboBox.autoInit(); // Memanggil autoInit dari HSComboBox
            window.HSStaticMethods.autoInit(); // Memanggil autoInit dari HSStaticMethods
        }
    });
});