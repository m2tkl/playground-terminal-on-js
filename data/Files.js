const fileData = '{"name": "~", "type": "dir", "items": [{"name": "hoge", "type": "dir", "items": [{"name": "hoge1.txt", "type": "file", "contents": "This is a hoge 1."}, {"name": "hoge2.txt", "type": "file", "contents": "This is a hoge 2."}]}, {"name": "fuga", "type": "dir", "items": [{"name": "fugafuga", "type": "dir", "items": [{"name": "fugafuga.txt", "type": "file", "contents": "This is a fugafuga."}]}, {"name": "fuga1.txt", "type": "file", "contents": "This is fuga 1."}]}, {"name": "piyo.txt", "type": "file", "contents": "# piyopiyo\\nthis is a piyo.\\n\\n## Piyopiyo.\\n- Piyopiyo.\\n- Piyopiyo.\\n- Piyopiyo.\\n\\n## Piyopiyo.\\n- Piyopiyo.\\n- Piyopiyo.\\n- Piyopiyo.\\n- Piyopiyo.\\n- Piyopiyo."}]}';
const files = JSON.parse(fileData)