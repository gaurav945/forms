"""forms URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    # url(r'^admin/', admin.site.urls),
	url(r'^input_stuff/$', views.first_page, name='first_page'),
	url(r'^output_stuff/$', views.post_new, name='post_new'),
	url(r'^ajax_call/$', views.ajax_call, name='ajax_call'),
    url(r'^homepage/$', views.homepage, name='homepage'),
    url(r'^cartoons/$', views.cartoons, name='cartoons'),
    url(r'^get_more/$', views.get_more, name='get_more'),
    url(r'^data_update/$', views.data_update_test, name='data_update_test'),
    url(r'^data_updater/$', views.data_updater, name='data_updater'),
    url(r'^cartoon_wisher/$', views.cartoon_wisher, name='cartoon_wisher'),
]
