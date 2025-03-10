<template>
  <section class="hero">
    <div class="container hero-content">
      <div class="hero-text">
        <h1>Change your life today.</h1>
        <p>The program for those who are serious.</p>
        <a href="#" class="btn" style="background-color: white; color: #7e57c2;">Apply Now</a>
      </div>
      <div class="hero-image">
        <!-- Placeholder for 3D character image -->
      </div>
    </div>
    <div class="decoration decoration-1"></div>
    <div class="decoration decoration-2"></div>
  </section>
</template>

<style scoped>
.hero {
  background-color: #7e57c2;
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.hero-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.hero-text {
  width: 50%;
}

.hero h1 {
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 15px;
  line-height: 1.2;
}

.hero p {
  margin-bottom: 25px;
  font-size: 1rem;
}

.hero-image {
  width: 45%;
  position: relative;
}

.decoration-1 {
  top: 0;
  right: 0;
  width: 200px;
  height: 200px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.decoration-2 {
  bottom: 0;
  left: 0;
  width: 150px;
  height: 150px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
</style>