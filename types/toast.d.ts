import { ToastType } from '~/plugins/toastify';  // Impor tipe dari plugin jika perlu

declare module '#app' {
    interface NuxtApp {
        $toast: (message: string, type?: ToastType) => void;
    }
}
