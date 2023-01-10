import time
import subprocess
import re


# make dorks
# task 1:
# use those above dorks one by one and call the below script with input of a text file
# implement a check that if links a ended in some particular dork then shift on other dork
# implement a check to grab 1000 links

# subprocess.call("python requesting.py",shell=True)
print(r"""

      __           ___      ___       ________  
     /""\         |"  \    /"  |     /"       ) 
    /    \         \   \  //  /     (:   \___/  
   /' /\  \         \\  \/. ./       \___  \    
  //  __'  \         \.    //         __/  \\   
 /   /  \\  \         \\   /         /" \   :)  
(___/    \___)         \__/         (_______/   
                                                

 """)
with open("GrabbedLinks.txt","r") as f:
    list_of_urls = f.readlines()

print("Total Number of URLs Grabbed = " + str(len(list_of_urls)))

clean_list_of_urls = []
for url in list_of_urls:
    if url[:-1] not in clean_list_of_urls:
        clean_list_of_urls.append(url[:-1])


print("After Removing Duplicants, Total Number of URLs = " + str(len(clean_list_of_urls)))

with open("clean_urls.txt","w") as f:
    for url in clean_list_of_urls:
        f.writelines(url + '\n')

print("Clean URLs are saved in clean_urls.txt...")

for url in clean_list_of_urls:
    output = subprocess.check_output("python pagespeed-api.py -u " + url)
    if "Error" in output.decode("utf-8"):
        print("Found Error")
        flag = True
        counter = 0
        while flag and counter < 3:
            print("sleeping for 10 sec")
            time.sleep(10)
            output = subprocess.check_output("python pagespeed-api.py -u " + url)
            if "Error" in output.decode("utf-8"):
                flag = True
                print("Counter is = " + str(counter))
                counter = counter + 1
            else:
                flag = False

    try:
        first_contenful_paint = re.search("(?:First Contentful Paint ~ )(.*)",output.decode("utf-8"))
        first_contenful_paint = first_contenful_paint.group(1)
        first_contenful_paint = first_contenful_paint[:-3]


        first_interactive_page = re.search("(?:First Interactive ~ )(.*)", output.decode("utf-8"))
        first_interactive_page = first_interactive_page.group(1)
        first_interactive_page = first_interactive_page[:-3]

        print("First Contentful Paint :" + first_contenful_paint)
        print("First Interactive :" + first_interactive_page)
        print(output.decode("utf-8"))
    except Exception:
        continue



# \
# first_interactive_page[:-3] //remove last 3 chars
