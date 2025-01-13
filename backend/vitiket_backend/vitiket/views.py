from django.core.files import File
from django.http import JsonResponse
from django.shortcuts import render
from io import BytesIO
import qrcode
from rest_framework import generics
from .models import Event, Ticket
from .serializers import EventSerializer, TicketSerializer


class EventList(generics.ListAPIView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer


class TicketPurchase(generics.CreateAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer

    def perform_create(self, serializer):
        event = serializer.validated_data["event"]
        if event.available_tickets > 0:
            event.available_tickets -= 1
            event.save()
            ticket = serializer.save()

            # Generate QR code
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=5,
            )
            qr.add_data(ticket.ticket_id)
            qr.make(fit=True)
            img = qr.make_image(fill_color="black", back_color="white")

            # Save QR code to ticket
            buffer = BytesIO()
            img.save(buffer, format="PNG")
            ticket.qr_code.save(f"{ticket.ticket_id}.png", File(buffer))
            ticket.save()


class TicketValidate(generics.RetrieveAPIView):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
    lookup_field = "ticket_id"

    def retrieve(self, request, *args, **kwargs):
        ticket = self.get_object()
        if ticket.is_used:
            return JsonResponse(
                {"status": "invalid", "message": "Ticket has already been used"},
                status=400,
            )
        else:
            ticket.is_used = True
            ticket.save()
            return JsonResponse(
                {"status": "valid", "message": "Ticket validated"}, status=200
            )
