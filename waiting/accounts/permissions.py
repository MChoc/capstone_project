from rest_framework import permissions


class IsStaff(permissions.BasePermission):
    """
    Custom permission to only allow staff to access it
    """

    def has_permission(self, request, view):
        return request.user.is_anonymous is False and request.user.user_type != 'CUSTOMER'


class IsManager(permissions.BasePermission):
    """
    Custom permission to only allow managers to access it
    """

    def has_permission(self, request, view):
        return request.user.is_anonymous is False and request.user.user_type == 'MANAGER'
