# Expense_Tracker/expense/serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Category, Transaction

# Profile serializer without image
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["first_name", "last_name"]  # no image field

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "first_name", "last_name", "email", "password", "profile"]

    def create(self, validated_data):
        profile_data = validated_data.pop("profile", {})
        password = validated_data.pop("password")
        user = User(**validated_data)
        user.set_password(password)
        user.save()

        # ensure profile exists and update names if provided
        profile = user.profile
        if "first_name" in profile_data:
            profile.first_name = profile_data["first_name"]
        if "last_name" in profile_data:
            profile.last_name = profile_data["last_name"]
        profile.save()
        return user

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "color", "kind"]

class TransactionSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True,
        required=False
    )

    class Meta:
        model = Transaction
        fields = [
            "id",
            "kind",
            "title",
            "amount",
            "category",
            "category_id",
            "description",
            "date",
            "created_at",
        ]

    def create(self, validated_data):
        user = self.context["request"].user
        validated_data["user"] = user
        return super().create(validated_data)
