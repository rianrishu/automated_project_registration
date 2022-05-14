from email.mime import base
from django.urls import path,include
from rest_framework import routers
from .views import AdminLoginHandle, LeaveHomePage, StudentViewSet, StudentLoginViewSet, StudentTopics, UserInHomepage

router=routers.DefaultRouter()
router.register('student/signin',StudentViewSet)
router.register('student/login', StudentLoginViewSet)
router.register('student/gettopics', StudentTopics)
router.register('student/leave-homepage', LeaveHomePage, basename='MyModel')
router.register('student/user-in-homepage', UserInHomepage, basename='homepage')
router.register('chap/login', AdminLoginHandle)
urlpatterns=[
    path('',include(router.urls)),
]