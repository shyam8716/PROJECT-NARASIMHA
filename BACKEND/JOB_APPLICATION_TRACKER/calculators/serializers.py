# serializers.py
from rest_framework import serializers
from .models import Calculators

class Calculatorsserializers(serializers.ModelSerializer):
    class Meta:
        model = Calculators
        fields = ["id", "number1", "number2", "operation", "result"]  # make sure 'result' is included
