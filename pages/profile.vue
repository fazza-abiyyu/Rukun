<template>
  <div class="max-w-[85rem] mx-auto p-6">
    <div v-if="isLoading" class="flex justify-center items-center space-x-2">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-teal-500 animate-spin" viewBox="0 0 24 24"
           fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-opacity=".25" class="opacity-75"/>
        <path d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12Z" fill="currentColor"/>
      </svg>
      <span class="text-teal-500">Loading...</span>
    </div>
    <div class="p-6 mt-10 h-fit flex flex-col bg-white border shadow-sm rounded-xl space-y-4">
      <!-- Header -->
      <div>
        <h2 class="text-xl font-medium text-gray-800 w-full">Your Profile</h2>
      </div>
      <!-- End Header -->

      <hr>

      <div class="h-full w-full mt-2 overflow-y-auto">
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4 flex flex-col">
            <!-- Full Name Input -->
            <div class="grid sm:grid-cols-3">
              <label for="name" class="block text-sm font-medium mb-2 w-full">Full Name</label>
              <input type="text" id="name"
                     v-model="name"
                     :disabled="!editable"
                     class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                     placeholder="Enter your full name">
            </div>

            <!-- Email Input -->
            <div class="grid sm:grid-cols-3">
              <label for="email" class="block text-sm font-medium mb-2 w-full">Email</label>
              <input type="email" id="email"
                     v-model="email"
                     :disabled="true"
                     class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                     placeholder="Enter your email">
            </div>

            <!-- Date of Birth Input -->
            <div class="grid sm:grid-cols-3">
              <label for="bod" class="block text-sm font-medium mb-2 w-full">Date of Birth</label>
              <input type="date" id="bod"
                     v-model="bod"
                     :disabled="!editable"
                     class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
            </div>

            <!-- Gender Input -->
            <div class="grid sm:grid-cols-3">
              <label for="gender" class="block text-sm font-medium mb-2 w-full">Gender</label>
              <select id="gender"
                      v-model="gender"
                      :disabled="!editable"
                      class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                <option value="">Select your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <!-- phoneNumber Number Input -->
            <div class="grid sm:grid-cols-3">
              <label for="phoneNumber" class="block text-sm font-medium mb-2 w-full">Phone</label>
              <input type="text" id="phoneNumber"
                     v-model="phoneNumber"
                     :disabled="!editable"
                     class="col-span-2 py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                     placeholder="Enter your number">
            </div>

            <div class="space-x-3 flex justify-end">
              <template v-if="editable">
                <button type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-600 hover:text-white focus:outline-none focus:bg-teal-600"
                        @click="editable = !editable"
                        :disabled="isLoading">
                  Cancel
                </button>
                <button type="submit"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 bg-teal-500 text-white hover:bg-teal-600 focus:outline-none focus:bg-teal-600"
                        :disabled="isLoading">
                  {{ isLoading ? 'Load' : 'Save' }}
                </button>
              </template>
              <template v-else>
                <button type="button"
                        class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-teal-500 text-teal-500 hover:bg-teal-600 hover:text-white focus:outline-none focus:bg-teal-600"
                        @click="editable = !editable"
                        :disabled="isLoading">
                  Edit
                </button>
              </template>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const {useAuthUser} = useAuth()
const user = computed(() => useAuthUser().value)

const {$toast} = useNuxtApp()

const editable = ref(false)
const name = ref<string | null>(null)
const email = ref<string | null>(null)
const bod = ref<string | null>(null) // Date of Birth
const gender = ref<string | null>(null) // Gender
const phoneNumber = ref<string | null>(null)
const isLoading = ref<boolean>(false)

const validateForm = () => {
  if (!name.value || !email.value || !bod.value || !gender.value || !phoneNumber.value) {
    $toast('Please complete all fields.', 'error')
    return false
  }
  return true
}

const handleSubmit = async () => {
  try {
    isLoading.value = true
    if (!validateForm()) return
    const formattedBod = new Date(bod.value as string).toISOString();
    await useFetchApi('/api/auth/profile', {
      method: 'PUT',
      body: {
        name: name.value,
        email: email.value,
        bod: formattedBod,
        gender: gender.value,
        phoneNumber: phoneNumber.value,
      }
    })

    $toast('Successfully updated profile.', 'success')
    editable.value = false  // Set to non-editable after save
  } catch (error) {
    console.error(error)
    $toast('Failed to update profile.', 'error')
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  if (!user.value) return navigateTo('/')
  name.value = user.value?.full_name
  email.value = user.value?.email
  if (user.value?.profile?.length > 0) {
    phoneNumber.value = user.value?.profile[0]?.phoneNumber
    bod.value = new Date(user.value?.profile[0]?.bod).toISOString().split('T')[0]
    gender.value = user.value?.profile[0]?.gender
  }
})
</script>
