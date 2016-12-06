import requests
import re

with open("token.txt") as f:
    token = f.read()

headers = {
    'Cookie': token,
    'Content-Type': 'application/x-www-form-urlencoded' }

r = requests.get('http://localhost:8080/user/news', headers=headers, allow_redirects=False)

ids = [i.split(')')[0] for i in re.findall(r'(?<=submit\()\d*?\)', r.text) if i != ')']
print(' '.join(ids))
