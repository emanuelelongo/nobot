import requests
import sys

with open('token.txt') as f:
    token = f.read()
    print(token)

headers = {
    'Cookie': token,
    'Content-Type': 'application/x-www-form-urlencoded' }

for line in sys.stdin:
    for id in str.split(line):
        r = requests.post('http://localhost:8080/user/news', data={'id':str(id)}, headers=headers, allow_redirects=False)
        print('{}: {}'.format(id, r.status_code))
