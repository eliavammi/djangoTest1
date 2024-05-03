from django.urls import path
from . import views

# router = routers.DefaultRouter()
# router.register(r'books', views.BookList, basename='books')

urlpatterns = [
    # path('', include(router.urls)),
    path('hello-world/', views.hello_world, name='hello_world'),
    path('hello-all/', views.hello_all, name='hello_all'),
    path('hello-react/', views.hello_react, name='hello_react'),
    path('react/', views.react_list),
    path('react_detail/<int:pk>/', views.react_detail),
]