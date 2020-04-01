from django.db import models


class CreditCard(models.Model):
    number = models.BigIntegerField()
    expiry_month = models.IntegerField()
    expiry_year = models.IntegerField()
    cvs = models.IntegerField()
