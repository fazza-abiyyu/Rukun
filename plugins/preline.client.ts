import "preline/preline";
import { type IStaticMethods } from "preline/preline";
import HSComboBox from "@preline/combobox";

declare global {
    interface Window {
        HSComboBox: typeof HSComboBox;
        HSStaticMethods: IStaticMethods;
    }
}

// Mendefinisikan plugin Nuxt
export default defineNuxtPlugin((nuxtApp) => {
    // Hanya jalankan di client side
    if (!process.client) return;

    // Set global variables
    if (typeof window !== 'undefined') {
        window.HSComboBox = HSComboBox;
    }

    // Fungsi untuk safe initialization
    const initPreline = () => {
        try {
            // Tunggu sampai DOM ready
            if (document.readyState !== 'complete') {
                window.addEventListener('load', initPreline);
                return;
            }

            // Pastikan Preline tersedia
            if (window.HSStaticMethods?.autoInit) {
                // Cleanup existing overlays first
                const overlays = document.querySelectorAll('.hs-overlay');
                overlays.forEach(overlay => {
                    overlay.classList.remove('hs-overlay-open');
                });

                // Initialize components
                window.HSComboBox?.autoInit?.();
                window.HSStaticMethods.autoInit();
                
                console.log('Preline initialized successfully');
            }
        } catch (error) {
            console.warn('Preline initialization skipped due to error:', error);
        }
    };

    // Initialize on app mounted
    nuxtApp.hook("app:mounted", () => {
        setTimeout(initPreline, 200);
    });

    // Re-initialize on page changes
    nuxtApp.hook("page:finish", () => {
        setTimeout(initPreline, 100);
    });
});