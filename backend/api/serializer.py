from rest_framework import serializers

from .models import User, Entry, Chat


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('name', 'mail')


class EntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Entry
        fields = ('title', 'body', 'created_at', 'status', 'author')
        
class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ('id', "input_text", "reply_text")
        read_only_fields = ("id", "reply_text")