from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = (
        ('CUSTOMER', 'Customer'),
        ('WAITER', 'Waiter'),
        ('KITCHEN', 'Kitchen'),
        ('MANAGER', 'Manager'),
    )
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    # TODO: figure out how to create manager using `python manage.py createsuperuser`
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='MANAGER')
