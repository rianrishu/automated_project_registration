from dataclasses import field, fields
from pyexpat import model
from rest_framework import serializers
from .models import *

class StudentSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(
    #     write_only=True,
    #     required=True,
    #     help_text='Leave empty if no change needed',
    #     style={'input_type': 'password', 'placeholder': 'Password'}
    # )
    class Meta:
        model=Student
        fields=('student_leader','student_1','student_2','section','password','phase0', 'phase1', 'phase2',)

    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data.get('password'))
    #     return super(StudentSerializer, self).create(validated_data)    


class StudentLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentLogin
        fields=('batch','password','login_at')

    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data.get('password'))
    #     return super(StudentSerializer, self).create(validated_data)       

class StudentTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model=GetTopics
        fields=('name','description','selected_by','faculty','id_topic')

class StudentSelectedTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model=SelectedTopics
        fields=('name','batchid')   

class StudentSelectedTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model=SelectedTopics
        fields=('name','batchid')              

class AdminLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=AdminLogin
        fields=('userid','password')         

class StudentTopicAcceptRejectSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentTopicAcceptReject
        fields=('name','description','selected_by','faculty','status')

class FacultyLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=AdminLogin
        fields=('userid','password')

class FacultyUpdatePasswordSerializer(serializers.ModelSerializer):
    class Meta:
        model=AdminLogin
        fields=('userid','password')                 


class AuthTokenSerializer(serializers.ModelSerializer):
    class Meta:
        model=AuthToken
        fields=('token',)   

class NotifySerializer(serializers.ModelSerializer):
    class Meta:
        model=Notify
        fields=('status',) 

class FacultyGetBatchListSerializer(serializers.ModelSerializer):
    class Meta:
        model=AdminLogin
        fields=('userid',)


class GetSetPhaseMarksSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(
    #     write_only=True,
    #     required=True,
    #     help_text='Leave empty if no change needed',
    #     style={'input_type': 'password', 'placeholder': 'Password'}
    # )
    class Meta:
        model=Student
        fields=('student_leader','phase0', 'phase1', 'phase2',)

class StudentAbstractUploadSerializer(serializers.ModelSerializer):
    class Meta:
        model=AbstractUpload
        fields=('batch', 'file',)

class SpecifcPhaseMarksSerializer(serializers.ModelSerializer):
    class Meta:
        model=SpecifcPhaseMarks
        fields=('student_leader', 'student_1','student_2','phase')