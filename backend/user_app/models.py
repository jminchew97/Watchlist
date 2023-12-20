from django.db import models
from django.contrib.auth.models import AbstractUser
from django.core.validators import EmailValidator
# Create your models here.
class User(AbstractUser):
    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
        validators=[EmailValidator]
    )
    username = models.CharField(
        max_length=50,
        null=False,
        blank=False,
        unique=True
        )
    profile_picture = models.CharField(
        max_length=255
    )
    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = []