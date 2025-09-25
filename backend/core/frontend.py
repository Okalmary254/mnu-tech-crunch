import os
from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings

class FrontendAppView(View):
    def get(self, request):
        try:
            with open(os.path.join(settings.BASE_DIR, '../build/index.html')) as f:
                return HttpResponse(f.read())
        except FileNotFoundError:
            return HttpResponse(
                "This URL is handled by React. Build your React app and place it in the build/ directory.",
                status=501,
            )
