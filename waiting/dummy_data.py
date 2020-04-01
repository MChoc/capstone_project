from django.contrib.auth improt get_user_model


User = get_user_model()

admin = user.objects.create_superuser('admin', password='admin')
