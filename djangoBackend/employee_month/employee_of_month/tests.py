from django.test import TestCase
from django.contrib.auth.models import User
from .models import Employee, EmployeeOfTheMonth
from django.urls import reverse


class EmployeeTestCase(TestCase):
    def setUp(self):
        """
        Set up the test environment by creating test users and employees.
        """

        self.test_user = User.objects.create_user(
            username='testuser', password='testpassword'
        )

        # Create a test employee
        self.test_employee = Employee.objects.create(
            user=self.test_user,
            name='Test Employee',
            photo='employee_photos/test.jpg',
            phone='1234567890',
            selection_counter=0,
            job_title='Tester',
        )

    def test_employee_of_the_month_selection(self):
        """
        Test the selection of Employee of the Month and its effects.
        """

        second_user = User.objects.create_user(
            username='seconduser', password='secondpassword'
        )
        second_employee = Employee.objects.create(
            user=second_user,
            name='Second Employee',
            photo='employee_photos/second.jpg',
            phone='9876543210',
            selection_counter=0,
            job_title='Developer',
        )

        url = 'admin:employee_of_month_employee_changelist'

        response = self.client.get(reverse(url))

        self.assertContains(response, 'Select Employee of the Month')

        response = self.client.post(
            reverse('admin:employee_app_employee_changelist'),
            {'action': 'make_employee_of_the_month',
                '_selected_action': self.test_employee.pk},
        )

        self.assertContains(
            response, f'Successfully selected {self.test_employee} as Employee of the Month.'
        )

        self.test_employee.refresh_from_db()
        self.assertEqual(self.test_employee.selection_counter, 1)

        second_employee.refresh_from_db()
        self.assertEqual(second_employee.selection_counter, 0)
