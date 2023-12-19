from django.db import models

# Create your models here.
class Movie(models.Model):
    name = models.CharField(
        max_length=255,
        null=False,
        blank=False,
    )
    release_date = models.DateField()
    summary = models.CharField(
        max_length=1000,
        )
    img_src = models.CharField(max_length=255, blank=True, null=True)