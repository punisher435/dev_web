from rentit.settings import EMAIL_HOST_USER
from django.core.mail import send_mail

def email_send(subject1,message1,recepient1,seller1):
    subject = subject1
    message = message1
    recepient = recepient1
    seller=seller1
    send_mail(subject,message, EMAIL_HOST_USER, [recepient,seller], fail_silently=False)