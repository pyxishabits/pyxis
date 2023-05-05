from django.db import models
from django.contrib.auth.models import User
from django.core.validators import validate_comma_separated_integer_list
from datetime import date


class Habit(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=150, null=True, blank=True)
    recurrence = models.CharField(
        validators=[validate_comma_separated_integer_list], max_length=14)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    start_date = models.DateField(default=date.today)
    end_date = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.name


class HabitTask(models.Model):
    date = models.DateField()
    completed_time = models.DateTimeField(null=True, blank=True)
    habit = models.ForeignKey(Habit, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'{self.habit} for {self.date}'


class Task(models.Model):
    name = models.CharField(max_length=50)
    description = models.CharField(max_length=1000, null=True, blank=True)
    date = models.DateField()
    completed_time = models.DateTimeField(null=True, blank=True)
    is_urgent = models.BooleanField(default=False)
    is_important = models.BooleanField(default=False)
    due_date = models.DateTimeField(null=True, blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.name


class Journal(models.Model):
    entry = models.CharField(null=True, blank=True, max_length=3000)
    date = models.DateField()
    time_updated = models.DateTimeField(null=True, auto_now=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f'Journal entry for {self.date}'
