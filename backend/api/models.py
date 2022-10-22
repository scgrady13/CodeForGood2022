from django.db import models
from django.contrib.auth import get_user_model

class HealthData(models.Model):
  user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)  
  heart_rate = models.IntegerField()
  temperature = models.FloatField()
  time_stamp = models.DateTimeField()
