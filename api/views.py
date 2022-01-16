import django_filters
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Entry, Chat
from .serializer import UserSerializer, EntrySerializer, ChatSerializer


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class EntryViewSet(viewsets.ModelViewSet):
    queryset = Entry.objects.all()
    serializer_class = EntrySerializer
    
class ChatViewSet(viewsets.ModelViewSet):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    
    @action(detail=False, methods=["post"])
    def generate(self, input_text):
        reply = run_dialogpt(input_text)
        chat = Chat(input_text=input_text, reply_text=reply)
        chat.save()
        return Response(reply, status.HTTP_200_OK)
        
def run_dialogpt(input_text):
    tokenizer = AutoTokenizer.from_pretrained('microsoft/DialoGPT-small')
    model = AutoModelWithLMHead.from_pretrained('output-small')
    
    new_user_input_ids = tokenizer.encode(input_text + tokenizer.eos_token, return_tensors='pt')
    reply = model.generate(
        bot_input_ids, max_length=200,
        pad_token_id=tokenizer.eos_token_id,  
        no_repeat_ngram_size=3,       
        do_sample=True, 
        top_k=100, 
        top_p=0.7,
        temperature = 0.8
    )
    
    return "reply2"