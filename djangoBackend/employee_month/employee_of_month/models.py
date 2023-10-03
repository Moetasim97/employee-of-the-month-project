from django.db import models
from django.contrib.auth.models import User
from datetime import date
import os


class Admin(models.Model):
    admin_user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return self.admin_user.username


def get_image_upload_path(instance, filename):
    return os.path.join('employee_photos', str(instance.id), filename)


class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to=get_image_upload_path)
    phone = models.CharField(max_length=11)
    job_title = models.CharField(max_length=100)
    # Indicates if the employee is selected for the current month
    selected = models.BooleanField(default=False)
    # Counts how many times the employee has been selected
    counter = models.PositiveIntegerField(default=0)
    # Month and year when the employee was last selected
    selected_month = models.DateField(null=True, blank=True)

    def __str__(self) -> str:
        return self.user.username
