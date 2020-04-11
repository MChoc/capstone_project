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


class LoggedInOrValidateOnly(permissions.BasePermission):

    def has_permission(self, request, view):

        if view.action == "create":
            return True

        # extra condition to allow adding to this database
        if request.user.is_anonymous is False and request.user.user_type == 'MANAGER':
            return True

        return False


class AdminOrPostOnly(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.method == "POST":
            return True

        if request.user.is_anonymous is False and (request.user.user_type == 'MANAGER'
           or request.user.user_type == 'KITCHEN' or request.user.user_type == "WAITSTAFF"):
            return True

        return False
