from rest_framework.permissions import BasePermission


class IsStaff(BasePermission):
    """
    Custom permission to only allow staff to access it
    """

    def has_permission(self, request, view):
        return request.user.is_anonymous is False and \
            request.user.user_type != 'CUSTOMER'


class IsManager(BasePermission):
    """
    Custom permission to only allow managers to access it
    """

    def has_permission(self, request, view):
        return request.user.is_anonymous is False and \
            request.user.user_type == 'MANAGER'


class LoggedInOrValidateOnly(BasePermission):

    def has_permission(self, request, view):
        if view.action == "create":
            return True

        # extra condition to allow adding to this database
        if request.user.is_anonymous is False and \
                request.user.user_type == 'MANAGER':
            return True

        return False


class IsStaffOrPostOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method == "POST":
            return True

        if request.user.is_anonymous is False and \
                request.user.user_type != 'CUSTOMER':
            return True

        return False


class AdminOrPostOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method == "POST":
            return True

        if request.user.is_anonymous is False and \
            (request.user.user_type == 'MANAGER' or
                request.user.user_type == 'KITCHEN' or
                request.user.user_type == "WAITER"):
            return True

        return False


class IsAuthenticatedOrGetOrPostOnly(BasePermission):

    def has_permission(self, request, view):
        if request.method == "POST" or request.method == "GET":
            return True

        if request.user.is_anonymous is False and \
            (request.user.user_type == 'MANAGER' or
                request.user.user_type == 'KITCHEN' or
                request.user.user_type == "WAITER"):
            return True

        return False
