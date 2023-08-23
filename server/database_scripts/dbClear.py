import sys
import getopt
import http.client
import json

def usage():
    print('dbClear.py -c <collection>')

def getUsers(conn):
    conn.request("GET", """/api/users""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)
    ids = [str(d['data'][x]['_id']) for x in range(len(d['data']))]
    return ids

def getCourses(conn):
    conn.request("GET", """/api/courses""")
    response = conn.getresponse()
    data = response.read()
    d = json.loads(data)
    ids = [str(d['data'][x]['_id']) for x in range(len(d['data']))]
    return ids

def deleteUsers(conn):
    ids = getUsers(conn) # Fetch a list of users
    while len(ids):
        # Delete each individual user
        for id in ids:
            conn.request("DELETE","/api/users/" + id)
            response = conn.getresponse()
            data = response.read()
        # Fetch a list of users
        ids = getUsers(conn)

def deleteCourses(conn):
    ids = getCourses(conn) # Fetch a list of courses
    while len(ids):
        # Delete each individual course
        for id in ids:
            conn.request("DELETE","/api/courses/" + id)
            response = conn.getresponse()
            data = response.read()
        # Fetch a list of courses
        ids = getCourses(conn)

def main(argv):
    # Server Base URL and port
    baseurl = "localhost"
    port = 4000
    
    collection = "users courses"

    # read terminal params
    try:
        opts, args = getopt.getopt(argv, "c:", ["collection="])
    except getopt.GetoptError:
        usage()
        sys.exit(2)
    
    for opt, arg in opts:
        if opt == '-h':
            usage()
            sys.exit()
        elif opt in ("-l", "--limit"):
            collection = str(arg)
    
    # Server to connect to (1: url, 2: port number)
    conn = http.client.HTTPConnection(baseurl, port)

    if "users" in collection:
        print("deleting users")
        deleteUsers(conn)
    if "courses" in collection:
        print("deleting courses")
        deleteCourses(conn)
    
    # Exit gracefully
    conn.close()
    print(collection + "removed at "+baseurl+":"+str(port))

if __name__ == "__main__":
    main(sys.argv[1:])
