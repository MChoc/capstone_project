from rest_auth.models import TokenModel
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers

from .models import CustomUser


# adding new fields in registration:https://stackoverflow.com/questions/53969386/how-to-save-extra-fields-on-registration-using-custom-user-model-in-drf-django
class CustomRegisterSerializer(RegisterSerializer):
    first_name = serializers.CharField(
        required=True,
        max_length=30,
    )
    last_name = serializers.CharField(
        required=True,
        max_length=30,
    )

    user_type = serializers.ChoiceField(choices=CustomUser.USER_TYPE_CHOICES)

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['first_name'] = self.validated_data.get('first_name', '')
        data_dict['last_name'] = self.validated_data.get('last_name', '')
        data_dict['user_type'] = self.validated_data.get('user_type', '')
        return data_dict


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['username', 'first_name', 'last_name', 'user_type']


class TokenSerializer(serializers.ModelSerializer):
    '''
    Custom token serializer to return user details with token
    '''
    user = UserSerializer(read_only=True)

    class Meta:
        model = TokenModel
        fields = ('key', 'user')
