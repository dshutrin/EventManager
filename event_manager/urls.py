from django.urls import path
from .views import *


urlpatterns = [
	path('', home),
	path('events/create', create_event),
	path('events/<int:eid>', detail_event),
	path('events/<int:eid>/add_team', add_event_team),
	path('events/<int:eid>/add_step', add_event_step),
	path('rm_team', rm_team),
	path('rm_step', rm_step),
	path('rm_event', rm_event),
	path('events/<int:eid>/manage', manage_event),
	path('update_score', update_score),
	path('events/<int:eid>/results', event_results),
	path('update_game_scores', update_game_score),
	path('login', login),
	path('logout', logout),

	# Ссылка на игру
	path('aV9hbV9mdWNrX3RoaXNfZ2FtZQ==', game),
]
