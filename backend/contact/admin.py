from django.contrib import admin

from .models import ContactMessage


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):

    list_display = (
        "name",
        "email",
        "phone",
        "occasion",
        "created_at",
    )

    list_filter = (
        "occasion",
        "created_at",
    )

    search_fields = (
        "name",
        "email",
        "phone",
        "message",
    )

    ordering = (
        "-created_at",
    )