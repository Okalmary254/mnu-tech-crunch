from django.utils.deprecation import MiddlewareMixin

class MediaCORSMiddleware(MiddlewareMixin):
    def process_response(self, request, response):
        if request.path.startswith('/media/'):
            response['Access-Control-Allow-Origin'] = '*'
            response['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,Range'
            response['Access-Control-Expose-Headers'] = 'Content-Type,Content-Length,Accept-Ranges,Content-Range'
        return response
