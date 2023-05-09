from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    COLOR_OPTIONS = (('D','dark'),('L','light'))
    timezone = models.CharField(max_length=40, null=True, blank=True)
    color_theme = models.CharField(choices=COLOR_OPTIONS, max_length=1, default='L')
    def __str__(self):
        return self.username
    