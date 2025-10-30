from rest_framework import serializers
from .models import Calculators

class Calculatorsserializers(serializers.ModelSerializer):
    created_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Calculators
        fields = '__all__'
        read_only_fields = ['result', 'created_at']

    def get_created_at(self, obj):
        # Return directly if already a date
        return obj.created_at if isinstance(obj.created_at, (str,)) else obj.created_at.isoformat()[:10]

