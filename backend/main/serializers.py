from rest_framework import serializers
from .models import Student, StudentLogin, Topics

class StudentSerializer(serializers.ModelSerializer):
    # password = serializers.CharField(
    #     write_only=True,
    #     required=True,
    #     help_text='Leave empty if no change needed',
    #     style={'input_type': 'password', 'placeholder': 'Password'}
    # )
    class Meta:
        model=Student
        fields=('student_leader','student_1','student_2','section','password')

    # def create(self, validated_data):
    #     validated_data['password'] = make_password(validated_data.get('password'))
    #     return super(StudentSerializer, self).create(validated_data)    


class StudentLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model=StudentLogin
        fields=('batch','password','login_at')

class TopicsSerializer(serializers.ModelSerializer):
    class Meta:
        model=Topics
        fields=('name', 'description', 'selected_by')