from django.urls import path,include
from rest_framework import routers
from .views import LeaveHomePage, StudentViewSet, StudentLoginViewSet, StudentTopics

router=routers.DefaultRouter()
router.register('student/signin',StudentViewSet)
router.register('student/login', StudentLoginViewSet)
router.register('student/gettopics', StudentTopics)
router.register('student/leave-homepage', LeaveHomePage, basename='MyModel')
urlpatterns=[
    path('',include(router.urls)),
]