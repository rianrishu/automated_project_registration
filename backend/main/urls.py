from email.mime import base
from django.urls import path,include
from rest_framework import routers
from .views import AdminLoginViewSet, LeaveHomePage, StudentViewSet, StudentLoginViewSet, StudentTopics, UserInHomepage, StudentNewTopic, FacultyDetailViewSet , AdminGetalltopics

router=routers.DefaultRouter()
router.register('student/signin',StudentViewSet)
router.register('student/login', StudentLoginViewSet)
router.register('student/gettopics', StudentTopics)
router.register('student/addnewtopic', StudentNewTopic)
router.register('student/leave-homepage', LeaveHomePage, basename='MyModel')
router.register('student/user-in-homepage', UserInHomepage, basename='homepage')
router.register('admin1/login',AdminLoginViewSet)
router.register('admin1/getalltopics',AdminGetalltopics,basename='getalltopic')
router.register('admin1/addnewtopic',StudentNewTopic)
router.register('faculty/detail',FacultyDetailViewSet, basename='facultydetail')
urlpatterns=[
    path('',include(router.urls)),
]