from menu.models.category import Category

from django.db import models


class Extra(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name='extras'
    )

    def __str__(self):
        return self.name
