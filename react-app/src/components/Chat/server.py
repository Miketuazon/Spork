import socket

# Server socket
server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
server.bind(("localhost", 5000))
# Server listen
server.listen()
# accept connection
client, addr = server.accept()
#
done = False
#
while not done:
    # Decode client's msg and send
    message = client.recv(1024).decode('utf-8')
    if message == 'quit':
        done = True
    else:
        print(message)
    client.send(input("Message: ").encode('utf-8'))
