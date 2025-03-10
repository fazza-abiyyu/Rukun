<template>
  <section class="testimonials">
    <div class="container">
      <h2>Hear from others just like you...</h2>
      <div class="testimonial-cards">
        <div class="testimonial-card" v-for="testimonial in testimonials" :key="testimonial.id">
          <div class="testimonial-header">
            <div class="testimonial-avatar"></div>
            <div>
              <div class="testimonial-name">{{ testimonial.name }}</div>
              <div class="testimonial-position">{{ testimonial.position }}</div>
            </div>
          </div>
          <p>{{ testimonial.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      testimonials: [
        {
          id: 1,
          name: 'Mark Rayan',
          position: 'Entrepreneur',
          text: '"This program transformed my approach to wealth building. The practical strategies and mindset coaching have been invaluable to my success."'
        },
        {
          id: 2,
          name: 'Sarah Johnson',
          position: 'Business Owner',
          text: '"I\'ve tried many programs before, but this one delivered real results. The community and mentorship have completely changed my trajectory."'
        }
      ]
    }
  }
}
</script>

<style scoped>
.testimonials {
  padding: 80px 0;
  background-color: #f5f7fa;
  text-align: center;
}

.testimonials h2 {
  font-size: 1.8rem;
  margin-bottom: 40px;
}

.testimonial-cards {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-top: 30px;
}

.testimonial-card {
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  max-width: 450px;
  text-align: left;
}

.testimonial-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.testimonial-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ddd;
  margin-right: 15px;
}

.testimonial-name {
  font-weight: bold;
}

.testimonial-position {
  font-size: 0.8rem;
  color: #777;
}
</style>