from django.urls import path
from . import views

urlpatterns = [
    # Define your app-specific URLs here
    path('events/', views.EventList.as_view(), name='event-list'),
    path('tickets/purchase/', views.TicketPurchase.as_view(), name='ticket-purchase'),
    path('tickets/validate/<str:ticket_id>/', views.TicketValidate.as_view(), name='ticket-validate'),
]