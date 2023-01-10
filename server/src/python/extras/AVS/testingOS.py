import json
import sys
import time

print(json.dumps("Here1"))
time.sleep(2)
sys.stdout.flush()
print(json.dumps("Here2"))
time.sleep(2)
sys.stdout.flush()

print(json.dumps("Here3"))
time.sleep(2)
sys.stdout.flush()

