from django.db import models

# Create your models here.
class Events(models.Model):
    name=models.CharField(max_length=50)
    date=models.DateField(max_length=50)
    location=models.TextField(max_length=50)
    description=models.TextField(max_length=50)

