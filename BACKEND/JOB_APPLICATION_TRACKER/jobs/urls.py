from . import views
from django.urls import path

urlpatterns = [
    path('Reading_JobApplication_data/', views.Reading_JobApplication_data, name='job-list'),
    path('Creating_new_Jobapplication_data/', views.Creating_new_JobApplication_data, name="creating_jobs"),
    path('Update_Existing_JobApplication_data/<int:id>/', views.Update_Existing_JobApplication_data, name='update_job'),
    path('Delete_JobApplication_data/<int:id>/', views.Delete_JobApplication_data, name="delete_jobs"),
    ]
