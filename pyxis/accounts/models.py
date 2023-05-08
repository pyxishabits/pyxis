from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    timezone = models.CharField(max_length=40, null=True, blank=True)

    def __str__(self):
        return self.username