# finance/expenses/models.py
from django.db import models
from django.contrib.auth.models import User

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = models.CharField(max_length=50, blank=True)
    last_name = models.CharField(max_length=50, blank=True)
    

    def __str__(self):
        return self.user.username

class Category(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="categories")
    name = models.CharField(max_length=50)
    color = models.CharField(max_length=7, default="#36a2eb")  # hex color like #36a2eb
    kind = models.CharField(max_length=10, choices=(("expense","expense"),("income","income")))

    class Meta:
        unique_together = ("user", "name", "kind")

    def __str__(self):
        return f"{self.name} ({self.kind})"

class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="transactions")
    kind = models.CharField(max_length=10, choices=(("expense","expense"),("income","income")))
    title = models.CharField(max_length=100, blank=True)  # optional for income
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)
    description = models.TextField(blank=True)
    date = models.DateField(auto_now_add=True)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.kind} {self.amount} - {self.category and self.category.name}"
