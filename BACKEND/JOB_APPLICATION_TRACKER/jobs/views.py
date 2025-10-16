from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import JobApplication
from .serializers import Jobserializers

@api_view(['GET', 'POST'])
def Reading_JobApplication_data(request):
    if request.method == 'GET':
        job_applications = JobApplication.objects.all()
        serializer = Jobserializers(job_applications, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = Jobserializers(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def Creating_new_JobApplication_data(request):
    serializer=Jobserializers(data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)
@api_view(['POST'])
def Update_Existing_JobApplication_data(request,id):
   job_applications=JobApplication.objects.get(id=id)
   serializer = Jobserializers(instance=job_applications,data=request.data)
   if serializer.is_valid():
    serializer.save()
    return Response(serializer.data)
@api_view(['DELETE'])
def Delete_JobApplication_data(request,id):
   job_applications=JobApplication.objects.get(id=id)
   job_applications.delete()
   return Response("---Item deleted------")