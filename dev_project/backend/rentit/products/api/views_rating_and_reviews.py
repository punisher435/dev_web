from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework import filters
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.pagination import PageNumberPagination
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from rest_framework import mixins

from bookings.models import room_rating_and_reviews,shop_rating_and_reviews,apartment_rating_and_reviews
from products.models import rooms,shops,apartments
from bookings.serializers import room_rating_and_reviews_serializer
from bookings.serializers import shop_rating_and_reviews_serializer
from bookings.serializers import apartment_rating_and_reviews_serializer
from bookings.models import roomBookings,shopBookings,apartmentBookings
from user.models import seller_rating_and_reviews


class StandardResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 10


class room_reviews(viewsets.ReadOnlyModelViewSet):

    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']
    serializer_class = room_rating_and_reviews_serializer

    def get_queryset(self):
        room = self.request.query_params.get('room_id')
        query_set = room_rating_and_reviews.objects.all()
        query_set = query_set.filter(room_id=room)
        return query_set



class give_reviews(viewsets.ViewSet):

    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def create(self,request):
        print(request.data)
        try:

            if request.user.is_seller==False:

                if request.data['type']=='room':
                    
                    queryset = roomBookings.objects.all()
                    queryset = queryset.filter(customer_id=request.user)
                    booking = get_object_or_404(queryset,pk=request.data['bookingid'])
                    
                    if booking.room_review==False and booking.cancelled==False:

                        review = room_rating_and_reviews(booking_id = booking,room_id = booking.room_id,customer_id=request.user,
                        rating=int(request.data['rating']),reviews = request.data['review'],photo1 = request.data['photo1'],photo2 = request.data['photo2'],photo3=request.data['photo3'])

                        review.save()

                        if(request.data['seller_review']!='' or int(request.data['seller_rating'])!=0):

                            seller_review = seller_rating_and_reviews(seller_id = booking.seller_id,customer_id=request.user,
                            rating = int(request.data["seller_rating"]),reviews= request.data['seller_review'])

                            seller_review.save()

                        room = get_object_or_404(rooms.objects.all(),pk=booking.room_id.room_id)

                        rate = room.avg_rating
                        total = room.reviews

                        total_rate = float(rate*total) + float(request.data['rating'])
                        total = total + 1

                        room.avg_rating = float(total_rate)/float(total)
                        room.reviews = total

                        room.save()


                    booking.room_review=True

                    booking.save()

                if request.data['type']=='shop':
                    
                    queryset = shopBookings.objects.all()
                    queryset = queryset.filter(customer_id=request.user)
                    booking = get_object_or_404(queryset,pk=request.data['bookingid'])
                    
                    if booking.shop_review==False and booking.cancelled==False:

                        review = shop_rating_and_reviews(booking_id = booking,shop_id = booking.shop_id,customer_id=request.user,
                        rating=int(request.data['rating']),reviews = request.data['review'],photo1 = request.data['photo1'],photo2 = request.data['photo2'],photo3=request.data['photo3'])

                        review.save()

                        if(request.data['seller_review']!='' or int(request.data['seller_rating'])!=0):

                            seller_review = seller_rating_and_reviews(seller_id = booking.seller_id,customer_id=request.user,
                            rating = int(request.data["seller_rating"]),reviews= request.data['seller_review'])

                            seller_review.save()

                        room = get_object_or_404(shops.objects.all(),pk=booking.shop_id.shop_id)

                        rate = room.avg_rating
                        total = room.reviews

                        total_rate = float(rate*total) + float(request.data['rating'])
                        total = total + 1

                        room.avg_rating = float(total_rate)/float(total)
                        room.reviews = total

                        room.save()


                    booking.shop_review=True

                    booking.save()

                if request.data['type']=='apartment':
                    
                    queryset = apartmentBookings.objects.all()
                    queryset = queryset.filter(customer_id=request.user)
                    booking = get_object_or_404(queryset,pk=request.data['bookingid'])
                    
                    if booking.apartment_review==False and booking.cancelled==False:

                        review = apartment_rating_and_reviews(booking_id = booking,apartment_id = booking.apartment_id,customer_id=request.user,
                        rating=int(request.data['rating']),reviews = request.data['review'],photo1 = request.data['photo1'],photo2 = request.data['photo2'],photo3=request.data['photo3'])

                        review.save()

                        if(request.data['seller_review']!='' or int(request.data['seller_rating'])!=0):

                            seller_review = seller_rating_and_reviews(seller_id = booking.seller_id,customer_id=request.user,
                            rating = int(request.data["seller_rating"]),reviews= request.data['seller_review'])

                            seller_review.save()

                        room = get_object_or_404(apartments.objects.all(),pk=booking.apartment_id.apartment_id)

                        rate = room.avg_rating
                        total = room.reviews

                        total_rate = float(rate*total) + float(request.data['rating'])
                        total = total + 1

                        room.avg_rating = float(total_rate)/float(total)
                        room.reviews = total

                        room.save()


                    booking.apartment_review=True

                    booking.save()



            return Response('success', status=status.HTTP_201_CREATED)
        except:
            return Response('error', status=status.HTTP_400_BAD_REQUEST)


