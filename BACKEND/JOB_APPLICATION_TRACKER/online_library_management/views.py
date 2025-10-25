from django.shortcuts import render
from.models import Library
from rest_framework .decorators import api_view
from rest_framework.response import Response
from .serializers import Libraryserializers
from rest_framework import status
# Create your views here.
@api_view(['GET'])#Read operation
def Reading_library_api(request):
   library_department=Library.objects.all()
   serializers=Libraryserializers(library_department,many=True)
   return Response(serializers.data)
@api_view(['POST'])#create operation
def Creating_library_api(request):
   serializers=Libraryserializers(data=request.data)
   if serializers.is_valid():
      serializers.save()
   else:
      return Response(serializers.errors, status=400)
@api_view(['POST'])
def Update_library_api(request,id):
   library_department=Library.objects.get(id=id)
   serializers=Libraryserializers(instance=library_department,data=request.data)
   if serializers.is_valid():
      serializers.save()
      return Response({"message": "Library updated successfully"})
   else:
      return Response(serializers.errors, status=400)
@api_view(['DELETE'])
def Delete_library_api(request,id):
   library_department=Library.objects.get(id=id)
   library_department.delete()
   return Response('---ITEM DELETED---')