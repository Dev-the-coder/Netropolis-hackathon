from django.db import models

class Quest(models.Model):
    active = models.CharField(max_length=10, default="false")
    datetime = models.DateTimeField()
    location = models.CharField(max_length=100)
    provided_by = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    duration = models.CharField(max_length=100)
    description = models.CharField(max_length=1000)
    points = models.IntegerField()
    fee = models.IntegerField()
    allowance = models.IntegerField()
    tags = models.CharField(max_length=100)
    comManagerId = models.IntegerField()

    class Meta:
        db_table = "quest"
 
class QuestRegistration(models.Model):
    quest = models.ForeignKey(Quest, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    status = models.CharField(max_length=10, default="Waiting")
    # make sure that the user is not registered for the same quest more than once
    class Meta:
        unique_together = ('quest', 'user')
        db_table = "quest_registration"