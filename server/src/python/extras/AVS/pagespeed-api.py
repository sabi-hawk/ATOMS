import requests
import argparse

# Documentation: https://developers.google.com/speed/docs/insights/v5/get-started

# JSON paths: https://developers.google.com/speed/docs/insights/v4/reference/pagespeedapi/runpagespeed

# Populate 'pagespeed.txt' file with URLs to query against API.

parser = argparse.ArgumentParser()
parser.add_argument('-u', '--url', dest='url')
argument = parser.parse_args()

with open('pagespeed.txt') as pagespeedurls:
    download_dir = 'pagespeed-results.csv'
    file = open(download_dir, 'w')
    content = argument.url
    columnTitleRow = "URL, First Contentful Paint, First Interactive\n"
    file.write(columnTitleRow)

    # This is the google pagespeed api url structure, using for loop to insert each url in .txt file

    # If no "strategy" parameter is included, the query by default returns desktop data.
    x = f'https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url={content}&strategy=mobile'
    print(f'Requesting {x}...')
    r = requests.get(x)
    final = r.json()

    try:
        urlid = final['id']
        split = urlid.split('?')  # This splits the absolute url from the api key parameter
        urlid = split[0]  # This reassigns urlid to the absolute url
        ID = f'URL ~ {urlid}'
        ID2 = str(urlid)
        urlfcp = final['lighthouseResult']['audits']['first-contentful-paint']['displayValue']
        FCP = f'First Contentful Paint ~ {str(urlfcp)}'
        FCP2 = str(urlfcp)
        urlfi = final['lighthouseResult']['audits']['interactive']['displayValue']
        FI = f'First Interactive ~ {str(urlfi)}'
        FI2 = str(urlfi)
    except KeyError:
        print(f'<KeyError> One or more keys not found {content}.')

    try:
        row = f'{ID2},{FCP2},{FI2}\n'
        file.write(row)
    except NameError:
        print(f'<NameError> Failing because of KeyError {content}.')
        file.write(f'<KeyError> & <NameError> Failing because of nonexistant Key ~ {content}.' + '\n')

    try:
        print(ID)
        print(FCP)
        print(FI)
    except NameError:
        print(f'<NameError> Failing because of KeyError {content}.')

file.close()


# usage : python pagespeed-api.py -u http://cyberlegends.org
