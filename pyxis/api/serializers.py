from rest_framework import serializers
from django.contrib.auth.models import User
# from app.models import model

class HabitSerializer(serializers.ModelSerializer):
    class Meta:
        # model = model
        fields = ['name', 'description', 'schedule', 'user',
                  'complete']

class HabitTaskSerializer(serializers.ModelSerializer):
    class Meta:
        # model = model
        fields = ['name', 'habit', 'description', 'complete']

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        # model = model
        fields = ['name', 'description', 'priority', 'complete']

class JournalSerializer(serializers.ModelSerializer):
    class Meta:
        # model = model
        fields = ['title', 'date', 'entry']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'id']