from django.db import models
from django.utils import timezone

from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    tz = timezone.get_current_timezone()

    def __str__(self):
        return self.username