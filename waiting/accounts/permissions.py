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
        if view.action == "list" and 'validate' in request.query_params:
            return True

        # extra condition to allow adding to this database
        if request.user.is_anonymous is False and \
                request.user.user_type == 'MANAGER':
            return True

        return False


class IsStaffOrPostOnly(BasePermission):

    def has_permission(self, request, view):
        allowed_methods = ['PUT', 'PATCH', 'POST']
        if request.method in allowed_methods:
            return True

        if request.user.is_anonymous is False and \
            (request.user.user_type == 'MANAGER' or
                request.user.user_type == 'KITCHEN' or
                request.user.user_type == "WAITER"):
            return True

        return False


class IsAuthenticatedOrGetOrPostOnly(BasePermission):

    def has_permission(self, request, view):
        allowed_methods = ["POST", "GET"]
        if request.method in allowed_methods:
            return True

        if request.user.is_anonymous is False and \
            (request.user.user_type == 'MANAGER' or
                request.user.user_type == 'KITCHEN' or
                request.user.user_type == "WAITER"):
            return True

        return False
