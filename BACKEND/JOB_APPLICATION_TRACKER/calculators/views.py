from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Calculators
from .serializers import Calculatorsserializers

@api_view(['GET'])
def Reading_calculator_data(request):
    calculators = Calculators.objects.all()
    serializer = Calculatorsserializers(calculators, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def Creating_calculator_data(request):
    serializer = Calculatorsserializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def Updating_calculator_data(request, id):
    calculator = get_object_or_404(Calculators, id=id)
    serializer = Calculatorsserializers(calculator, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def Deleteing_calculator_data(request, id):
    calculator = get_object_or_404(Calculators, id=id)
    calculator.delete()
    return Response({"message":"----ITEM DELETED----"}, status=status.HTTP_204_NO_CONTENT)
