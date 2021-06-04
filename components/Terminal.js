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
        case '':                           break; // pass
        case 'clear': this.clearHistory(); return;
        case 'help':  this.help();         break;
        case 'ls':    this.ls();           break;
        case 'cd':    this.cd(cmd[1]);     break;
        case 'cat':   this.cat(cmd[1]);    break;
        default:      this.logs.push('command not found: ' + cmd)
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
      if (dirName === '~') {
        this.dir = root
        return
      }
      for (let child of this.dir.children) {
        if (child.name === dirName && child instanceof Dir) {
          this.dir = child
        }
      }
    },
    help() {
      const helpMessage = `----------------
- What's this? -
----------------
This page is mimic of 'Bash' (and my introduction page).

The following commands are available.
- cd
- ls
- cat
- help
(Due to my lack of skills, the commands are very limited. Sorry!)

--------------------------
- Command usage examples -
--------------------------
cd: [Change Directory] You can move the directory.
  $ cd sample/
    => move to 'sample/' directory
  $ cd ~
    => move to home ('~') directory
  $ cd ..
    => move to the parent directory

ls: [List Segments] You can list the contents of the directory.
  $ ls

cat: [conCATnate] You can see the contents of file.
  $ cat sample.txt
    => display contents of 'sample.txt'

help: Show this message
  $ help

Good luck!
`
      this.logs.push(helpMessage)
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
      const recGetDirName = (dir) => {
        if (!dir.parent) {
          return dir.name
        } else {
          return recGetDirName(dir.parent) + '/' + dir.name
        }
      }
      return recGetDirName(this.dir)
    }
  }
})