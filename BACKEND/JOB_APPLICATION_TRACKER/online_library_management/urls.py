from django.urls import path
from . import views

urlpatterns = [
    path('Reading_library_api/', views.Reading_library_api, name='library-list'),
    path('Creating_library_api/', views.Creating_library_api, name='creating-library-list'),
    path('Update_library_api/<int:id>/', views.Update_library_api, name='update-library-list'),
    path('Delete_library_api/<int:id>/', views.Delete_library_api, name='delete-library-list'),
]
