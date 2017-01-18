from django.shortcuts import render
# from django.template import Context, Template
from django.http import HttpResponse
# from .forms import PostForm
from django.shortcuts import render_to_response
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from .models import Post, DataUpdate
from django.core import serializers

# Create your views here.

def first_page(request):
	# t = Template('This is your <span>{{ message }}</span>.')
	# c = Context({'message': 'Your message'})

	# return HttpResponse('<html>Hello World</html>')
	return render(request, 'appone/input.html', {})

def post_new(request):
	# import ipdb; ipdb.set_trace();
	# form = PostForm()
	name = request.POST.get('name')
	nick = request.POST.get('nickname')
	new_data = {'key1' : 'value1', 'key2' : 'value2'}
	# return HttpResponse('This is your name : ' + name +  '<br />This is your nickname : ' + nick)
	return render_to_response('appone/output.html', {'name' : name, 'nick' : nick, 'stuff' : new_data})

@ensure_csrf_cookie
def ajax_call(request):
	# import ipdb; ipdb.set_trace();
	no1 = int(request.POST.get('no1'))
	no2 = int(request.POST.get('no2'))
	response = JsonResponse({'no3' : no1 + no2})
	return response

def homepage(request):
	return render(request, 'appone/homepage.html', {})

def cartoons(request):
	# toons = {}
	# for i in Post.objects.all()[:10]:
		# toons[i.text] = i.title
	# return render(request, 'appone/skeleton.html', {'data' : toons})
	toons = []
	for i in range(0, 10):
		toons.append(Post.objects.all()[i])
	return render(request, 'appone/skeleton.html', {'data' : toons})

@ensure_csrf_cookie
def get_more(request):
	# import ipdb; ipdb.set_trace()
	counter = int(request.POST.get('total'))
	limit = counter + 10
	# toons = {}
	# for i in Post.objects.all()[counter:limit]:
	# 	toons[i.text] = i.title
	# response = JsonResponse({'toons' : toons})
	toons = []
	for i in Post.objects.all()[counter:limit]:
		toons.append(i)
	# import ipdb; ipdb.set_trace()
	# response = JsonResponse(toons, safe=False)
	data = serializers.serialize("json", toons)
	return HttpResponse(data, content_type='application/json')
	# return response

def data_update_test(request):
	value = DataUpdate.objects.all()[0].value
	return render(request, 'appone/djangodataupdate.html', {'data' : value}) # the left one will be accessible in templates, because this is the variable

@ensure_csrf_cookie
def data_updater(request):
	# import ipdb; ipdb.set_trace()
	value = request.POST.get('binary')
	obj = DataUpdate.objects.all()[0]
	if value == 'false':
		obj.value = 0
	elif value == 'true':
		obj.value = 1
	obj.save()
	# import ipdb; ipdb.set_trace()
	return JsonResponse({'success' : 'success'})

@ensure_csrf_cookie
def cartoon_wisher(request):
	# import ipdb; ipdb.set_trace()
	playerid = request.POST.get('playerid')
	obj = Post.objects.filter(title__contains=playerid)[0]
	if obj.value == False:
		obj.value = True
	elif obj.value == True:
		obj.value = False
	obj.save()
	return JsonResponse({'success' : 'success'})