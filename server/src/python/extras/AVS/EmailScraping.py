#! python3
import re, urllib.request, time

myList = []
emailRegex = re.compile(r'''
#example :
#something-.+_@somedomain.com
(
([a-zA-Z0-9_.+]+
@
[a-zA-Z0-9_.+]+)
)
''', re.VERBOSE)
imageExt = ["jpeg", "exif", "tiff", "gif", "bmp", "png", "ppm", "pgm",
            "pbm", "pnm", "webp", "hdr", "heif", "bat", "bpg", "cgm", "svg"]
     
emailList = []
emailsCounter = 0
#Extacting Emails
def extractEmailsFromUrlText(urlText, url):
    # extractedEmail =  emailRegex.findall(urlText)
    global emailsCounter
    extractedEmail = re.findall(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}", urlText)
    if len(extractedEmail) > 0:
            for email in extractedEmail:
                print("Found .................", extractedEmail)
                if (email not in emailList and email[-3:] not in imageExt):
                    # count += 1
                    # print(str(count) + "- " + email)
                    # with open("found_emails.txt", 'a') as f:
                    #     f.writelines(email + '\n')
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
      
# TODO: Open a file for reading urls
start = time.time()
urlFile = open("urls.txt", 'r')
allURLS = urlFile.readlines()
urlFile.close()
emailFile = open("emails.txt", 'a')
i=0
#Iterate Opened file for getting single url
for urlLink in allURLS:
    if emailsCounter < 7:
        urlLink = urlLink.strip('\'"')
        i=i+1
        emailsLeechFunc(urlLink, i)
print ("Elapsed Time: %s" % (time.time() - start))

# urlFile.close()
emailFile.close()

print("############## EMAIL RESULTS ################");
for email in myList:
    print(email)




