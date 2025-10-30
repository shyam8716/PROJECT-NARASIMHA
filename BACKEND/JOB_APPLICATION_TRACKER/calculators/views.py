from django.shortcuts import render
from.models import Calculators
from rest_framework.decorators import api_view
from rest_framework.response import Response
from.serializers import Calculatorsserializers
from rest_framework import status
# Create your views here.
@api_view(['GET'])
def Reading_calculator_data(request):
    calculator=Calculators.objects.all()
    serializer=Calculatorsserializers(calculator,many=True)
    return Response(serializer.data)
@api_view(['POST'])
def Creating_calculator_data(request):
    serializer=Calculatorsserializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)
@api_view(['PUT'])
def Updating_calculator_data(request,id):
    calculator=Calculators.objects.get(id=id)
    serializer=Calculatorsserializers(calculator,data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    else:
        return Response(serializer.errors, status=400)
@api_view(['DELETE'])
def Deleteing_calculator_data(request,id):
    calculator=Calculators.objects.get(id=id)
    calculator.delete()
    return Response("----ITEM DELETED----")