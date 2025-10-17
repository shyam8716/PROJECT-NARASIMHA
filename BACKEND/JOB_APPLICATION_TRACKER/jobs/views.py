from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import JobApplication
from .serializers import Jobserializers

@api_view(['GET','POST','PUT'])
def Reading_JobApplication_data(request, pk=None):
    if request.method == 'GET':
        if pk: 
            try:
                job = JobApplication.objects.get(id=pk)
            except JobApplication.DoesNotExist:
                return Response({'error': 'Job not found'}, status=404)
            serializer = Jobserializers(job)
            return Response(serializer.data)
        else:  
            jobs = JobApplication.objects.all()
            serializer = Jobserializers(jobs, many=True)
            return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Jobserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)
@api_view(['POST'])
def Creating_new_JobApplication_data(request):
    serializer=Jobserializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
@api_view(['GET', 'PUT'])
def Update_Existing_JobApplication_data(request, id):
    try:
        job = JobApplication.objects.get(id=id)
    except JobApplication.DoesNotExist:
        return Response({"error": "Job not found"}, status=status.HTTP_404_NOT_FOUND)
    if request.method == 'GET':
        serializer = Jobserializers(job)
        return Response(serializer.data)
    elif request.method == 'PUT':
        serializer = Jobserializers(job, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE'])
def Delete_JobApplication_data(request,id):
   job_applications=JobApplication.objects.get(id=id)
   job_applications.delete()
   return Response("---Item deleted------")