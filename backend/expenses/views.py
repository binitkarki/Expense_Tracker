
from rest_framework import generics, permissions
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from .models import Category, Transaction
from .serializers import UserSerializer, CategorySerializer, TransactionSerializer

# expenses/views.py
from rest_framework.parsers import MultiPartParser, FormParser

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]
    parser_classes = [MultiPartParser, FormParser]

    def perform_create(self, serializer):
        user = serializer.save()
        img = self.request.FILES.get("image")
        if img:
            user.profile.image = img
            user.profile.save()

class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    def get_object(self):
        return self.request.user

class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer

    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CategoryUpdateView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    def get_queryset(self):
        return Category.objects.filter(user=self.request.user)

class TransactionListCreateView(generics.ListCreateAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user).order_by("-created_at")

    def get_serializer_context(self):
        ctx = super().get_serializer_context()
        ctx["request"] = self.request
        return ctx

class TransactionDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        return Transaction.objects.filter(user=self.request.user)
