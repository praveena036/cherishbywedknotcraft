from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.core.mail import send_mail

import json

from .models import ContactMessage


@csrf_exempt
@require_http_methods(["POST"])
def create_contact_message(request):

    try:
        data = json.loads(request.body)

        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        phone = data.get("phone", "").strip()
        occasion = data.get("occasion", "").strip()
        message = data.get("message", "").strip()

        if not name:
            return JsonResponse(
                {"success": False, "message": "Name is required."},
                status=400,
            )

        if not email:
            return JsonResponse(
                {"success": False, "message": "Email is required."},
                status=400,
            )

        if not occasion:
            return JsonResponse(
                {"success": False, "message": "Occasion is required."},
                status=400,
            )

        if not message:
            return JsonResponse(
                {"success": False, "message": "Message is required."},
                status=400,
            )

        contact_message = ContactMessage.objects.create(
            name=name,
            email=email,
            phone=phone,
            occasion=occasion,
            message=message,
        )

        subject = f"New Contact Enquiry - {occasion}"

        email_body = f"""
New enquiry received from Cherish By Wed Knot Craft website.

Name: {name}
Email: {email}
Phone: {phone or "Not provided"}
Occasion: {occasion}

Message:
{message}

----------------------------------------
Cherish By Wed Knot Craft
        """

        send_mail(
            subject=subject,
            message=email_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[
                settings.EMAIL_HOST_USER,
            ],
            fail_silently=False,
        )

        return JsonResponse(
            {
                "success": True,
                "message": "Your enquiry was submitted successfully.",
                "id": contact_message.id,
            },
            status=201,
        )

    except json.JSONDecodeError:
        return JsonResponse(
            {
                "success": False,
                "message": "Invalid JSON data.",
            },
            status=400,
        )

    except Exception as error:
        return JsonResponse(
            {
                "success": False,
                "message": str(error),
            },
            status=500,
        )