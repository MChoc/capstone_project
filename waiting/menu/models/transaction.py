from accounts.models import CustomUser

from django.db import models


class Transaction(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    customer = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='customer'
    )
