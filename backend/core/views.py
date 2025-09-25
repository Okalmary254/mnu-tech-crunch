from django.http import HttpResponse

def home(request):
    return HttpResponse('<h1>Welcome to MNU Tech Crunch Blog API</h1>')
