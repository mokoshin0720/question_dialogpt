from django.contrib import admin
from .models import User, Entry, Chat

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    pass

@admin.register(Entry)
class Entry(admin.ModelAdmin):
    pass

@admin.register(Chat)
class Chat(admin.ModelAdmin):
    pass