from django.urls import path
from .views import *
from . import views

appname = 'apis'
urlpatterns = [
    path('habits/', HabitView.as_view()),
    path('habits/<int:pk>/', HabitDetail.as_view()),
    path('tasks/', TaskView.as_view()),
    path('journal/', JournalView.as_view()),
    path('', views.current_user, name='current_user'),
]