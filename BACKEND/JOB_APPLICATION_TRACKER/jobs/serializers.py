from rest_framework import serializers
from .models import JobApplication
class Jobserializers(serializers.ModelSerializer):
    class  Meta:
        model=JobApplication
        fields='__all__'