class shop_reviews(viewsets.ReadOnlyModelViewSet):
    
    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']

    serializer_class = shop_rating_and_reviews_serializer

    def get_queryset(self):
        shop = self.request.query_params.get('shop_id')
        query_set = shop_rating_and_reviews.objects.all()
        query_set = query_set.filter(shop_id=shop)
        return query_set

class give_shop_reviews(viewsets.ViewSet):

    @permission_classes([IsAuthenticated])
    def create(self,request):
        serializer = shop_rating_and_reviews_serializer(data=request.data)
        if serializer.is_valid() and (not request.user.is_seller):
            serializer.validated_data["customer_id"]=request.user
            x=serializer.validated_data["shop_id"]
            y=serializer.validated_data["rating"]
            serializer.save()

            query_set = shops.objects.all()
            shop=get_object_or_404(query_set,pk=x)
            total_rating=(shop.avg_rating*shop.reviews)+y
            shop.reviews=shop.reviews+1
            shop.avg_rating=round((total_rating/shop.reviews),1)
            shop.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def destroy (self,request,pk=None):
        queryset = shop_rating_and_reviews.objects.all()
        review = get_object_or_404(queryset,pk=pk)
        if review.customer_id==request.user:
            review.delete()
            return Response("Deleted",status=status.HTTP_200_OK)
        else:
            return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)

        
class apartment_reviews(viewsets.ReadOnlyModelViewSet):
    
    pagination_class = StandardResultsSetPagination
    filter_backends=(filters.OrderingFilter,)
    ordering_fields = ['timestamp','rating']
    ordering = ['-rating']

    serializer_class = apartment_rating_and_reviews_serializer

    def get_queryset(self):
        apartment = self.request.query_params.get('apartment_id')
        query_set = apartment_rating_and_reviews.objects.all()
        query_set = query_set.filter(apartment_id=apartment)
        return query_set



class give_apartment_reviews(viewsets.ViewSet):
    
    @permission_classes([IsAuthenticated])
    def create(self,request):
        serializer = apartment_rating_and_reviews_serializer(data=request.data)
        if serializer.is_valid() and (not request.user.is_seller):
            serializer.validated_data["customer_id"]=request.user
            x=serializer.validated_data["apartment_id"]
            y=serializer.validated_data["rating"]
            serializer.save()

            query_set = rooms.objects.all()
            apartment=get_object_or_404(query_set,pk=x)
            total_rating=(apartment.avg_rating*apartment.reviews)+y
            apartment.reviews=apartment.reviews+1
            apartment.avg_rating=round((total_rating/apartment.reviews),1)
            apartment.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

    @permission_classes([IsAuthenticated])
    def destroy (self,request,pk=None):
        queryset = apartment_rating_and_reviews.objects.all()
        review = get_object_or_404(queryset,pk=pk)
        if review.customer_id==request.user:
            review.delete()
            return Response("Deleted",status=status.HTTP_200_OK)
        else:
            return Response("ERROR", status=status.HTTP_400_BAD_REQUEST)



