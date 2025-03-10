<template>
  <section class="welcome container">
    <div class="welcome-image">
      <!-- Placeholder for 3D character image -->
    </div>
    <div class="welcome-content">
      <h2>Welcome to the exclusive millionaires program.</h2>
      <p>Join our exclusive program designed for ambitious individuals who want to transform their lives and achieve financial freedom.</p>
      <div class="benefits">
        <div class="benefit-item">Benefit number explanation #1</div>
        <div class="benefit-item">Benefit number explanation #2</div>
        <div class="benefit-item">Benefit number explanation #3</div>
      </div>
      <a href="#" class="btn" style="background-color: #7e57c2; color: white; margin-top: 20px;">Apply Now</a>
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