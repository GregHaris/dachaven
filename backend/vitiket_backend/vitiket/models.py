from django.db import models

class Event(models.Model):
  name = models.CharField(max_length=255)
  date = models.DateField()
  location = models.CharField(max_length=255)
  available_tickets = models.IntegerField()
  
  def __str__(self):
    return self.name
  
class Ticket(models.Model):
  event = models.ForeignKey(Event, on_delete=models.CASCADE)
  user_email = models.EmailField()
  ticket_id = models.CharField(max_length=255, unique=True)
  is_used = models.BooleanField(default=False)
  
  def __str__(self):
    return f"Ticket {self.ticket_id} for {self.event.name}"
  
  