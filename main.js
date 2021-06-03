const main = {
  data() {
    return {
      introduction: `Hi, I'm Piyopiyo.
This is my introduction page.

Please run 'help' command to know how to explore this page.

Have fun!
(You can input after '$')`
    }
  },
  mounted() {
    console.log('み〜た〜な〜')
  },
}

const app = Vue.createApp(main)