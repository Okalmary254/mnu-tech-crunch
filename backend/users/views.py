from django.shortcuts import render, redirect
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import login, logout
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
class LoginFormView(APIView):
	def get(self, request):
		return render(request, 'login.html')

	@method_decorator(csrf_exempt)
	def post(self, request):
		# Handle both form and JSON login
		if request.content_type == 'application/x-www-form-urlencoded':
			data = request.POST
		else:
			data = request.data
		serializer = LoginSerializer(data=data)
		if serializer.is_valid():
			user = serializer.validated_data
			login(request, user)
			if request.content_type == 'application/x-www-form-urlencoded':
				return redirect('http://localhost:3000/')
			return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
		if request.content_type == 'application/x-www-form-urlencoded':
			return render(request, 'login.html', {'errors': serializer.errors})
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutFormView(APIView):
	def get(self, request):
		return render(request, 'logout.html')

	def post(self, request):
		logout(request)
		return render(request, 'logout.html', {'success': True})
from .auth_serializers import LoginSerializer, RegisterSerializer
# Create your views here.

class LoginView(APIView):
	def post(self, request):
		serializer = LoginSerializer(data=request.data)
		if serializer.is_valid():
			user = serializer.validated_data
			login(request, user)
			return Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(APIView):
	def get(self, request):
		# Show a simple HTML registration form
		return render(request, 'register.html')

	def post(self, request):
		# Handle both form and JSON registration
		if request.content_type == 'application/x-www-form-urlencoded':
			data = request.POST
		else:
			data = request.data
		serializer = RegisterSerializer(data=data)
		if serializer.is_valid():
			user = serializer.save()
			if request.content_type == 'application/x-www-form-urlencoded':
				return redirect('http://localhost:3000/')
			return Response({'message': 'Registration successful'}, status=status.HTTP_201_CREATED)
		if request.content_type == 'application/x-www-form-urlencoded':
			return render(request, 'register.html', {'errors': serializer.errors})
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
from django.shortcuts import render



from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	permission_classes = [permissions.IsAuthenticatedOrReadOnly]

	@action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
	def me(self, request):
		serializer = self.get_serializer(request.user)
		return Response(serializer.data)
