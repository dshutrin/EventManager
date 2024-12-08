from django.db import models
from django.contrib.auth.models import AbstractBaseUser
from .managers import *


class CustomUser(AbstractBaseUser):
	username = models.CharField(verbose_name='Имя пользователя', max_length=150, null=False, default=None, unique=True)
	email = models.EmailField(unique=True, null=True, default=None, blank=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	objects = CustomUserManager()
	admin_access = models.BooleanField(default=False)
	USERNAME_FIELD = 'username'

	def has_perm(self, perm, obj=None):
		return self.is_superuser

	def has_module_perms(self, app_label):
		return self.is_superuser

	def get_privs(self):
		return []

	def get_name(self):
		return f'{self.username}'

	class Meta:
		db_table = 'auth_user'
		verbose_name = 'Пользователь'
		verbose_name_plural = 'Пользователи'

	def __str__(self):
		return f'{self.username}'


class Event(models.Model):
	name = models.CharField(max_length=100, verbose_name='Название события')
	is_started = models.BooleanField(default=False, verbose_name='Уже началось')

	def __str__(self):
		return self.name

	class Meta:
		verbose_name = 'Событие'
		verbose_name_plural = 'События'


class Step(models.Model):
	event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name='Событие')
	number = models.PositiveIntegerField(verbose_name='Номер задачи')
	max_scroe = models.PositiveIntegerField(verbose_name='Максимальный балл')

	def __str__(self):
		return str(self.number)

	class Meta:
		verbose_name = 'Задача'
		verbose_name_plural = 'Задачи'


class Team(models.Model):
	event = models.ForeignKey(Event, on_delete=models.CASCADE, verbose_name='Мероприятие', null=True, blank=True, default=None)
	name = models.CharField(max_length=150, verbose_name='Название команды')

	def __str__(self):
		return self.name

	class Meta:
		verbose_name = 'Команда'
		verbose_name_plural = 'Команды'


class Mark(models.Model):
	step = models.ForeignKey(Step, on_delete=models.CASCADE)
	team = models.ForeignKey(Team, on_delete=models.CASCADE)
	points = models.PositiveIntegerField()


class Score(models.Model):
	phone = models.CharField(max_length=15)
	points = models.PositiveIntegerField()
