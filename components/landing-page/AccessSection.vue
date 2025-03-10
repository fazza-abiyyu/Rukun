<template>
  <section class="access">
    <div class="container">
      <h2>Gain access</h2>
      <h3>to these exclusive techniques.</h3>
      <p>Discover the proven methods that have helped our members achieve remarkable success.</p>

      <div class="techniques">
        <div class="technique" v-for="technique in techniques" :key="technique.id">
          <div class="technique-icon">
            <!-- Placeholder for icon -->
          </div>
          <h3>{{ technique.title }}</h3>
          <p>{{ technique.description }}</p>
        </div>
      </div>

      <div class="icons-nav">
        <div class="icon-item" v-for="n in 5" :key="n">
          <!-- Placeholder for icon -->
        </div>
      </div>
    </div>
    <div class="wave"></div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      techniques: [
        {
          id: 1,
          title: 'Special Secret #1',
          description: 'Learn the strategies that successful millionaires use in their daily routines.'
        },
        {
          id: 2,
          title: 'Special Secret #2',
          description: 'Discover how to leverage your resources for maximum financial gain.'
        },
        {
          id: 3,
          title: 'Special Secret #3',
          description: 'Unlock the mindset that drives wealth creation and preservation.'
        }
      ]
    }
  }
}
</script>

<style scoped>
.access {
  background-color: #222;
  color: white;
  padding: 80px 0;
  position: relative;
  overflow: hidden;
}

.access h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 10px;
}

.access h3 {
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 20px;
}

.access p {
  text-align: center;
  margin-bottom: 50px;
  color: #ccc;
}

.techniques {
  display: flex;
  justify-content: space-between;
  margin: 50px 0;
}

.technique {
  width: 30%;
  text-align: center;
}

.technique-icon {
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  background-color: rgba(126, 87, 194, 0.2);
  border-radius: 50%;
}

.technique h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
}

.technique p {
  color: #bbb;
  font-size: 0.9rem;
}

.icons-nav {
  display: flex;
  justify-content: center;
  gap: 40px;
}

.icon-item {
  width: 30px;
  height: 30px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}
</style>