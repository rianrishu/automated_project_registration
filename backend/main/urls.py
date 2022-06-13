from email.mime import base
from django.urls import path,include
from rest_framework import routers

from .serializers import FacultyGetBatchListSerializer
from .views import *
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
router.register('notify/student-get',  StudentShowTopicHandlerGet, basename="get option to show or hide topic list to students")
router.register('notify/student-post',  StudentShowTopicHandlerPost, basename="update option to show or hide topic list to students")
router.register('faculty/batch-details', GetBatchListFaculty, basename="a")
router.register('faculty/getsetphase', GetSetPhaseMarks, basename="get set phase marks")
router.register('student/upload-abstract', AbstractUploadHandler, basename="upload abstract")
router.register('student/download-abstract', AbstractDownloadHandler, basename="download abstract")
router.register('faculty/get_phase_marks',GetSpecificPhaseMarks)
router.register('faculty/update-marks', UpdatePhaseMarksHandler,  basename="updating phase marks")
urlpatterns=[
    path('',include(router.urls)),
]