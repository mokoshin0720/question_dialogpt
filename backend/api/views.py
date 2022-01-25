import django_filters
from rest_framework import viewsets, filters, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import User, Entry, Chat
from .serializer import UserSerializer, EntrySerializer, ChatSerializer
from transformers import AutoModelWithLMHead, AutoTokenizer
import os 

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
    def generate(self, request):
        input_text = request.data["input_text"]
        reply = run_dialogpt(input_text)
        chat = Chat(input_text=input_text, reply_text=reply)
        chat.save()
        return Response(reply, status.HTTP_200_OK)
        
def run_dialogpt(input_text):
    tokenizer = AutoTokenizer.from_pretrained('microsoft/DialoGPT-medium')
    model = AutoModelWithLMHead.from_pretrained('api/output-medium')
    
    bot_input = tokenizer.encode(input_text.replace("|", tokenizer.eos_token) + tokenizer.eos_token, return_tensors='pt')
    return generate_sentence(model, tokenizer, bot_input)

def generate_sentence(model, tokenizer, bot_input):
    is_correct_sentence = False
    is_skip = False
    bad_sentence_cnt = 0
    
    while is_correct_sentence == False:
        reply = model.generate(
            bot_input, max_length=200,
            pad_token_id=tokenizer.eos_token_id,  
            no_repeat_ngram_size=3,       
            do_sample=True, 
            top_k=100, 
            top_p=0.7,
            temperature = 0.8
        )
        
        reply_list = reply[:, bot_input.shape[-1]:][0].tolist()
        
        if reply_list[0] == 0:
            bad_sentence_cnt += 1
            
            if bad_sentence_cnt >= 5:
                is_skip = True
                break
            
            # print("regenerate...")
            continue
        
        is_correct_sentence = True
        
        if is_skip:
            return "Please input again..."
        
        return tokenizer.decode(reply[:, bot_input.shape[-1]:][0], skip_special_tokens=True)