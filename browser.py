import socket

mysock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
mysock.connect(('127.0.0.1',9000))
cmd = 'GET http://127.0.0.1/indedx.txt HTTP/1.0\r\n\r\n'.encode()
mysock.send(cmd)

while True:
    data = mysock.recv(512).decode()
    if len(data) < 1:
        break
    data += open("C:\\web dev\\server\\index.html", 'r').read(1024)

mysock.close()