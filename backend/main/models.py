from datetime import datetime
from email.policy import default
from operator import mod
from re import T
from sqlite3 import Date
from statistics import mode
from django import forms
from django.db import models
from django.forms import Widget
from pkg_resources import require

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

class StudentLogin(models.Model):
    batch=models.CharField(max_length=3, null=False)
    password=models.CharField(max_length=15, null=False)
    login_at=models.DateTimeField(auto_now_add=True)
    