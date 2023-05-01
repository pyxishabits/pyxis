from django.contrib import admin
from .models import Habit, HabitTask, Task, Journal

# Register your models here.
admin.site.register(Habit)
admin.site.register(HabitTask)
admin.site.register(Task)
admin.site.register(Journal)