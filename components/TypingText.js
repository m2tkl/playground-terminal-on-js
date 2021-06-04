app.component('typing-text', {
  template:
  /* html */
  `
  <div :class="isTyping">
    <code>
      <p style="color: #ccc">{{ typedText }}</p>
    </code>
  </div>
  `,
  props: {
    text: {
      type: String,
      required: true
    },
    speed: {
      type: Number, 
      required: false,
      default: 80 
    }
  },
  data() {
    return {
      typedText: '',
      timer: null,
      count: 0,
      isTyping: "typing"
    }
  },
  mounted() {
    this.timer = setInterval(() => {
      this.typedText = this.text.substr(0, this.count);
      if (this.count > this.typedText.length) {
        this.isTyping = ''
        clearInterval(this.timer)
      }
      this.count++;
    }, this.speed);
  },
  methods: {

  },
  computed: {

  },
})