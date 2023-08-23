import sys
import getopt
import http.client
import urllib
import json
import pandas as pd

def usage():
    print('dbFill.py -l <limit>')

def main(argv):
    # Server Base URL and port
    baseurl = "localhost"
    port = 4000

    csv_filepath = "gpa-dataset.csv"
    limit = -1

    # read terminal params
    try:
        opts, args = getopt.getopt(argv, "l:", ["limit="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    
    for opt, arg in opts:
        if opt == '-h':
            usage()
            sys.exit()
        elif opt in ("-l", "--limit"):
            limit = int(arg)

    # Server to connect to (1: url, 2: port number)
    conn = http.client.HTTPConnection(baseurl, port)
    # HTTP Headers
    headers = {"Content-type": "application/x-www-form-urlencoded","Accept": "text/plain"}

    gpa_data = pd.read_csv(csv_filepath)

    if (limit == -1):
        limit = gpa_data.shape[0]

    for i in range(limit):
        # Term,Year,Students,Subject,Number,A+,A,A-,B+,B,B-,C+,C,C-,D+,D,D-,F,W,Course Title,Primary Instructor,GPA
        params = urllib.parse.urlencode({
            "term": gpa_data.iloc[i]["Term"],
            "year": gpa_data.iloc[i]["Year"],
            "students": gpa_data.iloc[i]["Students"],
            "subject": gpa_data.iloc[i]["Subject"],
            "number": gpa_data.iloc[i]["Number"],
            "numAp": gpa_data.iloc[i]["A+"],
            "numA": gpa_data.iloc[i]["A"],
            "numAm": gpa_data.iloc[i]["A-"],
            "numBp": gpa_data.iloc[i]["B+"],
            "numB": gpa_data.iloc[i]["B"],
            "numBm": gpa_data.iloc[i]["B-"],
            "numCp": gpa_data.iloc[i]["C+"],
            "numC": gpa_data.iloc[i]["C"],
            "numCm": gpa_data.iloc[i]["C-"],
            "numDp": gpa_data.iloc[i]["D+"],
            "numD": gpa_data.iloc[i]["D"],
            "numDm": gpa_data.iloc[i]["D-"],
            "numF": gpa_data.iloc[i]["F"],
            "numW": gpa_data.iloc[i]["W"],
            "courseTitle": gpa_data.iloc[i]["Course Title"],
            "instructor": gpa_data.iloc[i]["Primary Instructor"],
            "avgGPA": gpa_data.iloc[i]["GPA"],
        })
        conn.request("POST", "/api/courses", params, headers)
        response = conn.getresponse()
        data = response.read()
    
    # add 1 user
    params = urllib.parse.urlencode({
        "uid": "IamTesting1234",
        "savedCourses": []
    })
    conn.request("POST", "/api/users", params, headers)
    response = conn.getresponse()
    data = response.read()
    print("Test User added")

    # delete test user
    conn.request("GET", """/api/users""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)
    ids = [str(d['data'][x]['_id']) for x in range(len(d['data']))]
    for id in ids:
        conn.request("DELETE","/api/users/" + id)
        response = conn.getresponse()
        data = response.read()
    print("Test User deleted")

    # Exit gracefully
    conn.close()
    print(str(limit)+" courses added at "+baseurl+":"+str(port))
    
if __name__ == "__main__":
    main(sys.argv[1:])
