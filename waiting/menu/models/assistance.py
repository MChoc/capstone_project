from django.db import models

from accounts.models import CustomUser
from menu.models.transaction import Transaction


class Assistance(models.Model):
    transaction = models.ForeignKey(
        Transaction,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    waiter = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        null=True,
        blank=True
    )
    problem = models.CharField(max_length=1024)
    notes = models.CharField(max_length=2048, null=True, blank=True)
    resolved = models.BooleanField(default=False)
