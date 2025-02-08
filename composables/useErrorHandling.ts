export const useErrorHandling = () => {
    const {$toast} = useNuxtApp();
    const handleError = (error: any) => {
        console.error(error);
        $toast('Terjadi kesalahan, coba lagi nanti.', 'error');
    };

    return { handleError };
};