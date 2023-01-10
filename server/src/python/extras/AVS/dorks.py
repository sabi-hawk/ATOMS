import requests
from bs4 import BeautifulSoup
import time
import random
import os


def proxies():
	file = "proxies.txt"
	# file = input("Your proxies list: ")
	proxies = []
	with open(file, "r") as p:
		proxies = [line.strip() for line in p]
	proxy = random.choice(proxies)
	start = 0
	end = proxy.index(":")
	st = proxy[start:end]
	e = proxy[end+1:]
	global proxie
	proxie = {"http":"{}:{}".format(st, e)}

def user_agents():
	file = "ua.txt"
	# file = input("Your user_agents list: ")
	ua = []
	with open(file, "r") as txt:
		ua = [line.strip() for line in txt]
	user = random.choice(ua)
	global header
	header = {"User-Agent":"{}".format(user)}

def dorks():
	link = "inurl:wp-content/ after:2020-05-02"
	# link = input("Dorks: ")
	try:
		pages = 10
		# pages = int(input("Number of pages you want: "))
	except ValueError:
		print("It's not a number.")
		print("Number of pages set to 10 by default.")
		pages = 0
	try:
		sec = 10
		# sec = int(input("Seconds you want to wait between requests (5 secs recommanded to avoid being suspended by Google): "))
	except:
		print("It's not a number.")
		print("Seconds set to 5 by default")
	proxies()
	user_agents()
	print("after user agent")
	i = 0

	while i < pages:
		
		######################################
		googleTrendsUrl = 'https://google.com'
		response = requests.get(googleTrendsUrl)
		print(str(response))
		if response.status_code == 200:
			g_cookies = response.cookies.get_dict()


		headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5)\
            			AppleWebKit/537.36 (KHTML, like Gecko) Cafari/537.36'}
		######################################
		page = 1
		url = "https://www.google.com/search?&q={}&start={}".format(link, page)
		print("url is :" + url)
		r = requests.get(url, headers = headers, proxies=proxie , cookies = g_cookies)
		
		# r = requests.get(url, headers=header, proxies=proxie)
		time.sleep(sec)
		print("proxie is :" + str(proxie))
		print("/////////////" + "\n\n\n\n\n")
		print(str(r))
		print("/////////////" + "\n\n\n\n\n")
		
		soup = BeautifulSoup(r.text, "html.parser")
		#with open("response.txt", "w") as f:
		#	f.write(soup)
		print(soup)
		for cite in soup.find_all('cite'):
			print("inside for")
			
			link = 0
			if link <= 10:
				print(cite.text)
				print("------------------")
				time.sleep(sec)
				link += 1
			else:
				time.sleep(sec)
				print(url)
				continue
			page += 10
		i += 20

dorks()