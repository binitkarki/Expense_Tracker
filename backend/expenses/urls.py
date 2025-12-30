
from django.urls import path
from .views import (
    RegisterView, MeView,
    CategoryListCreateView, CategoryUpdateView,
    TransactionListCreateView, TransactionDetailView,
)

urlpatterns = [
    path("register/", RegisterView.as_view(), name="register"),
    path("me/", MeView.as_view(), name="me"),
    path("categories/", CategoryListCreateView.as_view(), name="categories"),
    path("categories/<int:pk>/", CategoryUpdateView.as_view(), name="category_detail"),
    path("transactions/", TransactionListCreateView.as_view(), name="transactions"),
    path("transactions/<int:pk>/", TransactionDetailView.as_view(), name="transaction_detail"),
]
