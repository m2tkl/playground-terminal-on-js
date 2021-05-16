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
      <input type="text" id="terminal" size="64" length="64"
        spellcheck="false" autocomplete="off" v-model="cmd">
    </form>
    <div class="scroll-to-me"></div>
  </code>
  `,
  data() {
    return {
      cmd: '',
      logs: [],
      dir: root,
    }
  },
  methods: {
    exec() {
      const cmd = this.cmd.split(/\s+/)
      this.execStart()
      switch (cmd[0]) {
        case '':
          // pass
          break
        case 'clear':
          this.clearHistory()
          return
        case 'ls':
          this.ls()
          break
        case 'cd':
          this.cd(cmd[1])
          break
        case 'cat':
          this.cat(cmd[1])
          break
        default:
          this.logs.push('command not found: ' + cmd)
      }
      this.execEnd()
    },
    clearHistory() {
      this.logs = []
      this.cmd = ''
    },
    execStart() {
      this.logs.push(this.workingDir)
      this.logs.push('$ ' + this.cmd)
    },
    execEnd() {
      this.logs.push(' ')
      this.cmd = ''
      this.scrollToElement()
    },
    ls() {
      result = ''
      for (let child of this.dir.children) {
        if (child instanceof Dir) {
          result += (child.name + '/\t')
        }
        if (child instanceof File) {
          result += (child.name + '\t')
        }
      }
      this.logs.push(result)
    },
    cat(fileName) {
      for (let child of this.dir.children) {
        if (child.name === fileName && child instanceof File) {
          this.logs.push(child.contents);
        }
      }
    },
    cd(dirName) {
      if (dirName === '..') {
        if (!this.dir.parent) {
          this.logs.push('permission denied.')
        } else {
          this.dir = this.dir.parent
        }
        return
      } 
      for (let child of this.dir.children) {
        if (child.name === dirName && child instanceof Dir) {
          this.dir = child
        }
      }
    },
    scrollToElement() {
      this.$nextTick(() => {
        const el = this.$el.getElementsByClassName('scroll-to-me')[0];
        if (el) {
          el.scrollIntoView();
        }
      })
    }
  },
  computed: {
    workingDir() {
      const getDirNameRec = (dir) => {
        if (!dir.parent) {
          return dir.name
        } else {
          return getDirNameRec(dir.parent) + '/' + dir.name
        }
      }
      return getDirNameRec(this.dir)
    }
  }
})