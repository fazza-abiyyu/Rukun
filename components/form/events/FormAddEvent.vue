<template>
  <div class="p-4 md:p-5 h-fit max-h-full flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
    <!-- Header -->
    <div>
      <h2 class="text-xl font-medium text-gray-800 w-full">Tambah Event</h2>
      <p class="text-sm text-gray-600 mt-1">Buat event baru untuk warga</p>
    </div>
    <!-- End Header -->

    <hr>

    <div class="h-full w-full mt-2">
      <form @submit.prevent="handleSubmit">
        <div class="space-y-4 flex flex-col">
          
          <!-- Event Title -->
          <div class="grid sm:grid-cols-3">
            <label for="title" class="block text-sm font-medium mb-2 w-full">JUDUL EVENT</label>
            <input type="text" id="title"
                   v-model="title"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Masukkan judul event">
          </div>

          <!-- Event Description -->
          <div class="grid sm:grid-cols-3">
            <label for="description" class="block text-sm font-medium mb-2 w-full">DESKRIPSI</label>
            <textarea id="description"
                      v-model="description"
                      rows="4"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Deskripsi event"></textarea>
          </div>

          <!-- Event Date -->
          <div class="grid sm:grid-cols-3">
            <label for="eventDate" class="block text-sm font-medium mb-2 w-full">TANGGAL EVENT</label>
            <input type="date" id="eventDate"
                   v-model="eventDate"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>

          <!-- Event Time -->
          <div class="grid sm:grid-cols-3">
            <label for="eventTime" class="block text-sm font-medium mb-2 w-full">WAKTU EVENT</label>
            <input type="time" id="eventTime"
                   v-model="eventTime"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>

          <!-- Event Location -->
          <div class="grid sm:grid-cols-3">
            <label for="location" class="block text-sm font-medium mb-2 w-full">LOKASI EVENT</label>
            <input type="text" id="location"
                   v-model="location"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Lokasi event">
          </div>

          <!-- Event Category -->
          <div class="grid sm:grid-cols-3">
            <label for="category" class="block text-sm font-medium mb-2 w-full">KATEGORI</label>
            <select id="category" v-model="category"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="">Pilih kategori</option>
              <option value="sosial">Sosial</option>
              <option value="keagamaan">Keagamaan</option>
              <option value="olahraga">Olahraga</option>
              <option value="pendidikan">Pendidikan</option>
              <option value="kesehatan">Kesehatan</option>
              <option value="lingkungan">Lingkungan</option>
              <option value="budaya">Budaya</option>
              <option value="lainnya">Lainnya</option>
            </select>
          </div>

          <!-- Max Participants -->
          <div class="grid sm:grid-cols-3">
            <label for="maxParticipants" class="block text-sm font-medium mb-2 w-full">MAKSIMAL PESERTA</label>
            <input type="number" id="maxParticipants"
                   v-model="maxParticipants"
                   min="1"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                   placeholder="Jumlah maksimal peserta">
          </div>

          <!-- Registration Deadline -->
          <div class="grid sm:grid-cols-3">
            <label for="registrationDeadline" class="block text-sm font-medium mb-2 w-full">BATAS PENDAFTARAN</label>
            <input type="date" id="registrationDeadline"
                   v-model="registrationDeadline"
                   class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
          </div>

          <!-- Event Status -->
          <div class="grid sm:grid-cols-3">
            <label for="status" class="block text-sm font-medium mb-2 w-full">STATUS</label>
            <select id="status" v-model="status"
                    class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none">
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <!-- Requirements/Notes -->
          <div class="grid sm:grid-cols-3">
            <label for="requirements" class="block text-sm font-medium mb-2 w-full">PERSYARATAN/CATATAN</label>
            <textarea id="requirements"
                      v-model="requirements"
                      rows="3"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-orange-500 focus:ring-orange-500 disabled:opacity-50 disabled:pointer-events-none"
                      placeholder="Persyaratan atau catatan tambahan (opsional)"></textarea>
          </div>

          <!-- Submit Button -->
          <div class="space-x-3 self-end">
            <button type="button" @click="clearForm"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
              Reset
            </button>
            <button type="submit"
                    class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-orange-600 text-white hover:bg-orange-700 focus:outline-none focus:bg-orange-700 disabled:opacity-50 disabled:pointer-events-none"
                    :disabled="isLoading || !isFormValid">
              {{ isLoading ? 'Menyimpan...' : 'Buat Event' }}
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import useFetchApi from '~/composables/useFetchApi';

