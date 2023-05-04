from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.models import *
from django.utils import timezone
from .serializers import HabitSerializer, TaskSerializer, JournalSerializer, UserSerializer, HabitTaskSerializer
from datetime import datetime


class HabitView(generics.ListAPIView):
    serializer_class = HabitSerializer

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)


class HabitDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer

    def get_queryset(self):
        return Habit.objects.filter(user=self.request.user)


class CreateHabit(generics.CreateAPIView):
    serializer_class = HabitSerializer
    queryset = Habit.objects.all()


class HabitTaskView(generics.ListAPIView):
    serializer_class = HabitTaskSerializer
    # queryset = HabitTask.objects.all()

# return the days habits - will be similar to doneTask
# make a 'create' endpoint
# custom update to toggle done/or not


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskToday(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        return Task.objects.filter(date=timezone.now().date(), user=self.request.user)


class CreateTask(generics.CreateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class DoneTask(generics.UpdateAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

    def perform_update(self, serializer):
        task = Task.objects.get(pk=self.kwargs['pk'])

        if task.completed_time is None:
            serializer.save(completed_time=timezone.now())
        else:
            serializer.save(completed_time=None)


@api_view(['GET'])
def get_journal(request):
    date = datetime.strptime(request.GET.get('date'), '%Y-%m-%d').date()
    journal, created = Journal.objects.get_or_create(
        user=request.user, date=date)
    serializer = JournalSerializer(journal)
    return Response(serializer.data)


class JournalEdit(generics.UpdateAPIView):
    serializer_class = JournalSerializer
    queryset = Journal.objects.all()


@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
