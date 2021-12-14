from django.db import models


class Subject(models.Model):
    name = models.CharField(max_length=300)

    def __str__(self):
        return self.name


class Teacher(models.Model):
    first_name = models.CharField(max_length=300, blank=True, null=True)
    last_name = models.CharField(max_length=300, blank=True, null=True)
    profile_picture = models.CharField(max_length=300, blank=True, null=True)
    email = models.CharField(max_length=300, unique=True, blank=True, null=True)
    phone_number = models.CharField(max_length=300, blank=True, null=True)
    room_number = models.CharField(max_length=300, blank=True, null=True)
    subject = models.ManyToManyField(Subject)

    def __str__(self):
        return self.first_name+" "+self.last_name
