from django.db import models
from django.conf import settings


CATEGORY_CHOICES = [
    ("Technology", "Technology"),
    ("Business", "Business"),
    ("Science", "Science"),
    ("Health", "Health"),
    ("Entertainment", "Entertainment"),
    ("Sports", "Sports"),
    ("Politics", "Politics"),
    ("Other", "Other"),
]

class Post(models.Model):
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='post_images/', blank=True, null=True)
    category = models.CharField(max_length=100, blank=True, choices=CATEGORY_CHOICES)
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
