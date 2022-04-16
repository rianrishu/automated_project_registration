from django.urls import path,include
from rest_framework import routers
from .views import GetTopics, StudentViewSet, StudentLoginViewSet

router=routers.DefaultRouter()
router.register('student/signin',StudentViewSet)
router.register('student/login', StudentLoginViewSet)
router.register('get-topics', GetTopics)
urlpatterns=[
    path('',include(router.urls))
]