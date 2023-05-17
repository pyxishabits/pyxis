from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

app_name = 'accounts'
urlpatterns = [
    path('signup', views.SignUpView.as_view(), name='signup'),
    path('auth/', obtain_auth_token)
]