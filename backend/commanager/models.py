from django.db import models

class ComManager(models.Model):
    name = models.CharField(max_length=100)
    dob = models.DateField()
    location = models.CharField(max_length=100)
    area = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    
    class Meta:
        db_table = 'com_manager'