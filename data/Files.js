const files = {
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