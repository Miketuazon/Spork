import socket

client = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

client.connect(("localhost", 5000))

done = False

while not done:
    client.send(input("Message: ").encode('utf-8'))
    message = print(client.recv(1024).decode('utf-8'))
    if message == "quit":
        done = True
    else:
        print(message)
