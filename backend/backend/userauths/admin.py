from django.contrib import admin
from userauths.models import User, Profile




class UserAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'email']

class ProfileAdmin(admin.ModelAdmin):
    list_display = ['full_name', 'gender']
    list_editable = ['gender', ]


admin.site.register(User, UserAdmin)
admin.site.register(Profile, ProfileAdmin)
# Register your models here.
