from django.shortcuts import render, get_object_or_404, redirect
from django.http import JsonResponse
from django.core.serializers import serialize
from .models import Figurine, Collection, Wishlist
from django.contrib.auth.decorators import login_required


# API endpoint for list of figurines (useful for a front-end app)
def figurine_list(request):
    figurines = Figurine.objects.all()
    figurines_json = serialize('json', figurines)
    return JsonResponse(figurines_json, safe=False)


# API endpoint for a single figurine's details (with image handling)
def figurine_detail(request, figurine_id):
    figurine = get_object_or_404(Figurine, id=figurine_id)

    # If image exists, provide the image URL, otherwise return None
    image_url = figurine.image.url if figurine.image else None

    return JsonResponse({
        "id": figurine.id,
        "name": figurine.name,
        "price": figurine.price,
        "description": figurine.description,
        "image": image_url,  # Include image URL if it exists
        "series": figurine.series,  # Added series
        "manufacturer": figurine.manufacturer,  # Added manufacturer
        "release_date": figurine.release_date,  # Added release date
    })


@login_required
def add_to_collection(request, figurine_id):
    figurine = get_object_or_404(Figurine, id=figurine_id)
    Collection.objects.get_or_create(user=request.user, figurine=figurine)
    return redirect("figurine_detail", figurine_id=figurine.id)


@login_required
def add_to_wishlist(request, figurine_id):
    figurine = get_object_or_404(Figurine, id=figurine_id)
    Wishlist.objects.get_or_create(user=request.user, figurine=figurine)
    return redirect("figurine_detail", figurine_id=figurine.id)


def index(request):
    figurines = Figurine.objects.all()
    return render(request, "App.html", {"figurines": figurines})
