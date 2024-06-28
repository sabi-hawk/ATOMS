import requests
from bs4 import BeautifulSoup
import time
import random
import os
import sys
import urllib.request
import socket
from fake_useragent import UserAgent
from socket import timeout
from urllib.error import HTTPError, URLError
import re
import json
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


g_cookies = {}
imageExt = ["jpeg", "exif", "tiff", "gif", "bmp", "png", "ppm", "pgm",
            "pbm", "pnm", "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg", ".jpg"]
ua = UserAgent()
myList = []
emailsCounter = 0
linksList = []
emailList = []


def extractUrl(url):
    try:
        count = 0
        listUrl = []
        req = urllib.request.Request(
            url,
            data=None,
            headers={
                'User-Agent': ua.random
            })

        try:
            conn = urllib.request.urlopen(req, timeout=10)

        except timeout:
            raise ValueError('Timeout ERROR')

        except (HTTPError, URLError):
            raise ValueError('Bad Url...')

        status = conn.getcode()
        contentType = conn.info().get_content_type()

        if (status != 200 or contentType == "audio/mpeg"):
            raise ValueError('Bad Url...')

        html = conn.read().decode('utf-8')

        emails = re.findall(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", html)

        if len(emails) > 0:
            for email in emails:
                if (email not in listUrl and email[-3:] not in imageExt):
                    count += 1
                    with open("found_emails.txt", 'a') as f:
                        f.writelines(email + '\n')
                    listUrl.append(email)
                    time.sleep(2)
                    myList.append({'key': url, 'value': email})
                    emailsCounter = emailsCounter + 1
                    return

        myList.append({'key': url, 'value': ''})
    except Exception:
        time.sleep(3)
 

def extractEmailsFromUrlText(urlText, url):
    global emailsCounter
    extractedEmail = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", urlText)
    if len(extractedEmail) > 0:
        for email in extractedEmail:
            if (email not in emailList and email[-3:] not in imageExt and email[-4:] not in imageExt):
                emailList.append(email)
                time.sleep(2)
                myList.append({'url': url, 'email': email})
                print(json.dumps({'url': url, 'email': email}))
                sys.stdout.flush()
                emailsCounter = emailsCounter + 1
                return


def htmlPageRead(url, i):
    global session, g_cookies
    try:
        start = time.time()
        headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)\
                        AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}
        response = session.get(url, headers=headers, cookies=g_cookies)
        # request = urllib.request.Request(url, None, headers)
        # response = urllib.request.urlopen(request, timeout=10)
        # urlHtmlPageRead = response.read()
        # urlText = urlHtmlPageRead.decode('utf-8')
        urlText = response.text
        extractEmailsFromUrlText(urlText, url)
    except:
        pass

# EmailsLeechFunction

def emailsLeechFunc(url, i):
    try:
        htmlPageRead(url, i)
    except urllib.error.HTTPError as err:
        if err.code == 404:
            try:
                url = 'http://webcache.googleusercontent.com/search?q=cache:'+url
                htmlPageRead(url, i)
            except:
                pass
        else:
            pass


# END  EXTRACTION LOGIC
session = requests.Session()
retry = Retry(connect=3, backoff_factor=0.5)
adapter = HTTPAdapter(max_retries=retry)
session.mount('http://', adapter)
session.mount('https://', adapter)

googleTrendsUrl = 'https://google.com'
response = session.get(googleTrendsUrl)

if response.status_code == 200:
    g_cookies = response.cookies.get_dict()


query = sys.argv[1]
numOfEmails = int(sys.argv[2])
numOfPages = int(sys.argv[3])

# query = "web"
# numOfEmails = 5
# numOfPages = 5

page_no = 0
while numOfPages > 0:
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)\
                        AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}

    response = session.get('https://www.google.com/search?&q=' + query +
                           "&start=" + str(page_no), headers=headers, cookies=g_cookies)

    soup = BeautifulSoup(response.text, 'html.parser')
    search_results = soup.select('.kCrYT a')

    for link in search_results[:7]:
        if "/url?q=" in link.get('href'):
            url = link.get('href')[7:]
            url2 = url.split('/')
            url3 = url2[0] + '//' + url2[2]
            linksList.append(url3)

    numOfPages -= 1
    page_no += 10
    time.sleep(2)

start = time.time()

i = 0
for urlLink in linksList:
    if emailsCounter < numOfEmails:
        urlLink = urlLink.strip('\'"')
        i = i+1
        emailsLeechFunc(urlLink, i)





















# print()
# Passing Data to Node
# data = json.dumps(myList)
# data = [
#     {'key': 'https://www.interaction-design.org1', 'value': 'hello@interaction-design.org1'},
#     {'key': 'https://www.interaction-design.org2', 'value': 'hello@interaction-design.org2'},
#     {'key': 'https://www.interaction-design.org3', 'value': 'hello@interaction-design.org3'}
# ]
# data  = json.dumps(data)

# resp = {
#     "Response": 200,
#     "Message": "Hello From Python File",
#     "data": myList
# }
# print(json.dumps(resp))
# End Passing Data
# headers={ 'User-Agent': ua.random}