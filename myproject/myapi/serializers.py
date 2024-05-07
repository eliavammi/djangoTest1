from rest_framework import serializers
from myapi.models import React
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from django.dispatch import receiver
from django.conf import settings
from django.db.models.signals import post_save



class ReactSerializers(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['id', 'name', 'cognome']

        def create(self, validate_data):
            return React.objects.create(**validate_data)

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    def create(self, validate_data):
            return User.objects.create_user(
                username=validate_data['username'],
                password=validate_data['password'],
            )

    class Meta: 
        model = User
        fields = ['username', 'email', 'password']

    @receiver(post_save, sender=settings.AUTH_USER_MODEL)
    def create_auth_token(sender, instance=None, created=False, **kwargs):
        if created:
            Token.objects.create(user=instance)
