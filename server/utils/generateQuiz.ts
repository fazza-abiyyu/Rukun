import {GoogleGenerativeAI} from '@google/generative-ai';
import type {QuizQuestion} from "~/types/AuthType";

// Tipe untuk respons hasil generasi soal
type GeneratedQuiz = QuizQuestion[];

// Fungsi untuk menghasilkan soal quiz
export const generateQuiz = async (title: string, description: string): Promise<GeneratedQuiz> => {
    // Inisialisasi generative AI dengan API key
    const genAI = new GoogleGenerativeAI('AIzaSyCWeeEOTyjOepsI2N84H4C1Gxl9pZN9_vk');
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    try {
        // Menyusun prompt untuk AI
        const prompt = `buat soal dengan response seperti ini, response seperti ini tanpa ada kalimat lain anggap anda sekarang adalah API tapi tetap kirim dalam format txt biasa tanpa ada markdown code:
        {"question": "Bagaimana Anda menggambarkan 4?",
        "answers": [
            {"answer": "A", "value": 4},
            {"answer": "B", "value": 4},
            {"answer": "C", "value": 2},
            {"answer": "D", "value": 5}
        ]}.
        value dari answer boleh sama jika memungkinkan, dan tidak boleh 0,
        jika answernya adalah A itu berarti paling tinggi
        Buat sebanyak 10-15 soal dengan ketentuan berikut:
        {title: ${title}, description: ${description}}`;

        // Mengirim permintaan untuk menghasilkan soal
        const result = await model.generateContent(prompt);

        // Memastikan respons sudah dalam format teks
        const rawData: any = result.response.text();

        // Pisahkan setiap soal berdasarkan newline (\n)
        const jsonStrings = rawData.split('\n');

        // Mengonversi setiap string menjadi objek JSON
        return jsonStrings.map((jsonStr: any) => {
            try {
                  // Parsing setiap soal
                return JSON.parse(jsonStr) as GeneratedQuiz;
            } catch (error) {
                console.error('Error parsing JSON:', error);
                return null;  // Mengembalikan null jika terjadi kesalahan parsing
            }
        }).filter((item: any) => item !== null) as GeneratedQuiz;  // Filter item yang null dan pastikan tipe yang benar

    } catch (error) {
        throw new Error(`Failed to create quiz: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
};
