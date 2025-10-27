from django.shortcuts import render
from .models import Library
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import Libraryserializers
from rest_framework import status

# GET all books / POST new book
@api_view(['GET', 'POST'])
def Reading_library_api(request):
    if request.method == 'GET':
        books = Library.objects.all()
        serializer = Libraryserializers(books, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Libraryserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# POST create explicitly
@api_view(['POST'])
def Creating_library_api(request):
    serializer = Libraryserializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# POST update book
@api_view(['POST'])
def Update_library_api(request, id):
    try:
        book = Library.objects.get(id=id)
    except Library.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)

    serializer = Libraryserializers(book, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Book updated successfully"}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# DELETE book
@api_view(['DELETE'])
def Delete_library_api(request, id):
    try:
        book = Library.objects.get(id=id)
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_200_OK)
    except Library.DoesNotExist:
        return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
