# Django REST API backend for mnu-tech-crunch

This backend uses Django and Django REST Framework.

## Setup

1. Create a virtual environment:
   python3 -m venv venv
   source venv/bin/activate

2. Install dependencies:
   pip install -r requirements.txt

3. Start a new Django project:
   django-admin startproject core .

4. Run migrations:
   python manage.py migrate

5. Create a superuser:
   python manage.py createsuperuser

6. Run the development server:
   python manage.py runserver

## Apps to create next
- posts (blog posts, categories, comments, media)
- users (authentication)

## API
- Ready for REST endpoints for posts, categories, comments, media, and users.
