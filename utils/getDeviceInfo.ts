import MobileDetect from 'mobile-detect';

// Menyusun tipe data untuk hasil yang dikembalikan
interface DeviceInfo {
    browser: string;
    deviceType: string;
    os: string;
}

// Fungsi untuk mendapatkan informasi tentang perangkat dan browser
export const getDeviceAndBrowserInfo = (): DeviceInfo => {
    const md = new MobileDetect(window.navigator.userAgent);

    // Mendapatkan nama browser menggunakan userAgent
    const browser = md.userAgent() || 'Unknown Browser';

    // Menentukan jenis perangkat (Mobile, Tablet, atau Desktop)
    const deviceType = md.mobile() ? 'Mobile' : md.tablet() ? 'Tablet' : 'Desktop';

    // Mendapatkan sistem operasi perangkat (iOS, Android, Windows, dll)
    const os = md.os() || 'Unknown OS';

    return {
        browser,
        deviceType,
        os,
    };
};