from.import views
from django.urls import path
from.import views
urlpatterns = [
    path('Reading_JobApplication_data/',views.Reading_JobApplication_data,name="reading_jobs"),
    path("Creating_new_Jobapplication_data/",views.Creating_new_JobApplication_data,name="createting_jobs"),
   path("Update_Existing_JobApplication_data<int:id>/", views.Update_Existing_JobApplication_data, name="Update_jobs"),
   path("Delete_JobApplication_data<int:id>/", views.Delete_JobApplication_data, name="delete_jobs"),

]