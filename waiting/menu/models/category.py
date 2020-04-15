from django.db import models

from menu.models.menu import Menu


class Category(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    menu = models.ForeignKey(
        Menu,
        on_delete=models.CASCADE,
        related_name='categories'
    )

    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name
