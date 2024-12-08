from django.contrib import admin
from .models import *


# Register your models here.
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
	list_display = ('username', )


@admin.register(Event)
class EventAdmin(admin.ModelAdmin):
	list_display = ('name', )


@admin.register(Score)
class ScoreAdmin(admin.ModelAdmin):
	list_display = ('phone', )


@admin.register(Step)
class StepAdmin(admin.ModelAdmin):
	list_display = ('event', )


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
	list_display = ('name', )
