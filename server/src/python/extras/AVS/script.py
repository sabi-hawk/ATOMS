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
import math


dummy_emails = [
    'example@example.com', 'test@test.com', 'hello@world.com', 'dummy@dummy.com', 'no-reply@noreply.com', 'info@information.com', 'support@support.com',
    'sample@sample.com',
    'admin@admin.com',
    'webmaster@webmaster.com',
    'contact@contact.com',
    'customer@customer.com',
    'feedback@feedback.com',
    'marketing@marketing.com',
    'sales@sales.com',
    'unsubscribe@unsubscribe.com',
    'feedback@feedback.com',
    'newsletter@newsletter.com',
    'privacy@privacy.com',
    'register@register.com',
    'service@service.com',
    'spam@spam.com',
    'subscribe@subscribe.com',
    'web@web.com',
    'nospam@nospam.com',
    'notreal@notreal.com',
    'fake@fake.com',
    'examplemail@examplemail.com',
    'temp@temp.com',
    'nonexisting@nonexisting.com',
    'random@random.com',
    'placeholder@placeholder.com',
    'noreply@noreply.com', 'your.name@provider.com', 'username@example.com', 'yourname@email.com', 'example@gmail.com', 'name@domain.com']

dummy_urls = [
    'https://www.google.com/',
    'https://www.facebook.com/',
    'https://www.youtube.com/',
    'https://www.amazon.com/',
    'https://en.wikipedia.org/',
    'https://twitter.com/',
    'https://www.instagram.com/',
    'https://www.linkedin.com/',
    'https://www.reddit.com/',
    'https://www.pinterest.com/',
    'https://www.netflix.com/',
    'https://www.whatsapp.com/',
    'https://www.tumblr.com/',
    'https://www.snapchat.com/',
    'https://www.tiktok.com/',
    'https://www.twitch.tv/',
    'https://www.microsoft.com/',
    'https://www.apple.com/',
    'https://www.yahoo.com/',
    'https://mail.google.com/',
    'https://www.bing.com/',
    'https://www.adobe.com/',
    'https://www.dropbox.com/',
    'https://medium.com/',
    'https://www.buzzfeed.com/',
    'https://www.quora.com/',
    'https://www.yelp.com/',
    'https://www.ebay.com/',
    'https://www.paypal.com/',
    'https://www.airbnb.com/',
    'https://www.expedia.com/',
    'https://www.booking.com/',
    'https://www.tripadvisor.com/',
    'https://www.cnn.com/',
    'https://www.bbc.com/',
    'https://www.nytimes.com/',
    'https://www.theguardian.com/',
    'https://www.aljazeera.com/',
    'https://www.cnbc.com/',
    'https://www.forbes.com/',
    'https://www.bloomberg.com/',
    'https://www.espn.com/',
    'https://www.imdb.com/',
    'https://www.webmd.com/',
    'https://www.mayoclinic.org/',
    'https://www.who.int/',
    'https://www.nationalgeographic.com/',
    'https://www.nasa.gov/',
    'https://www.ted.com/',
    'https://www.khanacademy.org/',
    'https://www.fiverr.com/',
    'https://www.upwork.com/',
    'https://www.freelancer.com/',
    'https://www.guru.com/',
    'https://www.toptal.com/',
    'https://www.peopleperhour.com/',
    'https://www.simplyhired.com/',
    'https://www.glassdoor.com/',
    'https://www.indeed.com/',
    'https://www.craigslist.org/',
    'https://www.ziprecruiter.com/'
]

g_cookies = {}
imageExt = ["jpeg", "exif", "tiff", "gif", "bmp", "png", "ppm", "pgm",
            "pbm", "pnm", "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg", ".jpg"]
ua = UserAgent()
myList = []
emailsCounter = 0
linksList = []
emailList = []
finaloutput = {}
profession = ""


def extractUrl(url):
    global dummy_emails
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
                if (email not in listUrl and email[-3:] not in imageExt and email not in dummy_emails):
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
    global finaloutput
    global profession
    global dummy_emails
    extractedEmail = re.findall(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", urlText)

    if len(extractedEmail) > 0:
        for email in extractedEmail:
            if (email not in emailList and email[-3:] not in imageExt and email[-4:] not in imageExt and email not in dummy_emails):
                emailList.append(email)
                time.sleep(2)
                myList.append({'url': url, 'email': email})
                print(json.dumps({'url': url, 'email': email}))
                if profession in finaloutput:
                    finaloutput[profession]['url'].append(url)
                    finaloutput[profession]['email'].append(email)
                else:
                    finaloutput[profession] = {'url': [url], 'email': [email]}

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


def distribute_emails(num_emails, professions):
    num_professions = len(professions)
    ideal_emails_per_profession = num_emails / num_professions
    rounded_emails_per_profession = math.floor(ideal_emails_per_profession)
    remaining_emails = num_emails - rounded_emails_per_profession * num_professions

    email_counts = [rounded_emails_per_profession] * num_professions

    for i in range(remaining_emails):
        email_counts[i] += 1

    return email_counts


numOfEmails = int(sys.argv[1])
queryList = sys.argv[2]

email_counts = distribute_emails(num_emails=numOfEmails, professions=queryList)
page_no = 0
numOfPages = [int((x / 1.5)+1) for x in email_counts]
index = 0

# print(email_counts)
# print(numOfPages)

for query in queryList:
    profession = query
    phrases = [
        f"Hiring {query} now",
        f"Expert {query} needed",
        f"Looking for skilled {query} workers",
        f"Join our team of {query} professionals",
        f"New {query} job opportunities available",
        f"In search of experienced {query} workers",
        f"We're hiring {query} specialists",
        f"Find your dream {query} job here",
        f"Join the {query} industry today",
        f"Get hired as a {query} expert",
        f"Looking for talented {query} professionals",
        f"Career opportunities in {query}",
        f"Exciting {query} job openings",
        f"Join a team of experienced {query} workers",
        f"Find {query} jobs near me",
        f"In-demand {query} positions available",
        f"Now hiring skilled {query} workers",
        f"Join our growing team of {query} professionals",
        f"Apply now for {query} jobs",
        f"Join the ranks of successful {query} experts"]
    emailsCounter = 0
    while numOfPages[index] > 0:

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
                if (url3 not in dummy_urls):
                    linksList.append(url3)

        numOfPages[index] -= 1
        page_no += 10
        time.sleep(2)

    start = time.time()

    i = 0
    for urlLink in linksList:
        if emailsCounter < email_counts[index]:
            urlLink = urlLink.strip('\'"')
            i = i+1
            emailsLeechFunc(urlLink, i)

    index += 1

print(finaloutput)
