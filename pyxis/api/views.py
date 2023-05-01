from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.models import *
from django.utils import timezone
from django.contrib.auth.models import User
from .serializers import HabitSerializer, TaskSerializer, JournalSerializer, UserSerializer, HabitTaskSerializer
import datetime

class HabitView(generics.ListAPIView):
    serializer_class = HabitSerializer

    # queryset = Habit.objects.all()

    # NEEDS EITHER ABOVE OR BELOW ^ v

    # def get_queryset(self):
    #     user = self.request.user
    #     user_habits = Habit.objects.filter(user=user)
    #     today = datetime.date.today()  # 2023-05-01 format
    #     return user_habits.filter(schedule=today)

class HabitDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer
    # queryset = Habit.objects.all()

class HabitTaskView(generics.ListAPIView):
    serializer_class = HabitTaskSerializer
    # queryset = HabitTask.objects.all()

class TaskView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()
    # queryset = Task.objects.filter(date= timezone.now())

class JournalView(generics.ListAPIView):
    serializer_class = JournalSerializer
    # queryset = Journal.objects.all()

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
