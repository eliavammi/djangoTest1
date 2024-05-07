from django.urls import path
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserDetailAPI, UserLoginView

# router = routers.DefaultRouter()
# router.register(r'books', views.BookList, basename='books')

urlpatterns = [
    # path('', include(router.urls)),
    path('react/', views.react_list),
    path('react_detail/<int:pk>/', views.react_detail),
    path('user/', views.user_register),
    path("get-details/", UserDetailAPI.as_view()),
    path('user-login/', UserLoginView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)
