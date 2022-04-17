from django.urls import path,include
from rest_framework import routers
from .views import StudentViewSet, StudentLoginViewSet, StudentTopics
from main import views;
router=routers.DefaultRouter()
router.register('student/signin',StudentViewSet)
router.register('student/login', StudentLoginViewSet)
router.register('student/gettopics', StudentTopics)
urlpatterns=[
    path('',include(router.urls)),
]