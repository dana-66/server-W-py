import socket
from socket import *
def createServer():
    serversocket = socket(AF_INET,SOCK_STREAM)
    try:
        serversocket.bind(('localhost',9000))
        serversocket.listen(5)
        while(1):
            clientsocket, address = serversocket.accept()
            rd = clientsocket.recv(5000).decode()
            pieces = rd.split("\n")
            if(len(pieces) > 0):
                print(pieces[0])
            
            data = "HTTP/1.1 200 ok\r\n"
            data += "Content-Type : text\html ; charset=utf\r\n"
            data += "\r\n"
            data += open("C:\\web dev\\server\\index.html", 'r').read(1024)  # the location of the html file
            clientsocket.sendall(data.encode())
            clientsocket.shutdown(SHUT_WR)
    except KeyboardInterrupt:
          print("\nSHutting down......\n")
    except Exception as exc:
            print("Error : \n")
            print(exc)
            serversocket.close()

print('Acessing http ://localhost :9000')
create_server()

