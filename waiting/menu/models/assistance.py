from django.db import models

from accounts.models import CustomUser
from menu.models.problem import Problem
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
    problems = models.ManyToManyField(Problem)
    notes = models.CharField(max_length=2048, null=True, blank=True)
    resolved = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    date_resolved = models.DateTimeField(null=True, blank=True)
