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
# 
# import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


imageExt = ["jpeg", "exif", "tiff", "gif", "bmp", "png", "ppm", "pgm",
            "pbm", "pnm", "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg"]
ua = UserAgent()
dictionary = {'key': '', 'value': ''}
myList = []
emailsCounter = 0
linksList = []
emailList = []

def extractUrl(url):
    print("Searching emails... please wait")
    # print("This operation may take several minutes...")
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
        print("Searching in " + url)

        if len(emails) > 0:
            for email in emails:
                print("Found .................", emails)
                if (email not in listUrl and email[-3:] not in imageExt):
                    count += 1
                    print(str(count) + "- " + email)
                    with open("found_emails.txt", 'a') as f:
                        f.writelines(email + '\n')
                    listUrl.append(email)
                    print("Time to Sleep (2sec)")
                    time.sleep(2)
                    myList.append({'key': url, 'value': email})
                    emailsCounter = emailsCounter + 1;
                    return

        myList.append({'key': url, 'value': ''})
    except Exception:
        print('\n\nInside Exception Time to Sleep (3 sec)')
        time.sleep(3)
########################## EXTRACTION LOGIC
#Extacting Emails
def extractEmailsFromUrlText(urlText, url):
    # extractedEmail =  emailRegex.findall(urlText)
    global emailsCounter
    extractedEmail = re.findall(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", urlText)
    if len(extractedEmail) > 0:
            for email in extractedEmail:
                if (email not in emailList and email[-3:] not in imageExt):
                    # count += 1
                    # print(str(count) + "- " + email)
                    # with open("found_emails.txt", 'a') as f:
                    #     f.writelines(email + '\n')
                    print("Found .................", extractedEmail)
                    emailList.append(email)
                    print("Time to Sleep (2sec)")
                    time.sleep(2)
                    myList.append({'key': url, 'value': email})
                    emailsCounter = emailsCounter + 1
                    return
    # allemails = []
    # for email in extractedEmail:
    #     allemails.append(email[0])
    # lenh = len(allemails)
    # print("\tNumber of Emails : %s\n"%lenh )
    # seen = set()
    # for email in allemails:
    #     if email not in seen:  # faster than `word not in output`
    #         seen.add(email)
    #         myList.append(email)
    #         emailFile.write(email+"\n")#appending Emails to a filerea

#HtmlPage Read Func
def htmlPageRead(url, i):
    try:
        start = time.time()
        headers = { 'User-Agent' : 'Mozilla/5.0' }
        request = urllib.request.Request(url, None, headers)
        response = urllib.request.urlopen(request)
        urlHtmlPageRead = response.read()
        urlText = urlHtmlPageRead.decode('utf-8')
        print ("%s.%s\tFetched in : %s" % (i, url, (time.time() - start)))
        extractEmailsFromUrlText(urlText, url)
    except:
        pass
    
#EmailsLeechFunction
def emailsLeechFunc(url, i):
    
    try:
        htmlPageRead(url,i)
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
print(str(response))
if response.status_code == 200:
    g_cookies = response.cookies.get_dict()
page_no = 0
query = "graphics designing"
# query = sys.argv[1]
print("Starting urls extraction...")
while page_no <= 20:
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)\
                        AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}

    # headers={ 'User-Agent': ua.random}

    response = session.get('https://www.google.com/search?&q=' + query +
                            "&start=" + str(page_no), headers=headers, cookies=g_cookies)
    print('Checking Search : ' + 'https://www.google.com/search?&q=' +
          query + "&start=" + str(page_no))

    soup = BeautifulSoup(response.text, 'html.parser')
    search_results = soup.select('.kCrYT a')

    for link in search_results[:7]:
        if "/url?q=" in link.get('href'):
            url = link.get('href')[7:]
            url2 = url.split('/')
            url3 = url2[0] + '//' + url2[2]
            linksList.append(url3)

    page_no = page_no + 10
    time.sleep(2)


print("URL EXTRACTION IS DONE !!!")
print("Starting email extraction...")
# Extraction Main
# TODO: Open a file for reading urls
start = time.time()
# urlFile = open("urls.txt", 'r')
# allURLS = urlFile.readlines()
# urlFile.close()
emailFile = open("emails.txt", 'a')
i=0
#Iterate Opened file for getting single url
for urlLink in linksList:
    if emailsCounter < 3:
        urlLink = urlLink.strip('\'"')
        i=i+1
        emailsLeechFunc(urlLink, i)
print ("Elapsed Time: %s" % (time.time() - start))
emailFile.close()

print("############## EMAIL RESULTS ################")
for email in myList:
    print(email)

# Passing Data to Node
data = json.dumps(myList)
resp = {
    "Response":200,
    "Message": "Hello From Python File",
    "data": data
}
print(json.dumps(resp))
# End Passing Data



