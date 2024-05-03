from rest_framework import serializers
from myapi.models import React

# class BookSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Book
#         fields = (
#             "id",
#             "title",
#             "author",
#             "description",
#             "sales",
#             "published",
#             "created_at",
#             "updated_at",
#         )

class ReactSerializers(serializers.ModelSerializer):
    class Meta:
        model = React
        fields = ['id', 'name']

        def create(self, validate_data):
            return React.objects.create(**validate_data)