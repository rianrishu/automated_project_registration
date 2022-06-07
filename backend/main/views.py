from turtle import back
from urllib import response
from django.http import HttpResponse, JsonResponse
import json
from django.shortcuts import render
from cgitb import reset
from django.contrib.auth.hashers import make_password,check_password
from telnetlib import STATUS
import requests
from rest_framework_simplejwt.backends import TokenBackend
import jwt
from rest_framework.response import Response
from rest_framework import generics, status
from requests import request
from rest_framework import viewsets
from .serializers import *
from .models import *  
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json,datetime
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
data = os.path.abspath(os.path.dirname(__file__)) + "/serviceAccountKey.json"
cred = credentials.Certificate(data)
firebase_admin.initialize_app(cred)
db=firestore.client()

expirytime=60
def generate_batch(section):
    bacthes=db.collection('students').get()
    temp=[]
    for batch in bacthes:
        temp.append(batch.id)
    i=1
    while True:
        generated_batch=section+str(i)
        if not generated_batch in temp:
            break
        i=i+1
    return generated_batch

# Create your views here.
class StudentViewSet(viewsets.ModelViewSet):
    queryset=Student.objects.all()
    serializer_class=StudentSerializer
    def create(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            
            student_leader=serializer.data['student_leader']
            student_1=serializer.data['student_1']
            student_2=serializer.data['student_2']
            section=serializer.data['section']
            batch_session = self.request.session.session_key
            password=make_password(serializer.data['password'])
            data={
            "student_leader":student_leader,
             "student_1":student_1, 
             "student_2":student_2,
             "section":section,
              "password": password,
              "phase0": 0,
              "phase1": 0,
              "phase2": 0
              }
            # data = {"name": name, "email":email}
            batch=generate_batch(section)
            # database.child("users").set(data) 
            self.request.session['batch_code'] = batch
            db.collection("students").document(batch).set(data)
            payload = {
                        'id': batch,
                        'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=expirytime),
                        'iat':datetime.datetime.now()
                        }
            token = jwt.encode(payload, '123', algorithm='HS256')
            return Response({'msg':'Data Uploaded','jwt':token}, status=status.HTTP_201_CREATED)


class StudentLoginViewSet(viewsets.ModelViewSet):
    queryset=StudentLogin.objects.all()
    serilazier_class=StudentLoginSerializer
    authentication_classes = [JWTAuthentication]
    # permission_classes = [Is]
    def create(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = StudentLoginSerializer(data=request.data)
        if serializer.is_valid():
            batch_response=serializer.data['batch']
            password_response=serializer.data['password']
            batches=db.collection('students').get()
            temp=[]
            flag=-1
            for batch in batches:
                temp.append(batch.id)
            for batch_temp in temp:
                if batch_temp == batch_response:
                    flag=1
                    password_db=db.collection('students').document(batch_response).get()
                    data=password_db.to_dict()['password']
                    if(check_password(password_response, data)):
                        self.request.session['batch_code'] = batch_response
                        payload = {
                        'id': batch_response,
                        'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=expirytime),
                        'iat':datetime.datetime.now()
                        }
                        token = jwt.encode(payload, '123', algorithm='HS256')
                        return Response({'msg':'Success','jwt':token}, status=status.HTTP_200_OK) 
                    else:
                        return Response({'msg':'Not valid Login'}, status=status.HTTP_401_UNAUTHORIZED)
            if flag==-1:
                return Response({'msg':'Batch not valid'}, status=status.HTTP_400_BAD_REQUEST)   


class LeaveHomePage(viewsets.ModelViewSet):
    def create(self, requst, format=None):
        if 'batch_code' in self.request.session:
            self.request.session.pop('batch_code')        
        return Response({'msg' : 'Success'}, status=status.HTTP_200_OK)

class UserInHomepage(viewsets.ModelViewSet):
    queryset=AuthToken.objects.all()
    serilazier_class=AuthTokenSerializer
    def create(self, request):
        serializer = AuthTokenSerializer(data=request.data)
        if serializer.is_valid():
          token=serializer.data['token']
          if not token:
              return Response({'msg' : 'Failure'}, status=status.HTTP_401_UNAUTHORIZED)
          try: 
             payload=jwt.decode(token, '123',algorithms=['HS256'])
             return Response({'msg':payload['id']}, status=status.HTTP_200_OK)
          except:
            return Response({'msg' : 'Failure'}, status=status.HTTP_401_UNAUTHORIZED)
        # print("abc",self.request.session.get('batch_code'))    
        # if not self.request.session.exists(self.request.session.session_key):
        #     self.request.session.create()
        # data={
        #     'code': self.request.session.get('batch_code')
        # }
        # print(self.request.session.get('batch_code'))
        # if data['code'] == None:
        else:
         return Response({'msg' : 'Failure'}, status=status.HTTP_401_UNAUTHORIZED)    
                
             
class StudentTopics(viewsets.ModelViewSet):
    
       queryset=GetTopics.objects.all()
       queryset1=SelectedTopics.objects.all()
       serilazier_class=StudentTopicSerializer
       serilazier_class=StudentSelectedTopicSerializer
       def create(self, request):
        serializer = StudentTopicSerializer(data=request.data)
        if serializer.is_valid():
           data=request.data
           name=serializer.data['name']
           res = not bool(name)
           if res:
             ans=[]
             index=0
             batch=serializer.data['selected_by']
             print(batch)
             docs = db.collection('topics').stream()
             for doc in docs:
                 name=doc.to_dict()['name']
                 description=doc.to_dict()['description']
                 selectedby=doc.to_dict()['selected_by']
                 id=doc.id
                 if(selectedby==batch): 
                     return Response({'msg':"Already Selected"}, status=status.HTTP_203_NON_AUTHORITATIVE_INFORMATION) 
                  
                 if (len(selectedby)!=0):
                  continue
                 obj={
                   "name":name,
                   "description":description,
                   "selected_by":selectedby,
                   "id":id
                  }
                 ans.append(obj)   
             return Response({'msg':ans}, status=status.HTTP_200_OK) 
        else:   
                serializer = StudentSelectedTopicSerializer(data=request.data)
                if serializer.is_valid():
                   batchid=serializer.data['batchid']
                   topic=serializer.data['name']
                   db.collection("topics").document(topic).update({"selected_by":batchid})
                   return Response({'msg':'Success'}, status=status.HTTP_200_OK)
                else:
                   return Response({'msg':'Batch not valid'}, status=status.HTTP_400_BAD_REQUEST) 



class StudentNewTopic(viewsets.ModelViewSet):
    queryset=GetTopics.objects.all()
    serilazier_class=StudentTopicSerializer
    def create(self, request, fromat=None):
        print(request.data)
        serializer = StudentTopicSerializer(data=request.data)
        if serializer.is_valid():
            batch_res=serializer.data['selected_by']
            name_res=serializer.data['name']
            description_res=serializer.data['description']
            faculty=serializer.data['faculty']
            print(faculty,name_res) 
            if batch_res=='':
             faculty=serializer.data['faculty']  
             data={
             "description":description_res,
              "name":name_res,
              "selected_by":batch_res,
              "faculty":faculty
             }
             db.collection("topics").add(data)
            elif faculty==None :
              data={
             "description":description_res,
              "name":name_res,
              "selected_by":batch_res,
              "faculty": "",
              "status": ""
              }
              db.collection("StudentTopics").add(data)
            else:
                batch_under=db.collection('Faculty').document(faculty).get()
                batch_under=batch_under.to_dict()['batches']
                print(batch_under)
                if batch_under<3:
                    id=serializer.data['id_topic'] 
                    db.collection('topics').document(id).update({
                            "name":name_res,"description":description_res,"faculty":faculty,"selected_by":batch_res
                        })
                else:
                    return Response({'msg':'Batches exceed'}, status=status.HTTP_405_METHOD_NOT_ALLOWED)          
            return Response({'msg':'Success'}, status=status.HTTP_200_OK) 
        else:
          return Response({'msg':'Not valid'}, status=status.HTTP_400_BAD_REQUEST)         

class AdminLoginViewSet(viewsets.ModelViewSet):
    queryset=AdminLogin.objects.all()
    serilazier_class=AdminLoginSerializer
    def create(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = AdminLoginSerializer(data=request.data)
        if serializer.is_valid():
            userid=serializer.data['userid']
            password_response=serializer.data['password']
            admins=db.collection('Admin').get()
            # print(admins[0].userid)
            temp=[]
            flag=-1
            for admin in admins:
                temp.append(admin.id)
            for admin_temp in temp:
                aduserid=db.collection('Admin').document(admin_temp).get()
                data=aduserid.to_dict()['userid']
                if  data== userid:
                    flag=1
                    password_db=db.collection('Admin').document(admin_temp).get()
                    data=password_db.to_dict()['password']
                    if(password_response==data): 
                        payload = {
                        'id': userid,
                        'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=expirytime),
                        'iat':datetime.datetime.now()
                        }
                        token = jwt.encode(payload, '123', algorithm='HS256')
                        return Response({'msg': 'success login','jwt':token}, status=status.HTTP_202_ACCEPTED)
                    else:
                        return Response({'msg':'Not valid Login'}, status=status.HTTP_401_UNAUTHORIZED)
            if flag==-1:
                return Response({'msg':'Batch not valid'}, status=status.HTTP_400_BAD_REQUEST)

class FacultyDetailViewSet(viewsets.ModelViewSet):
    def list(self, request, format=None):
        facultys=db.collection('Faculty').get()
        temp=[]
        ans=[]
        for faculty in facultys: 
          temp.append(faculty.id)
        return Response({'msg':temp}, status=status.HTTP_200_OK) 

class AdminGetalltopics(viewsets.ModelViewSet):
    def list(self, request, format=None):
        topics=db.collection('topics').get()
        temp=[]
        ans=[]
        for topic in topics: 
          temp.append(topic.id)
        for faculty_temp in temp:
                aduserid=db.collection('topics').document(faculty_temp).get()
                name=aduserid.to_dict()['name']
                description=aduserid.to_dict()['description']
                selected_by=aduserid.to_dict()['selected_by']
                faculty=aduserid.to_dict()['faculty']
                data={
                "description":description,
                "name":name,
               "selected_by":selected_by,
                "faculty":faculty,
                "id":faculty_temp
                }
                ans.append(data)
        return Response({'msg':ans}, status=status.HTTP_200_OK) 


class AdminGetTopicAddedByStudent(viewsets.ModelViewSet):
    def list(self, request, format=None):
        student_topics=db.collection('StudentTopics').get()
        temp_ids=[]
        res=[]
        for topic in student_topics:
            temp_ids.append(topic.id)
        for id in temp_ids:
            topic_details=db.collection('StudentTopics').document(id).get()
            name=topic_details.to_dict()['name']
            description=topic_details.to_dict()['description']
            selected_by=topic_details.to_dict()['selected_by']
            # faculty=topic_details.to_dict()['faculty']
            status=topic_details.to_dict()['status']
            if(status==""):
                data={
                    "description":description,
                    "name":name,
                    "selected_by":selected_by,
                    # "faculty":faculty,
                    "status":status
                }
                res.append(data)
        return Response({"data" : res})        


class StudentTopicAcceptRejectHandler(viewsets.ModelViewSet):
    queryset=StudentTopicAcceptReject.objects.all()
    serilazier_class=StudentTopicAcceptRejectSerializer
    def create(self, request):
        #fetching topic add by student of batch session
        serializer = StudentTopicAcceptRejectSerializer(data=request.data)
        # print(serializer.data)
        if serializer.is_valid():
            name=serializer.data['name']
            description=serializer.data['description']
            selected_by=serializer.data['selected_by']
            faculty=serializer.data['faculty']
            status_=serializer.data['status']
            if(status_ == "Accepted"):
                Topic=serializer.data['faculty']  
                data={
                "description":description,
                "name":name,
                "selected_by":selected_by,
                "faculty":faculty,
                "status":status_
                }
                db.collection("topics").add(data)
                student_topics=db.collection('StudentTopics').get()
                temp_ids=[]
                res=[]
                for topic in student_topics:
                    temp_ids.append(topic.id)
                for id in temp_ids:
                    topic_details=db.collection('StudentTopics').document(id).get()
                    name_st=topic_details.to_dict()['name']
                    if(name_st == name):
                        db.collection('StudentTopics').document(id).update({
                            "status": status_
                        })
                return Response({"msg" : "successfully added topic"}, status=status.HTTP_200_OK) 
            elif(status_ == "Rejected"):
                student_topics=db.collection('StudentTopics').get()
                temp_ids=[]
                res=[]
                for topic in student_topics:
                    temp_ids.append(topic.id)
                for id in temp_ids:
                    topic_details=db.collection('StudentTopics').document(id).get()
                    name_st=topic_details.to_dict()['name']
                    if(name_st == name):
                        db.collection('StudentTopics').document(id).update({
                            "status": status_
                        })
                        return Response({"msg": "Topic rejected updated successfully"}, status=status.HTTP_200_OK)
        return Response({"msg": "Bad request"}, status=status.HTTP_400_BAD_REQUEST)  


class FacultyLoginViewSet(viewsets.ModelViewSet):
    queryset=AdminLogin.objects.all()
    serilazier_class=FacultyLoginSerializer
    def create(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = FacultyLoginSerializer(data=request.data)
        if serializer.is_valid():
            userid=serializer.data['userid']
            password_response=serializer.data['password']
            admins=db.collection('Faculty').get()
            # print(admins[0].userid)
            temp=[]
            flag=-1
            for admin in admins:
                temp.append(admin.id)
            for faculty_temp in temp:
                aduserid=db.collection('Faculty').document(faculty_temp).get()
                data=aduserid.to_dict()['userid']
                if  data== userid:
                    flag=1
                    password_db=db.collection('Faculty').document(faculty_temp).get()
                    data=password_db.to_dict()['password']
                    if(password_response==data):
                        payload = {
                        'id': userid,
                        'exp': datetime.datetime.utcnow()+datetime.timedelta(minutes=expirytime),
                        'iat':datetime.datetime.now()
                        }
                        token = jwt.encode(payload, '123', algorithm='HS256') 
                        return Response({'msg': 'success login','jwt':token}, status=status.HTTP_202_ACCEPTED)
                    else:
                        return Response({'msg':'Not valid Login'}, status=status.HTTP_401_UNAUTHORIZED)
            if flag==-1:
                return Response({'msg':'Username is not valid'}, status=status.HTTP_400_BAD_REQUEST)

class FacultyUpdatePasswordViewSet(viewsets.ModelViewSet):
    queryset=AdminLogin.objects.all()
    serilazier_class=FacultyUpdatePasswordSerializer
    def create(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = FacultyUpdatePasswordSerializer(data=request.data)
        if serializer.is_valid():
            userid=serializer.data['userid']
            new_password = serializer.data['password']
            admins=db.collection('Faculty').get()
            # print(admins[0].userid)
            temp=[]
            flag=-1
            for admin in admins:
                temp.append(admin.id)
            for faculty_temp in temp:
                aduserid=db.collection('Faculty').document(faculty_temp).get()
                data=aduserid.to_dict()['userid']
                if  data== userid:
                    flag=1
                    password_db=db.collection('Faculty').document(faculty_temp).update({
                        "password": new_password
                    })
                    return Response({'msg': 'password update successful'}, status=status.HTTP_202_ACCEPTED)
            if flag==-1:
                return Response({'msg':'Username is not valid'}, status=status.HTTP_400_BAD_REQUEST)                


class FacultyCreateViewSet(viewsets.ModelViewSet):
    queryset=AdminLogin.objects.all()
    serilazier_class=FacultyLoginSerializer
    def create(self, request):
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()
        serializer = FacultyLoginSerializer(data=request.data)
        if serializer.is_valid():
            userid=serializer.data['userid']
            password_response=serializer.data['password']
            admins=db.collection('Faculty').get()
            # print(admins[0].userid)
            temp=[]
            flag=-1
            for admin in admins:
                temp.append(admin.id)
            for faculty_temp in temp:
                if userid==faculty_temp:
                    return Response({'msg':'UserId Already Exist'}, status=status.HTTP_400_BAD_REQUEST)
            db.collection('Faculty').document(userid).set({"password":password_response,"batches":0,"userid":userid})
            return Response({'msg': 'success login'}, status=status.HTTP_202_ACCEPTED)
        else:
         return Response({'msg':'Not valid Login'}, status=status.HTTP_401_UNAUTHORIZED)

class FacultyNotifyHandler(viewsets.ModelViewSet):
    serializer_class = NotifySerializer
    def create(self, request, format=None):
        serializer=NotifySerializer(data=request.data)
        if serializer.is_valid():
            flag = 0
            status_=serializer.data['status']
            if status_ == "/":
                status_db = db.collection('Notify').document('VyPiqWSmZK5GafAfY5Wp').get().to_dict()['notify_faculty']
                print(status_db)
                return Response({"msg": status_db}, status=status.HTTP_200_OK)
            if status_ == "true":
                flag = 1
            db.collection('Notify').document('VyPiqWSmZK5GafAfY5Wp').update({"notify_faculty":status_})
            if flag == 1:
                return Response({"msg": "true"}, status=status.HTTP_200_OK)
            return Response({"msg": "false"}, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)     

class StudentShowTopicHandler(viewsets.ModelViewSet):
    serializer_class = NotifySerializer
    def create(self, request, format=None):
        serializer=NotifySerializer(data=request.data)
        if serializer.is_valid():
            flag = 0
            status_=serializer.data['status']
            if status_ == "/":
                status_db = db.collection('Notify').document('VyPiqWSmZK5GafAfY5Wp').get().to_dict()['notify_student']
                return Response({"msg": status_db}, status=status.HTTP_200_OK)
            if status_ == "true":
                flag = 1
            db.collection('Notify').document('VyPiqWSmZK5GafAfY5Wp').update({"notify_student":status_})
            if flag == 1:
                return Response({"msg": "true"}, status=status.HTTP_200_OK)
            return Response({"msg": "false"}, status=status.HTTP_200_OK)
        return Response({}, status=status.HTTP_400_BAD_REQUEST)     

class GetBatchListFaculty(viewsets.ModelViewSet):
    serializer_class = FacultyGetBatchListSerializer
    def create(self, request, format=None):
        serializer=FacultyGetBatchListSerializer(data=request.data)
        if serializer.is_valid():
            faculty_userid=serializer.data['userid']
            student_topics=db.collection('topics').get()
            temp_ids=[]
            res=[]
            for topic in student_topics:
                temp_ids.append(topic.id)
            for id in temp_ids:
                topic_details=db.collection('topics').document(id).get()
                name=topic_details.to_dict()['name']
                description=topic_details.to_dict()['description']
                selected_by=topic_details.to_dict()['selected_by']
                faculty=topic_details.to_dict()['faculty']
                if faculty_userid == faculty:
                    res.append({
                        "name": name,
                        "description": description,
                        "batch": selected_by,
                        "id":id
                    })
            return Response(res, status=status.HTTP_200_OK)
        return Response({"msg": "bad request"}, status=status.HTTP_400_BAD_REQUEST)            

class GetSetPhaseMarks(viewsets.ModelViewSet):
    serializer_class = GetSetPhaseMarksSerializer 
    def create(self, request, format=None):
        serializer=GetSetPhaseMarksSerializer(data=request.data)
        if serializer.is_valid():
            batch = serializer.data['student_leader']
            phase0 = serializer.data['phase0']
            phase1 = serializer.data['phase1']
            phase2 = serializer.data['phase2']
            phase_marks=db.collection('students').document(batch).get()
            if phase0 == 0 and phase1 == 0 and phase2 == 0:
                phase0_db = phase_marks.to_dict()['phase0']
                phase1_db = phase_marks.to_dict()['phase1']
                phase2_db = phase_marks.to_dict()['phase2']
                return Response({
                    "batch": batch,
                    "phase0": phase0_db,
                    "phase1": phase1_db,
                    "phase2": phase2_db
                }, status=status.HTTP_200_OK)
            else:
                db.collection('students').document(batch).update({
                    "phase0": phase0,
                    "phase1": phase1,
                    "phase2": phase2
                })
                return Response({
                    "batch": batch,
                    "phase0": phase0,
                    "phase1": phase1,
                    "phase2": phase2
                }, status=status.HTTP_200_OK)
        return Response({"msg": "bad request"}, status=status.HTTP_400_BAD_REQUEST)
