from __future__ import unicode_literals

from django.db import models
from django.utils import timezone

class Post(models.Model):
	title = models.CharField(max_length=200)
	text = models.TextField()
	value = models.BooleanField(default=False)

class DataUpdate(models.Model):
    value = models.BooleanField()