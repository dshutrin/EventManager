from django.shortcuts import render
from django.http import HttpResponseRedirect, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login as user_login, logout as user_logout
from django.contrib.auth.decorators import login_required
from .models import *
from .forms import *


# Create your views here.
@login_required
def home(request):
	return render(request, 'manager/home.html', {
		'events': Event.objects.all()
	})


def login(request):
	if request.method == 'GET':
		return render(request, 'manager/login.html')
	elif request.method == 'POST':
		username = request.POST['username']
		password = request.POST['password']

		user = authenticate(request, username=username, password=password)
		if user is not None:

			user_login(request, user)
			return HttpResponseRedirect('/')

		else:
			return render(request, 'manager/login.html')


@login_required
def create_event(request):
	if request.method == 'GET':
		return render(request, 'manager/create_event.html')
	elif request.method == 'POST':
		name = request.POST.get('name')
		event = Event.objects.create(name=name)

		return HttpResponseRedirect(f'/events/{event.id}')


@login_required
def logout(request):
	user_logout(request)
	return HttpResponseRedirect('/login')


@login_required
def detail_event(request, eid):

	event = Event.objects.get(id=eid)
	teams = Team.objects.filter(event=event)
	steps = Step.objects.filter(event=event)

	return render(request, 'manager/event_detail.html', {
		'event': event,
		'teams': teams,
		'steps': steps
	})


@login_required
def add_event_team(request, eid):
	if request.method == 'GET':
		return render(request, 'manager/add_team.html', {
			'event': Event.objects.get(id=eid)
		})
	elif request.method == 'POST':
		name = request.POST.get('name')
		event = Event.objects.get(id=eid)
		Team.objects.create(name=name, event=event)

		return HttpResponseRedirect(f'/events/{event.id}')


@login_required
def add_event_step(request, eid):
	if request.method == 'GET':
		return render(request, 'manager/add_step.html', {
			'event': Event.objects.get(id=eid)
		})
	elif request.method == 'POST':
		number = int(request.POST.get('number'))
		mx = int(request.POST.get('mx'))
		event = Event.objects.get(id=eid)

		if Step.objects.filter(event=event, number=number).exists():
			return render(request, 'manager/add_step.html', {
				'event': Event.objects.get(id=eid)
			})
		else:
			Step.objects.create(number=number, event=event, max_scroe=mx)
			return HttpResponseRedirect(f'/events/{event.id}')


@login_required
@csrf_exempt
def rm_team(request):
	if request.method == 'POST':
		team = Team.objects.filter(id=int(request.POST['tid']))
		if team.exists():
			team[0].delete()
			return JsonResponse({}, status=200)
		return JsonResponse({}, status=404)


@login_required
@csrf_exempt
def rm_step(request):
	if request.method == 'POST':
		step = Step.objects.filter(id=int(request.POST['sid']))
		if step.exists():
			step[0].delete()
			return JsonResponse({}, status=200)
		return JsonResponse({}, status=404)


@login_required
@csrf_exempt
def rm_event(request):
	if request.method == 'POST':
		event = Event.objects.filter(id=int(request.POST['eid']))
		if event.exists():
			event[0].delete()
			return JsonResponse({}, status=200)
		return JsonResponse({}, status=404)


@login_required
def manage_event(request, eid):
	event = Event.objects.get(id=eid)
	teams = Team.objects.filter(event=event)
	steps = Step.objects.filter(event=event)
	marks = Mark.objects.filter(step__event=event)

	return render(request, 'manager/event_manage.html', {
		'event': event,
		'teams': teams,
		'steps': steps,
		'marks': marks
	})


@login_required
def event_results(request, eid):
	event = Event.objects.get(id=eid)
	teams = Team.objects.filter(event=event)
	steps = Step.objects.filter(event=event)
	marks = Mark.objects.filter(step__event=event)

	max_score = sum([x.max_scroe for x in steps])

	class TeamView:
		def __init__(self, team):
			self.team = team
			self.perc = str((sum([x.points for x in marks if x.team == self.team]) / max_score) * 100).replace(',', '.')

	teams = sorted([TeamView(x) for x in teams], key=lambda x: x.perc, reverse=True)

	return render(request, 'manager/event_results.html', {
		'event': event,
		'teams': teams,
		'max_score': max_score
	})


@login_required
@csrf_exempt
def update_score(request):
	if request.method == 'POST':
		sid = int(request.POST.get('sid'))
		tid = int(request.POST.get('tid'))
		val = int(request.POST.get('val'))

		mark = Mark.objects.filter(team__id=tid, step__id=sid)
		if mark.exists():
			step = Step.objects.get(id=sid)
			if step.max_scroe >= val >= 0:
				mrk = Mark.objects.get(team__id=tid, step__id=sid)
				mrk.points = val
				mrk.save()
				return JsonResponse({}, status=200)
			else:
				return JsonResponse({
					'old_value': mark.first().points
				}, status=500)
		else:
			step = Step.objects.get(id=sid)
			if step.max_scroe >= val >= 0:
				Mark.objects.create(team=Team.objects.get(id=tid), step=Step.objects.get(id=sid), points=val)
				return JsonResponse({}, status=200)
			else:
				return JsonResponse({
					'old_value': 0
				}, status=500)


@login_required
@csrf_exempt
def update_game_score(request):
	if request.method == 'POST':
		phone = request.POST.get('number')
		score = int(request.POST.get('score'))

		sc = Score.objects.filter(phone=phone)
		if sc.exists():
			sc = sc[0]
			if sc.points < score:
				sc.points = score
				sc.save()
		else:
			Score.objects.create(phone=phone, points=score)

		return JsonResponse({})


@login_required
def game(request):

	best_score = max([x.points for x in Score.objects.all()])

	return render(request, 'manager/game.html', {
		'best_score': best_score
	})
