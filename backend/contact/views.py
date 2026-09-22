import json
import os

import resend

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

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
                {
                    "success": False,
                    "message": "Name is required.",
                },
                status=400,
            )

        if not email:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Email is required.",
                },
                status=400,
            )

        if not occasion:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Occasion is required.",
                },
                status=400,
            )

        if not message:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Message is required.",
                },
                status=400,
            )

        # Save enquiry in database
        contact_message = ContactMessage.objects.create(
            name=name,
            email=email,
            phone=phone,
            occasion=occasion,
            message=message,
        )

        # Resend API key
        resend.api_key = os.getenv("RESEND_API_KEY")

        if not resend.api_key:
            return JsonResponse(
                {
                    "success": False,
                    "message": "Email service is not configured.",
                },
                status=500,
            )

        subject = f"New Contact Enquiry - {occasion}"

        html_body = f"""
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
            <h2>New Contact Enquiry</h2>

            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Phone:</strong> {phone or "Not provided"}</p>
            <p><strong>Occasion:</strong> {occasion}</p>

            <h3>Message</h3>
            <p>{message}</p>

            <hr>

            <p>
                <strong>Cherish By Wed Knot Craft</strong><br>
                Wedding Invitations
            </p>
        </div>
        """

        # Send email using Resend
        resend.Emails.send(
            {
                "from": "Cherish By Wed Knot Craft <onboarding@resend.dev>",
                "to": [
                    "cherishbywedknotcraft@gmail.com"
                ],
                "subject": subject,
                "html": html_body,
            }
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