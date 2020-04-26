from django.db import models


class CreditCard(models.Model):
    number = models.BigIntegerField(unique=True)
    expiry_month = models.IntegerField()
    expiry_year = models.IntegerField()
    cvv = models.IntegerField()
