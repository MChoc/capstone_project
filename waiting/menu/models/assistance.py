from accounts.models import CustomUser
from menu.models.transaction import Transaction

from django.db import models


class Assistance(models.Model):
    transaction = models.ForeignKey(Transaction, on_delete=models.CASCADE)
    waiter = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    problem = models.CharField(max_length=1024)
    notes = models.CharField(max_length=2048, null=True, blank=True)
    resolved = models.BooleanField(default=False)
