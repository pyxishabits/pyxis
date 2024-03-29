from django.urls import include, path
from .views import *
from . import views

appname = 'apis'
urlpatterns = [
    path('habits/', HabitView.as_view()),  # all habits
    path('habits/<int:pk>/', HabitDetail.as_view()),  # CRUD
    path('habits/new/', CreateHabit.as_view()),

    path('habittask/', HabitTaskView.as_view()),
    path('habittask/new/', CreateHabitTask.as_view()),
    path('habittask/<int:pk>/done/', DoneHabitTask.as_view()),
    path('habits/donetoday/', CompletedHabitTask.as_view()),

    path('tasks/<int:pk>/', TaskView.as_view()),
    path('tasks/', TaskPerDay.as_view()),
    path('tasks/donetoday/', CompletedTasks.as_view()),
    path('tasks/new/', CreateTask.as_view()),
    path('tasks/<int:pk>/done/', DoneTask.as_view()),
    path('journal/', get_journal),
    path('journal/<int:pk>/edit/', JournalEdit.as_view()),

    path('current/', views.current_user, name='current_user'),
    path('edit/<int:pk>/', ThemeEdit.as_view())
]
