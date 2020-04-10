from django.db import models


class Discount(models.Model):
    name = models.CharField(max_length=200)
    amount = models.IntegerField()
    DISCOUNT_CHOICES = (
        ('PERCENTAGE', '%'),
        ('DOLLAR', 'Dollar'),
    )
    discount = models.CharField(
        max_length=10,
        choices=DISCOUNT_CHOICES,
        default='PERCENTAGE'
    )

    def __str__(self):
        return self.name
