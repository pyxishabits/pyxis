from django.urls import include, path
from .views import *
from . import views

appname = 'apis'
urlpatterns = [
    path('habits/', HabitView.as_view()), #all habits
    path('habits/<int:pk>/', HabitDetail.as_view()), #CRUD
    path('tasks/<int:pk>/', TaskView.as_view()),
    path('tasks/', TaskToday.as_view()),
    path('tasks/new/', CreateTask.as_view()),
    path('tasks/<int:pk>/done/', DoneTask.as_view()),
    path('journal/', get_journal),
    path('journal/<int:pk>/edit/', JournalEdit.as_view()),
    path('journal/new/', CreateJournal.as_view()),
    path('', views.current_user, name='current_user'), 
]