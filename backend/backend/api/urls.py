from django.contrib import admin
from django.urls import path
from userauths import views as userauths_views

urlpatterns = [
    path('', userauths_views.getRoutes),

    # Userauths API Endpoints
    path('user/token/', userauths_views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    #path('user/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/register/', userauths_views.RegisterView.as_view(), name='auth_register'),
    path('user/profile/<user_id>/', userauths_views.ProfileView.as_view(), name='user_profile'),
    path('user/test/', userauths_views.testEndPoint, name='auth_register'),
    path('user/password-reset/<email>/', userauths_views.PasswordEmailVerify.as_view(), name='password_reset'),
    path('user/password-change/', userauths_views.PasswordChangeView.as_view(), name='password_reset'),]