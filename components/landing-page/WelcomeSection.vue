<template>
  <section class="welcome container">
    <div class="welcome-image">
      <svg width="150" height="150" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="30" r="10" fill="#FFC107" /> <!-- Kepala -->
        <rect x="40" y="40" width="20" height="30" fill="#4CAF50" /> <!-- Badan -->
        <line x1="40" y1="40" x2="30" y2="60" stroke="#000" stroke-width="2" /> <!-- Tangan kiri -->
        <line x1="60" y1="40" x2="70" y2="60" stroke="#000" stroke-width="2" /> <!-- Tangan kanan -->
        <line x1="45" y1="70" x2="45" y2="90" stroke="#000" stroke-width="2" /> <!-- Kaki kiri -->
        <line x1="55" y1="70" x2="55" y2="90" stroke="#000" stroke-width="2" /> <!-- Kaki kanan -->
      </svg>
    </div>
    <div class="welcome-content">
      <h2>SELAMAT DATANG</h2>
      <p>Aplikasi berbasis web yang dirancang untuk mempermudah pengelolaan data warga, arus kas, kartu keluarga (KK),
        dan pengajuan surat secara efisien dan terorganisir.</p>
    </div>
  </section>
</template>

<style scoped>
.welcome {
  padding: 80px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.welcome-image {
  width: 40%;
}

.welcome-content {
  width: 55%;
}

.welcome h2 {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.welcome p {
  margin-bottom: 20px;
  color: #666;
}

.benefits {
  margin: 25px 0;
}

.benefit-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.benefit-item:before {
  content: "•";
  color: #7e57c2;
  font-weight: bold;
  margin-right: 10px;
}
</style>