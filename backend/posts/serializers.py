
from rest_framework import serializers
from .models import Post

class PostSerializer(serializers.ModelSerializer):
    author = serializers.CharField(source='author.username', read_only=True)
    image = serializers.SerializerMethodField()
    excerpt = serializers.SerializerMethodField()
    date = serializers.SerializerMethodField()

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'image', 'category', 'author', 'created_at', 'updated_at', 'excerpt', 'date']

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            if request:
                return request.build_absolute_uri(obj.image.url)
            return obj.image.url
        return None

    def get_excerpt(self, obj):
        return obj.content[:120] + ('...' if len(obj.content) > 120 else '')

    def get_date(self, obj):
        return obj.created_at.strftime('%Y-%m-%d %H:%M') if obj.created_at else ''
