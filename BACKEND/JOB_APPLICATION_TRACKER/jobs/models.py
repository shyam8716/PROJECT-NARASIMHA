from django.db import models

# Create your models here.
class JobApplication(models.Model):
    STATUS_CHOICES = [
        ('Applied', 'Applied'),
        ('Interview', 'Interview'),
        ('Offered', 'Offered'),
        ('Rejected', 'Rejected'),
    ]
    company=models.CharField(max_length=50)
    role=models.CharField(max_length=50)
    applied_date=models.DateField()
    notes = models.TextField(blank=True)
    email=models.EmailField(unique=True)
    phone_number=models.CharField(max_length=50)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Applied')

def __str__(self):
        return f"{self.company} - {self.role}"