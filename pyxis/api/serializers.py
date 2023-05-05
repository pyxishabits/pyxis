from rest_framework import serializers
from django.contrib.auth.models import User
from tasks.models import Task, Habit, HabitTask, Journal


class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Habit
        fields = ['id', 'name', 'description', 'recurrence', 'user']


class HabitTaskSerializer(serializers.ModelSerializer):
    habit = HabitSerializer(read_only=True)

    class Meta:
        model = HabitTask
        fields = ['id', 'habit', 'date', 'completed_time']


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['name', 'description', 'date', 'completed_time',
                  'is_urgent', 'is_important', 'due_date', 'user',
                  'id']


class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = Journal
        fields = ['entry', 'date', 'time_updated', 'user', 'id']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']
