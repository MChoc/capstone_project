from django.db import models


class Menu(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Category(models.Model):

    class Meta:
        verbose_name_plural = 'categories'

    name = models.CharField(max_length=200)
    menu = models.ForeignKey(
        Menu,
        related_name='categories',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name


class FoodItem(models.Model):
    name = models.CharField(max_length=200)
    price = models.DecimalField(max_digits=6, decimal_places=2)
    category = models.ForeignKey(
        Category,
        related_name='food_items',
        on_delete=models.CASCADE
    )

    def __str__(self):
        return self.name
