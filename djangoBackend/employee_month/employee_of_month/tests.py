from django.test import TestCase
from django.urls import reverse
from django.contrib.auth.models import User
from .models import Employee, EmployeeOfTheMonth, WinnerInteractions

class EmployeeTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.employee = Employee.objects.create(
            user=self.user,
            name='Test Employee',
            phone='1234567890',
            selection_counter=0,
            job_title='Test Job Title'
        )
        self.employee_of_the_month = EmployeeOfTheMonth.objects.create(
            employee=self.employee,
            month='2023-01-01',
            description='Test description',
            is_selected_for_month=True,
            likes=0
        )

    def test_employee_str(self):
        self.assertEqual(str(self.employee), 'Test Employee')

    def test_employee_view(self):
        response = self.client.get(reverse('return_employee', args=(self.employee.user.id,)))
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data['name'], 'Test Employee')


class WinnerInteractionsTests(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            password='testpassword'
        )
        self.employee = Employee.objects.create(
            user=self.user,
            name='Test Employee',
            phone='1234567890',
            selection_counter=0,
            job_title='Test Job Title'
        )
        self.employee_of_the_month = EmployeeOfTheMonth.objects.create(
            employee=self.employee,
            month='2023-01-01',
            description='Test description',
            is_selected_for_month=True,
            likes=0
        )
