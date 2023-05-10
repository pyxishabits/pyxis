from rest_framework import generics
from rest_framework.decorators import api_view
from rest_framework.response import Response
from tasks.models import *
from django.utils import timezone
from .serializers import *
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


# return the days habits - will be similar to doneTask
# returns users habits-related-task for one day
class HabitTaskView(generics.ListAPIView):
    serializer_class = HabitTaskSerializer

    # TODO: get by any given date, not just today
    def get_queryset(self):
        date = datetime.strptime(self.request.GET.get('date'), '%Y-%m-%d').date()
        habits = self.request.user.habit_set.all()
        habit_tasks = HabitTask.objects.filter(date=date)
        return filter(lambda h: h.habit in habits, habit_tasks)

    # def get_queryset(self):
    #     return HabitTask.objects.filter(date=timezone.now().date(), user=self.request.user)


# make a 'create' endpoint
class CreateHabitTask(generics.CreateAPIView):
    serializer_class = HabitTaskWriteSerializer
    queryset = HabitTask.objects.all()


# custom update to toggle done/or not
class DoneHabitTask(generics.UpdateAPIView):
    serializer_class = HabitTaskSerializer
    queryset = HabitTask.objects.all()

    def perform_update(self, serializer):
        habit = HabitTask.objects.get(pk=self.kwargs['pk'])

        if habit.completed_time is None:
            serializer.save(completed_time=timezone.now())
        else:
            serializer.save(completed_time=None)


class TaskView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()


class TaskPerDay(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        date = datetime.strptime(self.request.GET.get('date'), '%Y-%m-%d').date()
        return Task.objects.filter(user=self.request.user, date__lte=date, completed_time=None)


class CompletedTasks(generics.ListAPIView):
    serializer_class = TaskSerializer

    def get_queryset(self):
        date = datetime.strptime(self.request.GET.get('date'), '%Y-%m-%d').date()
        return Task.objects.filter(user=self.request.user, completed_time__contains=date)


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

