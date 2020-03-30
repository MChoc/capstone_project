from menu.models.menu import Menu

from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=200)
    active = models.BooleanField(default=True)
    menu = models.ForeignKey(
        Menu,
        related_name='categories',
        on_delete=models.CASCADE
    )
    
    class Meta:
        verbose_name_plural = 'categories'

    def __str__(self):
        return self.name
