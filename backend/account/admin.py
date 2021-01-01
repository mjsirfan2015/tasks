from django.contrib import admin
from .models import  Account

class AccountAdmin(admin.ModelAdmin):
    list_display = ('_id','email','password') 

# Register your models here.
admin.site.register(Account,AccountAdmin)