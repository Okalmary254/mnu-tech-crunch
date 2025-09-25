from django.contrib import admin
from .models import User

@admin.register(User)
class UserAdmin(admin.ModelAdmin):
	list_display = ('id', 'username', 'email', 'first_name', 'last_name', 'bio')
	search_fields = ('username', 'email', 'first_name', 'last_name', 'bio')
	fieldsets = (
		(None, {
			'fields': ('username', 'password')
		}),
		('Personal info', {
			'fields': ('first_name', 'last_name', 'email', 'bio', 'avatar')
		}),
		('Permissions', {
			'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')
		}),
		('Important dates', {
			'fields': ('last_login', 'date_joined')
		}),
	)
