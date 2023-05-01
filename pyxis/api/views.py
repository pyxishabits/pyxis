from rest_framework import generics
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from app.models import model
from django.contrib.auth.models import User
from .serializers import HabitSerializer, TaskSerializer, JournalSerializer, UserSerializer

class HabitView(generics.ListAPIView):
    serializer_class = HabitSerializer

    # queryset = Habit.objects.all()

    # NEEDS EITHER ABOVE OR BELOW ^ v

    # def get_queryset(self):
    #     user = self.request.user
    #     return Habit.objects.filter(user=user)

class HabitDetail(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = HabitSerializer
    # queryset = Habit.objects.all()

class TaskView(generics.ListAPIView):
    serializer_class = TaskSerializer
    # queryset = Task.objects.all()

class JournalView(generics.ListAPIView):
    serializer_class = JournalSerializer
    # queryset = Journal.objects.all()

@api_view(['GET'])
def current_user(request):
    serializer = UserSerializer(request.user)
    return Response(serializer.data)