const { $toast } = useNuxtApp();

// Form data
const title = ref<string>('');
const description = ref<string>('');
const eventDate = ref<string>('');
const eventTime = ref<string>('');
const location = ref<string>('');
const category = ref<string>('');
const maxParticipants = ref<number | null>(null);
const registrationDeadline = ref<string>('');
const status = ref<string>('draft');
const requirements = ref<string>('');

// State
const isLoading = ref<boolean>(false);

// Computed
const isFormValid = computed(() => {
  return title.value && 
         description.value && 
         eventDate.value && 
         eventTime.value && 
         location.value && 
         category.value &&
         maxParticipants.value &&
         registrationDeadline.value;
});

// Methods
const clearForm = () => {
  title.value = '';
  description.value = '';
  eventDate.value = '';
  eventTime.value = '';
  location.value = '';
  category.value = '';
  maxParticipants.value = null;
  registrationDeadline.value = '';
  status.value = 'draft';
  requirements.value = '';
};

const handleSubmit = async () => {
  try {
    // Validation
    if (!title.value) {
      $toast('Judul event harus diisi', 'error');
      return;
    }
    
    if (!description.value) {
      $toast('Deskripsi harus diisi', 'error');
      return;
    }
    
    if (!eventDate.value) {
      $toast('Tanggal event harus diisi', 'error');
      return;
    }
    
    if (!eventTime.value) {
      $toast('Waktu event harus diisi', 'error');
      return;
    }
    
    if (!location.value) {
      $toast('Lokasi event harus diisi', 'error');
      return;
    }
    
    if (!category.value) {
      $toast('Kategori harus dipilih', 'error');
      return;
    }
    
    if (!maxParticipants.value || maxParticipants.value < 1) {
      $toast('Maksimal peserta harus diisi dan minimal 1', 'error');
      return;
    }
    
    if (!registrationDeadline.value) {
      $toast('Batas pendaftaran harus diisi', 'error');
      return;
    }
    
    // Check if registration deadline is before event date
    if (new Date(registrationDeadline.value) > new Date(eventDate.value)) {
      $toast('Batas pendaftaran harus sebelum atau pada tanggal event', 'error');
      return;
    }
    
    // Check if event date is not in the past
    if (new Date(eventDate.value) < new Date()) {
      $toast('Tanggal event tidak boleh di masa lalu', 'error');
      return;
    }

    isLoading.value = true;

    // Combine date and time
    const eventDateTime = `${eventDate.value} ${eventTime.value}`;

    // Prepare payload
    const payload = {
      title: title.value,
      description: description.value,
      event_date: eventDateTime,
      location: location.value,
      category: category.value,
      max_participants: maxParticipants.value,
      registration_deadline: registrationDeadline.value,
      status: status.value,
      requirements: requirements.value || null
    };

    // API call
    await useFetchApi('/api/auth/events', {
      method: 'POST',
      body: payload,
    });

    $toast('Event berhasil dibuat!', 'success');
    clearForm();
    await navigateTo('/events');
  } catch (error: any) {
    console.error('Error creating event:', error);
    if (error.data?.message) {
      $toast(error.data.message, 'error');
    } else {
      $toast('Terjadi kesalahan pada server. Silakan coba lagi.', 'error');
    }
  } finally {
    isLoading.value = false;
  }
};

// Set minimum date for event date and registration deadline to today
onMounted(() => {
  const today = new Date().toISOString().split('T')[0];
  const eventDateInput = document.getElementById('eventDate') as HTMLInputElement;
  const registrationDeadlineInput = document.getElementById('registrationDeadline') as HTMLInputElement;
  
  if (eventDateInput) {
    eventDateInput.min = today;
  }
  
  if (registrationDeadlineInput) {
    registrationDeadlineInput.min = today;
  }
});

// Watch event date to update registration deadline max date
watch(eventDate, (newDate) => {
  if (newDate) {
    const registrationDeadlineInput = document.getElementById('registrationDeadline') as HTMLInputElement;
    if (registrationDeadlineInput) {
      registrationDeadlineInput.max = newDate;
    }
  }
});
</script>

<style scoped>
/* Custom styles if needed */
</style>