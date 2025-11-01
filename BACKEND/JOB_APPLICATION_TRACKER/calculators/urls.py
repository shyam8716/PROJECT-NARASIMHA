from . import views
from django.urls import path

urlpatterns = [
    path("Reading_calculator_data/", views.Reading_calculator_data, name="reading calculator data"),
    path("Creating_calculator_data/", views.Creating_calculator_data, name="creating new calculator data"),
    path("Updating_calculator_data/<int:id>/", views.Updating_calculator_data, name="updating existing calculator data"),
    path("Deleteing_calculator_data/<int:id>/", views.Deleteing_calculator_data, name="deleting_calculator_data")
]
