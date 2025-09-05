import { ref, readonly, nextTick } from 'vue'

export const useSidebar = () => {
  const isSidebarOpen = ref(false)

  const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value
    
    // Trigger Preline overlay toggle manually if needed
    if (process.client) {
      try {
        const sidebar = document.getElementById('hs-application-sidebar')
        if (sidebar) {
          if (isSidebarOpen.value) {
            sidebar.classList.remove('-translate-x-full')
            sidebar.classList.add('translate-x-0', 'hs-overlay-open')
          } else {
            sidebar.classList.add('-translate-x-full')
            sidebar.classList.remove('translate-x-0', 'hs-overlay-open')
          }
        }
      } catch (error) {
        console.warn('Sidebar toggle error:', error);
      }
    }
  }

  const closeSidebar = () => {
    isSidebarOpen.value = false
    if (process.client) {
      try {
        const sidebar = document.getElementById('hs-application-sidebar')
        if (sidebar) {
          sidebar.classList.add('-translate-x-full')
          sidebar.classList.remove('translate-x-0', 'hs-overlay-open')
        }
      } catch (error) {
        console.warn('Sidebar close error:', error);
      }
    }
  }

  const initializeSidebar = () => {
    if (process.client) {
      try {
        // Wait for DOM to be ready
        nextTick(() => {
          if (window.HSStaticMethods?.autoInit) {
            // Re-initialize Preline components
            window.HSStaticMethods.autoInit()
          }
        });
      } catch (error) {
        console.warn('Sidebar initialization error:', error);
      }
    }
  }

  return {
    isSidebarOpen: readonly(isSidebarOpen),
    toggleSidebar,
    closeSidebar,
    initializeSidebar
  }
}
