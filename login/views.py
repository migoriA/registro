from django.shortcuts import render,redirect

def login(request):
    return render(request,"login/index.html")

def main(request):
    if request.method == 'POST':
        return render(request, "main/main.html")
    else: 
        return render(request, "login/index.html")
