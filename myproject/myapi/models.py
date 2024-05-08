from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import datetime



class React(models.Model):
    name = models.CharField(max_length=100)
    cognome = models.CharField(max_length=100, default='nessuno')
    creationDate = models.DateTimeField(auto_now_add=True, blank=True)
    updateDate = models.DateTimeField(auto_now=True, blank=True)
    
