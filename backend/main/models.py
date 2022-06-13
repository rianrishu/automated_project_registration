from datetime import datetime
from email.policy import default
from operator import mod
from re import T
from sqlite3 import Date
from statistics import mode
from django import forms
from django.core.validators import RegexValidator
from django.db import models

SECTION_CHOICES=(
    ('', ''),
    ('a', 'A'),
    ('b', 'B'),
    ('c', 'C')
)


# Create your models here.
class Student(models.Model):
    student_leader=models.CharField(max_length=20, null=False)
    student_1=models.CharField(max_length=20, null=False)
    student_2=models.CharField(max_length=20, null=False)
    section=models.CharField(max_length=3, choices=SECTION_CHOICES)
    password=models.CharField(max_length=15, null=False)
    registered_at = models.DateTimeField(auto_now_add=True)
    phase0 = models.FloatField(max_length=3, null=False, default=0)
    phase1 = models.FloatField(max_length=3, null=False, default=0)
    phase2 = models.FloatField(max_length=3, null=False, default=0)

class StudentLogin(models.Model):
    batch=models.CharField(max_length=3, null=False)
    password=models.CharField(max_length=15, null=False)
    login_at=models.DateTimeField(auto_now_add=True)

class GetTopics(models.Model):
   name=models.CharField(max_length=100, null=False,blank=True)
   description=models.CharField(max_length=1500, null=False,blank=True)
   selected_by=models.CharField(max_length=3,null=False,blank=True) 
   faculty=models.CharField(max_length=20,null=True,blank=True)
   id_topic=models.CharField(max_length=50,null=True,blank=True) 

class SelectedTopics(models.Model):
   name=models.CharField(max_length=20, null=False)
   batchid=models.CharField(max_length=3,null=False)  

class AdminLogin(models.Model):
   userid=models.CharField(max_length=20, null=False)
   password=models.CharField(max_length=30,null=False)  

class AuthToken(models.Model):
   token=models.CharField(max_length=200, null=False)  

class StudentTopicAcceptReject(models.Model):
   name=models.CharField(max_length=30, null=False)
   description=models.CharField(max_length=1500, null=False)
   selected_by=models.CharField(max_length=3,null=False,blank=True) 
   faculty=models.CharField(max_length=20,null=True,blank=True) 
   status=models.CharField(max_length=10, null=True, blank=True)   


class Notify(models.Model):
   status=models.CharField(max_length=30, null=False)



class AbstractUpload(models.Model):
    batch=models.CharField(max_length=4, null=False)
    file = models.FileField()
   #  uploaded_at = models.DateTimeField(auto_now_add=True)

class SpecifcPhaseMarks(models.Model):
    student_leader=models.CharField(max_length=20, null=False)
    student_1=models.CharField(max_length=20, null=False)
    student_2=models.CharField(max_length=20, null=True,blank=True)
    phase=models.FloatField(max_length=3,null=False)
       
    
      
    