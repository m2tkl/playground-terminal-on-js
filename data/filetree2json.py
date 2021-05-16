import os
import json

def rec_json_tree(path):
    target_json = []

    for item in os.listdir(path):
        new_hash = {}
        new_hash['name'] = item

        full_path = os.path.join(path, item)
        if os.path.isdir(full_path):
            new_hash['type'] = 'dir'
            child_dir = rec_json_tree(full_path)
            new_hash['items'] = child_dir
        else:
            new_hash['type'] = 'file'
            with open(full_path, 'r') as f:
                contents = ''.join(f.readlines())
                # Jsonで\を使う場合は\\にする必要がある。
                new_hash['contents'] = contents.replace('\n', '\\n')

        target_json.append(new_hash)

    return target_json

if __name__ == '__main__':
    path = os.getcwd()+'/files'
    print(json.dumps({"name": "~", "type": "dir", "items": rec_json_tree(path)}))