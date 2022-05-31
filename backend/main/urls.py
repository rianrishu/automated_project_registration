from email.mime import base
from django.urls import path,include
from rest_framework import routers
from .views import AdminGetTopicAddedByStudent, AdminLoginViewSet, FacultyLoginViewSet, FacultyNotifyHandler, FacultyUpdatePasswordViewSet, LeaveHomePage, StudentShowTopicHandler, StudentTopicAcceptRejectHandler, StudentViewSet, StudentLoginViewSet, StudentTopics, UserInHomepage, StudentNewTopic, FacultyDetailViewSet , AdminGetalltopics ,   FacultyCreateViewSet

router=routers.DefaultRouter()
router.register('student/signin',StudentViewSet)
router.register('student/login', StudentLoginViewSet)
router.register('student/gettopics', StudentTopics)
router.register('student/addnewtopic', StudentNewTopic)
router.register('student/leave-homepage', LeaveHomePage, basename='MyModel')
router.register('student/user-in-homepage', UserInHomepage)
router.register('admin1/login',AdminLoginViewSet)
router.register('admin1/getalltopics',AdminGetalltopics,basename='getalltopic')
router.register('admin1/addnewtopic',StudentNewTopic)
router.register('faculty/detail',FacultyDetailViewSet, basename='facultydetail')
router.register('admin1/get-topic-student', AdminGetTopicAddedByStudent, basename='get-topic-student')
router.register('admin1/topic-accept-reject', StudentTopicAcceptRejectHandler, basename='accept/reject admin')
router.register('faculty/login', FacultyLoginViewSet),
router.register('faculty/update-password', FacultyUpdatePasswordViewSet)
router.register('admin1/createfaculty',  FacultyCreateViewSet)
router.register('notify/faculty',  FacultyNotifyHandler, basename="notify faculty to add topic")
router.register('notify/student',  StudentShowTopicHandler, basename="option to show or hide topic list to students")
urlpatterns=[
    path('',include(router.urls)),
]