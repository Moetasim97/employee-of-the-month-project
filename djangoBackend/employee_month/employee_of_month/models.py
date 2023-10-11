from django.contrib.auth.models import User
from django.utils import timezone
from django.db import models
import os
import calendar


def get_image_upload_path(instance, filename):
    return os.path.join('employee_photos', str(instance.id), filename)


class EmployeeOfTheMonthManager(models.Manager):

    def get_top_3_winners(self):
        return Employee.objects.filter(selection_counter__gt=0).order_by('-selection_counter')[:3]


    def select_employee_of_the_month(self,selected_employee):
        """Selects the given employee as the employee of the month and unchecks the previous employee of the month for the current month."""
        
        current_month_year = timezone.now().replace(day=1)

        previous_employee_of_month = self.filter(is_selected_for_month=True).first()

        if previous_employee_of_month:
            previous_employee_of_month.is_selected_for_month = False
            previous_employee_of_month.save()
            
        
        print("Selected employee:",selected_employee)
            
        #Increment the selection_counter of the selected employee
        if isinstance(selected_employee, Employee):
            selected_employee.selection_counter += 1
            selected_employee.save()

            selected_employee_of_month = EmployeeOfTheMonth(
                employee=selected_employee,
                month=current_month_year,
                is_selected_for_month=True
            )
            selected_employee_of_month.save()
        else:
            pass

        # I need to add code to handle the comments and the likes of the previous employee of the
class Employee(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)  # Define the 'name' field
    photo = models.ImageField(upload_to=get_image_upload_path)
    phone = models.CharField(max_length=11)
    selection_counter = models.PositiveIntegerField(default=0)
    job_title = models.CharField(max_length=255)
    liked_eotm = models.BooleanField(default=False)

    objects = EmployeeOfTheMonthManager()
    
    def __str__(self):
        return self.name

class EmployeeOfTheMonth(models.Model):
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE,related_name='employee_of_the_month')
    month = models.DateField()
    description = models.TextField(blank=True)
    is_selected_for_month = models.BooleanField(default=False)
    likes = models.IntegerField(null=True,default=0)
    

    objects = EmployeeOfTheMonthManager()

    def __str__(self) -> str:
        month_name = calendar.month_name[self.month.month]
        return f"{month_name} {self.month.year} - {self.employee.user.get_full_name()}"
    

class WinnerInteractions(models.Model):
    current_winner = models.ForeignKey('EmployeeOfTheMonth',on_delete=models.CASCADE)
    commenter = models.ForeignKey('Employee',on_delete=models.CASCADE)
    comment = models.CharField(max_length=255)
