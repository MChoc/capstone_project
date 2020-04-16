from django.db import models


class Discount(models.Model):
    name = models.CharField(max_length=200)
    amount = models.IntegerField()
    TYPE_CHOICES = (
        ('PERCENTAGE', '%'),
        ('DOLLAR', 'Dollar'),
    )
    type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        default='PERCENTAGE'
    )

    def __str__(self):
        return self.name
