app.component('terminal', {
  props: {

  },
  template: 
  /* html */
  `
  <code>
    <ul>
        <li v-for="log in logs">
          <pre>{{ log }}</pre>
        </li>
    </ul>
    {{ workingDir }}
    <form @submit.prevent="exec">
      $
      <input
        type="text"
        id="terminal"
        size="64"
        length="64"
        spellcheck="false"
        autocomplete="off"
        v-model="cmd"
      >
    </form>
    <div class="scroll-to-me"></div>
  </code>
  `,
  data() {
    return {
      cmd: '',
      logs: [],
      workingDir: '~',
      files: {
        type: 'dir',
        name: '~',
        items: [
          {
            type: 'dir',
            name: 'hoge',
            items: [
              { type: 'file', name: 'hoge1.txt', contents: 'hello hoge1.' },
              { type: 'file', name: 'hoge2.txt', contents: 'hello hoge2.' },
            ]
          },
          {
            type: 'dir',
            name: 'fuga',
            items: [
              { type: 'file', name: 'fuga1.txt', contents: 'hello hoge1.' },
              { type: 'file', name: 'fuga2.txt', contents: 'hello hoge2.' },
              { type: 'dir', name: 'fugafuga', items: [] }
            ]
          },
          { type: 'file', name: 'piyo.txt', contents: 'piyopiyo\nthis is a piyo.' },
        ],
      }
    }
  },
  methods: {
    exec: function() {
      const cmd = this.cmd.split(/\s+/)
      console.log(cmd)
      this.logs.push(this.workingDir)
      this.logs.push('$ ' + this.cmd)
      if (!cmd[0]) {
        // pass
      } else if (cmd[0] === 'clear') {
        this.clearHistory()
        return
      } else if (cmd[0] === 'ls') {
        items = this.searchDir(this.files, this.workingDir)
        names = this.getNameOfItems(items)
        this.logs.push(names.join('\t'))
      } else if (cmd[0] === 'cd') {
        console.log(this.workingItems)
        for (let item of this.workingItems) {
          if (item.name === cmd[1] && item.type === 'dir') {
            console.log(item.name)
          }
        }
      } else if (cmd[0] === 'cat') {
        for (let item of this.workingItems) {
          if (item.name === cmd[1] && item.type === 'file') {
            this.logs.push(item.contents);
          }
        }
      } else {
        this.logs.push('command not found: ' + cmd)
      }
      this.logs.push(' ')
      this.cmd = ''
      this.scrollToElement()
    },
    clearHistory: function() {
      this.logs = []
      this.cmd = ''
    },
    searchDir: function(files, name) {
      if (files.type === 'dir') {
        if (files.name === name) {
          return files.items
        }
        console.log(files.name)
        for (let item of files.items) {
          this.searchDir(item)
        }
      }
    },
    getNameOfItems: function(items) {
      names = []
      for (let item of items) {
        if (item.type === 'dir') {
          names.push(item.name + '/')
        } else {
          names.push(item.name)
        }
      }
      return names
    },
    scrollToElement() {
      const el = this.$el.getElementsByClassName('scroll-to-me')[0];
      if (el) {
        el.scrollIntoView();
      }
    }
  },
  computed: {
    workingItems() {
      items = this.searchDir(this.files, this.workingDir)
      return items
    },
  }
})