<template>
  <div class="fixed bottom-4 right-4 z-[99999]">
    <button
        type="button"
        class="m-1 ms-0 py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
        aria-haspopup="dialog"
        aria-expanded="false"
        aria-controls="hs-offcanvas-right"
        data-hs-overlay="#hs-offcanvas-right"
    >
      <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="lucide lucide-bot-message-square"
      >
        <path d="M12 6V2H8" />
        <path d="m8 18-4 4V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2Z" />
        <path d="M2 12h2" />
        <path d="M9 11v2" />
        <path d="M15 11v2" />
        <path d="M20 12h2" />
      </svg>
    </button>

    <div
        id="hs-offcanvas-right"
        class="hs-overlay hs-overlay-open:translate-x-0 hidden translate-x-full fixed top-0 end-0 transition-all duration-300 transform h-screen max-w-md w-[80%] z-[80] bg-white border-s"
        role="dialog"
        tabindex="-1"
        aria-labelledby="hs-offcanvas-right-label"
    >
      <div class="p-4 h-full overflow-y-auto">
        <div class="h-fit flex flex-col">
          <!-- Chat Box -->
          <div class="chat-box overflow-auto flex-1 mb-14">
            <div v-for="(message, index) in messages" :key="index" class="chat-message">
              <div :class="message.isUser ? 'text-right' : 'text-left'">
                <div
                    :class="message.isUser ? 'bg-teal-600 text-white p-4 rounded-2xl' : 'bg-gray-100 text-gray-800 p-4 rounded-2xl border border-gray-200'"
                    class="inline-block max-w-lg"
                >
                  <p class="text-sm">{{ message.text }}</p>
                </div>
              </div>
            </div>
            <div class="chat-message" v-if="isTyping">
              <div class="text-left">
                <div
                    class="bg-gray-100 text-gray-800 p-4 rounded-2xl border border-gray-200 inline-block max-w-lg"
                >
                  <p class="text-sm italic">
                    Mengetik...
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Input Area -->
          <div class="input-area flex items-center space-x-2 sticky bottom-0 bg-white border-t border-gray-200 py-2 px-4">
            <textarea
                v-model="userInput"
                type="text"
                cols="3"
                placeholder="Type a message..."
                class="w-full p-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-teal-500 focus:ring-teal-500 disabled:opacity-50 disabled:pointer-events-none"
                @keyup.enter="sendMessage"
            />
            <button
                @click="sendMessage"
                class="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-teal-600 text-white hover:bg-teal-700 focus:outline-none focus:bg-teal-700 disabled:opacity-50 disabled:pointer-events-none"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Set up the GoogleGenerativeAI client
const genAI = new GoogleGenerativeAI('AIzaSyCWeeEOTyjOepsI2N84H4C1Gxl9pZN9_vk');
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

// Chat state
const userInput = ref('');
const messages = ref([
  { text: 'Hai aku HEALINGAI! Aku lagi ngobrolin kesehatan mental nih, ada yang mau gabung ngobrol? Atau mungkin ada info menarik tentang kesehatan mental yang bisa kita share bareng?', isUser: false },
]);
const isTyping = ref<boolean>(false);

// Function to send a message to the AI and get a response
const sendMessage = async () => {
  if (userInput.value.trim()) {
    // Add user's message to chat
    messages.value.push({ text: userInput.value, isUser: true });

    try {
      // Get AI's response
      const response = await getAIResponse(userInput.value);

      // Add AI's response to chat
      messages.value.push({ text: response, isUser: false });
    } catch (error) {
      console.error('Error fetching AI response:', error);
      messages.value.push({
        text: 'Sorry, there was an error. Please try again later.',
        isUser: false,
      });
    }
  }
};

// Function to fetch AI response from the Google Generative AI API
const getAIResponse = async (input: string): Promise<string> => {
  try {
    isTyping.value = true;
    userInput.value = '';
    const result = await model.generateContent("Jawab kamu sebagai HEALINGAI. Response ini dengan text chatting biasa tanpa markdown dan pertanyaan di luar topik kesehatan mental anda harus jawab 'Saya hanya mengerti tentang kesehatan mental': "+input);
    return result.response.text(); // Return the AI's response text
  } catch (error) {
    console.error('Error with Google Generative AI:', error);
    return 'I am sorry, I could not process your request.';
  } finally {
    isTyping.value = false;
  }
};
</script>

<style scoped>
.chat-box {
  overflow-y: auto;
}

.chat-message {
  margin-bottom: 8px;
}

.input-area {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: #fff;
  border-top: 1px solid #ddd;
}
</style>