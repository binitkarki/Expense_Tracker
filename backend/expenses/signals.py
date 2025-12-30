from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from .models import Profile, Category

DEFAULT_EXPENSE = [
    ("Dining", "#ff6384"),
    ("Groceries", "#36a2eb"),
    ("Shopping", "#ffce56"),
    ("Transit", "#4bc0c0"),
    ("Gift", "#9966ff"),
    ("Bills & Fees", "#ff9f40"),
    ("Entertainment", "#c9cbcf"),
    ("Travel", "#8dd3c7"),
]
DEFAULT_INCOME = [("Salary", "#28a745")]

@receiver(post_save, sender=User)
def create_profile_and_defaults(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
        for name, color in DEFAULT_EXPENSE:
            Category.objects.create(user=instance, name=name, color=color, kind="expense")
        for name, color in DEFAULT_INCOME:
            Category.objects.create(user=instance, name=name, color=color, kind="income")
