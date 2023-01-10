import time
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import smtplib

# create message object instance
msg = MIMEMultipart()

message = "Thank you"

# setup the parameters of the message
password = "graphics516"
msg['From'] = "sajidrana55007@gmail.com"
msg['To'] = "sajidrana55007@gmail.com"
msg['Subject'] = "Subscription"

# add in the message body
msg.attach(MIMEText(message, 'plain'))

# create server
server = smtplib.SMTP('smtp.gmail.com: 587')

server.starttls()

# Login Credentials for sending the mail
server.login(msg['From'], password)

i = 0
while i<=500:
    # send the message via the server.
    server.sendmail(msg['From'], msg['To'], msg.as_string())
    print("successfully sent email to %s:" % (msg['To']))
    i = i + 1
    time.sleep(5)

server.quit()

print("successfully sent email to %s:" % (msg['To']))