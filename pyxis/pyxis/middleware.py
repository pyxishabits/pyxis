
from django.utils import timezone
 
class UserTimezoneMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        if request.user.is_authenticated:
            if request.session.get('detected_tz'): 
                tz = timezone.get_current_timezone()
                if tz:
                    tz = str(tz)
                    # (this assumes your user model has a char field called "timezone")
                    if tz != request.user.timezone:
                        request.user.timezone = tz
                        request.user.save()

        return response