from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path
from collection.views import index, figurine_detail, figurine_list

urlpatterns = [
    path("admin/", admin.site.urls),
    path("", index, name="index"),
    path("figurine/<int:figurine_id>/", figurine_detail, name="figurine_detail"),
    path("api/figurines/", figurine_list, name="figurine_list"),  
    path("api/figurines/<int:figurine_id>/", figurine_detail, name="api_figurine_detail"),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)