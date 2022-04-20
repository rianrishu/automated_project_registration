from urllib import response
from django.http import HttpResponse, JsonResponse
import json
from django.shortcuts import render
from cgitb import reset
from django.contrib.auth.hashers import make_password,check_password
from telnetlib import STATUS
from rest_framework.response import Response
from rest_framework import generics, status
from requests import request
from rest_framework import viewsets
from .serializers import StudentLoginSerializer, StudentSerializer,StudentTopicSerializer, StudentSelectedTopicSerializer
from .models import Student, StudentLogin, GetTopics, SelectedTopics
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import os
import json

data = os.path.abspath(os.path.dirname(__file__)) + "/serviceAccountKey.json"
cred = credentials.Certificate(data)
firebase_admin.initialize_app(cred)
db=firestore.client()

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
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            # serializer.save()
            
            studnet_leader=serializer.data['student_leader']
            student_1=serializer.data['student_1']
            student_2=serializer.data['student_2']
            section=serializer.data['section']
            password=make_password(serializer.data['password'])
            data={
            "student_leader":studnet_leader,
             "student_1":student_1, 
             "student_2":student_2,
             "section":section,
              "password": password}
            # data = {"name": name, "email":email}
            batch=generate_batch(section)
            # database.child("users").set(data) 
            db.collection("students").document(batch).set(data)
            return Response({'msg':'Data Uploaded'}, status=status.HTTP_201_CREATED)


class StudentLoginViewSet(viewsets.ModelViewSet):
    queryset=StudentLogin.objects.all()
    serilazier_class=StudentLoginSerializer
    def create(self, request):
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
                    print(password_db)
                    data=password_db.to_dict()['password']
                    if(check_password(password_response, data)):
                        return Response({'msg': 'success'}, status=status.HTTP_202_ACCEPTED)
                    else:
                        return Response({'msg':'Not valid Login'}, status=status.HTTP_401_UNAUTHORIZED)
            if flag==-1:
                return Response({'msg':'Batch not valid'}, status=status.HTTP_400_BAD_REQUEST)                
             
class StudentTopics(viewsets.ModelViewSet):
       queryset=GetTopics.objects.all()
       queryset1=SelectedTopics.objects.all()
       serilazier_class=StudentTopicSerializer
       serilazier_class=StudentSelectedTopicSerializer
       def create(self, request):
           data=request.data
           res = not bool(data)
           if res:
             ans=[]
             index=0
             docs = db.collection('topics').stream()
             for doc in docs:
                 name=doc.to_dict()['name']
                 description=doc.to_dict()['description']
                 selectedby=doc.to_dict()['selected_by']
                 id=doc.id
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
