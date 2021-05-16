class Dir {
  constructor(dirName) {
    this.name = dirName;
    this.parent = null;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
    child.parent = this;
  }
}

class File {
  constructor(fileName) {
    this.name = fileName;
    this.parent = null;
    this.contents = null;
  }
}

const root = new Dir(files.name)

const register = (dir, items) => {
  for (let item of items) {
    if (item.type === 'dir') {
      const newDir = new Dir(item.name)
      dir.addChild(newDir)
      register(newDir, item.items)
    } 
    if (item.type === 'file') {
      const newFile = new File(item.name)
      newFile.contents = item.contents
      dir.addChild(newFile)
    }
  }
}

register(root, files.items)

