from django import forms
from .models import *


class LoginForm(forms.ModelForm):
	password = forms.CharField(max_length=256, label='Пароль', widget=forms.PasswordInput)

	class Meta:
		model = CustomUser
		fields = ("username", "password")
