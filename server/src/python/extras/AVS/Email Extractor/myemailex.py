from googlesearch import search
from bs4 import BeautifulSoup
import urllib.request
import random
import os
import time
import sqlite3
from sqlite3 import Error
import sys
import re
from fake_useragent import UserAgent
from socket import timeout
from urllib.error import HTTPError, URLError
import argparse

imageExt = ["jpeg", "exif", "tiff", "gif", "bmp", "png", "ppm", "pgm", "pbm", "pnm", "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg"]
ua = UserAgent()

def insertEmail(db_file, email, frase, url):
	try:
		conn = sqlite3.connect(db_file)
		c = conn.cursor()
		c.execute("INSERT INTO emails (phrase, email, url) VALUES (?,?,?)", (frase, email, url))
		conn.commit()
		conn.close()

	except Error as e:
		print(e)
		input("Press enter to continue")


	finally:
		conn.close()

def searchEmail(db_file, email, frase):
	try:
		conn = sqlite3.connect(db_file)
		c = conn.cursor()
		sql = 'SELECT COUNT(*) FROM emails where email LIKE "%' + str(email) + '%" AND phrase LIKE "%' + str(frase) + '%"'
		result = c.execute(sql).fetchone()
		conn.close()

		return (result[0])

	except Error as e:
		print(e)
		input("Press enter to continue")


	finally:
		conn.close()


def extractUrl(url):
    print("Searching emails... please wait")
    print("This operation may take several minutes...")
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

        emails = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", html)
        print("Searching in " + url)


        for email in emails:
            if (email not in listUrl and email[-3:] not in imageExt):
                count += 1
                print(str(count) + "- " + email)
                # print("Found !!!")
                listUrl.append(email)
                print("Time to Sleep (5sec)")
                time.sleep(5)
                return

        soup = BeautifulSoup(html, "lxml")
        # print("////////////////////////////////////")
        links = soup.find_all('a')

        # print("////////////////////////////////////")
        print("They will be analyzed " + str(len(links) + 1) + " Urls...")
        time.sleep(2)

        for tag in links:
            link = tag.get('href', None)
            if link is not None:
                try:
                    print("Searching in " + link)
                    if (link[0:4] == 'http'):
                        req = urllib.request.Request(
                            link,
                            data=None,
                            headers={
                                'User-Agent': ua.random
                            })

                        try:
                            f = urllib.request.urlopen(req, timeout=10)

                        except timeout:
                            print("Bad Url..")
                            time.sleep(2)
                            pass

                        except (HTTPError, URLError):
                            print("Bad Url..")
                            time.sleep(2)
                            pass

                        status = f.getcode()
                        contentType = f.info().get_content_type()

                        if (status != 200 or contentType == "audio/mpeg"):
                            print("Bad Url..")
                            time.sleep(2)
                            pass

                        s = f.read().decode('utf-8')

                        emails = re.findall(r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", s)

                        for email in emails:
                            if (email not in listUrl and email[-3:] not in imageExt):
                                count += 1
                                print(str(count) + " - " + email)
                                print("Found")
                                listUrl.append(email)
                                if (searchEmail("Emails.db", email, "Especific Search") == 0):
                                    insertEmail("Emails.db", email, "Especific Search", url)

                                print("Time to Sleep (5s)")
                                time.sleep(5)
                                return

                # Sigue si existe algun error
                except Exception:
                    pass

        print("")
        print("***********************")
        print(str(count) + " emails were found")
        print("***********************")

    except KeyboardInterrupt:
        input("Press return to continue")


    except Exception as e:
        print("////////////////////////////////////")
        print(e)

        input("Press enter to continue")


parser = argparse.ArgumentParser()
parser.add_argument('-u','--url',dest="url",help="To add url")
argument = parser.parse_args()

with open("Links.txt", "r") as f:
    Links = f.readlines()

print("Found Links" + str(Links))

for link in Links:
    print("Working on :" + link[:-1])
    extractUrl(link[:-1])



# extractUrl(argument.url)
# extractUrl("http://cyberlegends.org")

# i also had done pip install lxml