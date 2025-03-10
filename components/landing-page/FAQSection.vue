<template>
  <section class="faq">
    <div class="container">
      <h2>FAQs.</h2>
      <div class="faq-list">
        <div
            class="faq-item"
            :class="{ active: activeFAQ === index }"
            v-for="(faq, index) in faqs"
            :key="index"
        >
          <div class="faq-question" @click="toggleFAQ(index)">
            <span>{{ faq.question }}</span>
            <span>{{ activeFAQ === index ? '-' : '+' }}</span>
          </div>
          <div class="faq-answer" v-if="activeFAQ === index">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      activeFAQ: -1,
      faqs: [
        {
          question: 'What happens after I apply?',
          answer: 'After you apply, our team will review your application and contact you to schedule an onboarding session where we\'ll discuss your goals and create a personalized plan.'
        },
        {
          question: 'How much time should I commit each week?',
          answer: 'We recommend dedicating at least 10-15 hours per week to get the most out of the program. The more you put in, the more you\'ll get out.'
        },
        {
          question: 'Do I need previous experience to join?',
          answer: 'No previous experience is required. Our program is designed for people from all backgrounds who are ready to commit to their financial growth.'
        },
        {
          question: 'What if I don\'t see results?',
          answer: 'We\'re so confident in our methods that we offer a satisfaction guarantee. If you don\'t see progress within the first 30 days, we\'ll work with you to find a solution that works.'
        }
      ]
    }
  },
  methods: {
    toggleFAQ(index) {
      this.activeFAQ = this.activeFAQ === index ? -1 : index;
    }
  }
}
</script>

<style scoped>
.faq {
  padding: 80px 0;
  background-color: white;
}

.faq h2 {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 40px;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  border-bottom: 1px solid #eee;
  padding: 20px 0;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  font-weight: bold;
}

.faq-question:hover {
  color: #7e57c2;
}

.faq-answer {
  margin-top: 15px;
  color: #666;
}
</style>