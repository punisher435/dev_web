import datetime

from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser,FormParser
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework_simplejwt import authentication
from django.core.mail import send_mail
from django_filters import rest_framework as rest_filters
from rest_framework import filters

from rest_framework.pagination import PageNumberPagination


from .serializers import room_list_serializer,room_detail_serializer
from products.models import rooms,shops,apartments
from rentit.settings import EMAIL_HOST_USER
from .serializers import shop_list_serializer,shop_detail_serializer
from .serializers import apartment_list_serializer,apartment_detail_serializer

from products.models import minmax_room,minmax_shop,minmax_apartment
from .serializers import minmax_room_serializer,minmax_shop_serializer,minmax_apartment_serializer
from user.models import seller_bank_details


#pagination

class StandardResultsSetPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 20




#filters

def filter_discount(queryset,name,value):
    if not value:
        return queryset
    
    

    queryset.filter( lambda x: x.owner_discount+x.company_discount+x.commission+x.fake_discount>=value)
        
    return queryset


class room_filter(rest_filters.FilterSet):



    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    bed_filter = rest_filters.NumberFilter(field_name='total_beds',lookup_expr='gte')
    capacity_filter = rest_filters.NumberFilter(field_name='capacity',lookup_expr='exact')
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    balcony_filter = rest_filters.NumberFilter(field_name='balcony',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lt')
    discount = rest_filters.NumberFilter(field_name='net_discount',lookup_expr='gte')

    city1 = rest_filters.CharFilter(method='get_city',field_name='net_discount')
    state1 = rest_filters.CharFilter(method='get_state',field_name='net_discount')
    district1 = rest_filters.CharFilter(method='get_district',field_name='net_discount')
    country1 = rest_filters.CharFilter(method='get_country',field_name='net_discount')
    landmark1 = rest_filters.CharFilter(method='get_landmark',field_name='net_discount')
    pincode1 = rest_filters.CharFilter(method='get_pincode',field_name='net_discount')
    location1 = rest_filters.CharFilter(method='get_location',field_name='net_discount')

    def get_city(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(city__icontains=value)
        return queryset

    def get_state(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(state__icontains=value)
        return queryset
    def get_district(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(district__icontains=value)
        return queryset

    def get_country(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(country__icontains=value)
        return queryset

    def get_landmark(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(landmark__icontains=value)
        return queryset

    def get_pincode(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(pincode__icontains=value)
        return queryset

    def get_location(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(location__icontains=value)
        return queryset

    class Meta:
        model = rooms
        fields = ['room_cleaning','landmark1','discount','gender','windows_filter','bookedtill_filter','nonveg_food','veg_food','guest_allowed','iron','laundry','cooler','AC','room_TV','power_backup','floor_filter','purified_water','min_rating','cctv_building','bed_type','building_guard','balcony_filter','separate_washroom','category','location1','city1','state1','country1','pincode1','wifi','breakfast','lunch','dinner','house_TV','power_backup','geyser','electricity','country1','min_price','max_price','capacity_filter','trust_points_filter','booked']


class room_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filterset_class = room_filter
    search_fields = ['^category','^location','^city','^landmark','^state','^country','^pincode']
    ordering_fields = ['final_price','capacity','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = rooms.objects.all()
    query_set = query_set.filter(verified=True)
    queryset = query_set.filter(removed=False)
    queryset = query_set.filter(pausebooking=False)
    serializer_class = room_list_serializer







class my_room_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        queryset = rooms.personal_rooms.get_seller_rooms(request.user)
        queryset = queryset.filter(removed=False)
        serializer = room_list_serializer(queryset,context={'request':request},many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None,format=None):
        queryset = rooms.personal_rooms.get_seller_rooms(request.user)
        queryset = queryset.filter(removed=False)
        room = get_object_or_404(queryset,pk=pk)
        serializer = room_detail_serializer(room,context={'request':request})
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def create(self,request,format=None):

        try:
        
        
            if request.user.is_seller and request.user.profile_completed and request.user.address_completed and request.user.bank_completed:
                
                


                print(request.data)
                
                seller_price = int(request.data["seller_price"])
                price = seller_price + ((seller_price*int(request.data["owner_discount"]))/100)

                print(bool(request.data["wifi"]=='true'))

                queryset = seller_bank_details.objects.all()
                queryset = queryset.filter(user_id=request.user)
                bank = get_object_or_404(queryset,pk=request.user.pk)

                print(type(bank.currency))

                booked_till = datetime.date(1910,1,1)

                

                room = rooms(title=request.data["title"],seller_id=request.user,bookedtill=booked_till,price=price,seller_price=seller_price,owner_discount=int(request.data["owner_discount"]),net_discount=int(request.data["owner_discount"]),final_price=seller_price,capacity=int(request.data["capacity"]),photo1=request.data["photo1"],photo2=request.data["photo2"],photo3=request.data["photo3"],photo4=request.data["photo4"],photo5=request.data["photo5"],video=request.data["video"],contact=request.data["contact"],
                owner=request.user.first_name+' '+request.user.last_name,location=request.data["location"].upper(),city=request.data["city"].upper(),state=request.data["state"].upper(),country=request.data["country"].upper(),landmark=request.data["landmark"].upper(),pincode=request.data["pincode"],currency=bank.currency,longitude=float(request.data["longitude"]),latitude=float(request.data["latitude"]),length=int(request.data["length"]),breadth=int(request.data["breadth"]),height=int(request.data["height"]),furniture=request.data["furniture"],category=request.data["category"],
                facility=request.data["facility"],district=request.data["district"].upper(),description=request.data["description"],cctv_building=bool(request.data["cctv_building"]=='true'),building_guard=bool(request.data["building_guard"]=='true'),balcony=int(request.data["balcony"]),separate_washroom=bool(request.data["separate_washroom"]=='true'),windows=int(request.data["windows"]),fans=int(request.data["fans"]),bed_type=request.data["bed_type"],floor_no=int(request.data["floor_no"]),
                cost_electricity=int(request.data["cost_electricity"]),total_beds=int(request.data["total_beds"]),cost_water=int(request.data["cost_water"]),purified_water=bool(request.data["purified_water"]=='true'),removable_purified_water=bool(request.data["removable_purified_water"]=='true'),cost_purified_water=int(request.data["cost_purified_water"]),house_TV=bool(request.data["house_TV"]=='true'),removable_house_TV=bool(request.data["removable_house_TV"]=='true'),
                cost_TV=int(request.data["cost_TV"]),room_TV=bool(request.data["room_TV"]=='true'),cost_roomTV=int(request.data["cost_roomTV"]),removable_room_TV=bool(request.data["removable_room_TV"]=='true'),house_refridgerator=bool(request.data["house_refridgerator"]=='true'),removable_house_refridgerator=bool(request.data["removable_house_refridgerator"]=='true'),cost_refridgerator=int(request.data["cost_refridgerator"]),
                room_refridgerator=bool(request.data["room_refridgerator"]=='true'),cost_roomrefridgerator=int(request.data["cost_roomrefridgerator"]),removable_room_refridgerator=bool(request.data["removable_room_refridgerator"]=='true'),power_backup=bool(request.data["power_backup"]=='true'),geyser=bool(request.data["geyser"]=='true'),removable_geyser=bool(request.data["removable_geyser"]=='true'),cost_geyser=int(request.data["cost_geyser"]),
                wifi=bool(request.data["wifi"]=='true'),cost_wifi=int(request.data["cost_wifi"]),removable_wifi=bool(request.data["removable_wifi"]=='true'),AC=bool(request.data["AC"]=='true'),cost_AC=int(request.data["cost_AC"]),removable_AC=bool(request.data["removable_AC"]=='true'),cooler=bool(request.data["cooler"]=='true'),cost_cooler=int(request.data["cost_cooler"]),removable_cooler=bool(request.data["removable_cooler"]=='true'),laundry=bool(request.data["laundry"]=='true'),cost_laundry=int(request.data["cost_laundry"]),
                iron=bool(request.data["iron"]=='true'),cost_iron=int(request.data["cost_iron"]),guest_allowed=bool(request.data["guest_allowed"]=='true'),guest_policy=request.data["guest_policy"],veg_food=bool(request.data["veg_food"]=='true'),nonveg_food=bool(request.data["nonveg_food"]=='true'),food_policy=request.data["food_policy"],breakfast=bool(request.data["breakfast"]=='true'),cost_breakfast=int(request.data["cost_breakfast"]),removable_breakfast=bool(request.data["removable_breakfast"]=='true'),lunch=bool(request.data["lunch"]=='true'),cost_lunch=int(request.data["cost_lunch"]),removable_lunch=bool(request.data["removable_lunch"]=='true'),
                dinner=bool(request.data["dinner"]=='true'),cost_dinner=int(request.data["cost_dinner"]),removable_dinner=bool(request.data["removable_dinner"]=='true'),room_cleaning=bool(request.data["room_cleaning"]=='true'),cost_cleaning=int(request.data["cost_cleaning"]),nearby_station1=request.data["nearby_station1"],nearby_station2=request.data["nearby_station2"],distance1=float(request.data["distance1"]),distance2=float(request.data["distance2"]),room_policy=request.data["room_policy"],
                address_proof=request.data["address_proof"],gender=request.data["gender"])

                room.save()

                return Response('success',status=status.HTTP_200_OK)
            else:
                return Response('error',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


    def update(self, request,pk=None,format=None):

        try:
        
            queryset = rooms.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)

            seller_price = int(request.data["seller_price"])
            our_price = seller_price + ((seller_price*room.commission)/100)
            price = our_price + ((our_price*(int(request.data["owner_discount"])+room.commission+room.company_discount+room.fake_discount))/100) 

            room.title=request.data["title"]  
            room.seller_price=seller_price  
            room.owner_discount=int(request.data["owner_discount"]) 
            room.net_discount=int(request.data["owner_discount"])+room.company_discount+room.fake_discount+room.commission

            room.final_price=our_price
            room.price=price
            if(request.data["photo1"]!='undefined'):
                room.photo1=request.data["photo1"] 
            if(request.data["photo2"]!='undefined'):
                room.photo2=request.data["photo2"] 
            if(request.data["photo3"]!='undefined'):
                room.photo3=request.data["photo3"] 
            if(request.data["photo4"]!='undefined'):
                room.photo4=request.data["photo4"] 
            if(request.data["photo5"]!='undefined'):
                room.photo5=request.data["photo5"] 

            if(request.data["video"]!='undefined'):
                room.video=request.data["video"] 
            if(request.data["address_proof"]!='undefined'):
                room.address_proof=request.data["address_proof"] 
                        
            room.location=request.data["location"]                                
            room.longitude=float(request.data["longitude"])            
            room.latitude=float(request.data["latitude"])            
            room.length=int(request.data["length"])  
            room.total_beds=int(request.data["total_beds"])            
            room.breadth=int(request.data["breadth"])            
            room.height=int(request.data["height"])    
            room.contact=request.data["contact"]       
            room.furniture=request.data["furniture"]            
            room.category=request.data["category"]                       
            room.facility=request.data["facility"]            
            room.description=request.data["description"]            
            room.cctv_building=bool(request.data["cctv_building"]=='true')           
            room.building_guard=bool(request.data["building_guard"]=='true')            
            room.balcony=int(request.data["balcony"])            
            room.separate_washroom=bool(request.data["separate_washroom"]=='true')            
            room.windows=int(request.data["windows"])            
            room.fans=int(request.data["fans"])            
            room.bed_type=request.data["bed_type"]            
            room.floor_no=int(request.data["floor_no"])            
            room.cost_electricity=int(request.data["cost_electricity"])            
            room.cost_water=int(request.data["cost_water"])            
            room.purified_water=bool(request.data["purified_water"]=='true')            
            room.removable_purified_water=bool(request.data["removable_purified_water"]=='true')            
            room.cost_purified_water=int(request.data["cost_purified_water"])            
            room.house_TV=bool(request.data["house_TV"]=='true')            
            room.removable_house_TV=bool(request.data["removable_house_TV"]=='true')            
            room.cost_TV=int(request.data["cost_TV"])            
            room.room_TV=bool(request.data["room_TV"]=='true')            
            room.cost_roomTV=int(request.data["cost_roomTV"])            
            room.removable_room_TV=bool(request.data["removable_room_TV"]=='true')            
            room.house_refridgerator=bool(request.data["house_refridgerator"]=='true')            
            room.removable_house_refridgerator=bool(request.data["removable_house_refridgerator"]=='true')            
            room.cost_refridgerator=int(request.data["cost_refridgerator"])            
            room.room_refridgerator=bool(request.data["room_refridgerator"]=='true')            
            room.cost_roomrefridgerator=int(request.data["cost_roomrefridgerator"])            
            room.removable_room_refridgerator=bool(request.data["removable_room_refridgerator"]=='true')            
            room.power_backup=bool(request.data["power_backup"]=='true')            
            room.geyser=bool(request.data["geyser"]=='true')            
            room.removable_geyser=bool(request.data["removable_geyser"]=='true')            
            room.cost_geyser=int(request.data["cost_geyser"])            
            room.wifi=bool(request.data["wifi"]=='true')            
            room.cost_wifi=int(request.data["cost_wifi"])            
            room.removable_wifi=bool(request.data["removable_wifi"]=='true')            
            room.AC=bool(request.data["AC"]=='true')            
            room.cost_AC=int(request.data["cost_AC"])            
            room.removable_AC=bool(request.data["removable_AC"]=='true')            
            room.cooler=bool(request.data["cooler"]=='true')            
            room.cost_cooler=int(request.data["cost_cooler"])            
            room.removable_cooler=bool(request.data["removable_cooler"]=='true')            
            room.laundry=bool(request.data["laundry"]=='true')            
            room.cost_laundry=int(request.data["cost_laundry"])            
            room.iron=bool(request.data["iron"]=='true')            
            room.cost_iron=int(request.data["cost_iron"])            
            room.guest_allowed=bool(request.data["guest_allowed"]=='true')            
            room.guest_policy=request.data["guest_policy"]            
            room.veg_food=bool(request.data["veg_food"]=='true')            
            room.nonveg_food=bool(request.data["nonveg_food"]=='true')            
            room.food_policy=request.data["food_policy"]            
            room.breakfast=bool(request.data["breakfast"]=='true')            
            room.cost_breakfast=int(request.data["cost_breakfast"])            
            room.removable_breakfast=bool(request.data["removable_breakfast"]=='true')            
            room.lunch=bool(request.data["lunch"]=='true')            
            room.cost_lunch=int(request.data["cost_lunch"])            
            room.removable_lunch=bool(request.data["removable_lunch"]=='true')            
            room.dinner=bool(request.data["dinner"]=='true')            
            room.cost_dinner=int(request.data["cost_dinner"])            
            room.removable_dinner=bool(request.data["removable_dinner"]=='true')            
            room.room_cleaning=bool(request.data["room_cleaning"]=='true')            
            room.cost_cleaning=int(request.data["cost_cleaning"])            
            room.nearby_station1=request.data["nearby_station1"]           
            room.nearby_station2=request.data["nearby_station2"]            
            room.distance1=float(request.data["distance1"])            
            room.distance2=float(request.data["distance2"])            
            room.room_policy=request.data["room_policy"]  
            room.gender=request.data["gender"]  
            room.location=request.data["location"].upper()   
            room.landmark=request.data["landmark"].upper()       
            room.pincode=request.data["pincode"]           

            room.save()

            print('success')



            return Response('success',status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)



    def destroy(self,request,pk=None):
        try:

            queryset = rooms.personal_rooms.get_seller_rooms(request.user)
            room = get_object_or_404(queryset,pk=pk)
            room.removed = True
            room.save()

            subject = 'Room Deleted'
            message = 'Your room has been deleted'
            recepient = request.user
            send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

            return Response("Deleted",status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self,request,pk=None):
        try:
            print('hy')
            queryset = rooms.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)

            if room.pausebooking==True:

                room.pausebooking = False
                room.save()
                subject = 'Booking resumed'
                message = 'Bookings on your room is resumed'
                recepient = request.user
                send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

                return Response("Success",status=status.HTTP_200_OK)

            if room.pausebooking==False:
        
                room.pausebooking = True
                room.save()
                subject = 'Booking paused'
                message = 'Bookings on your room is paused'
                recepient = request.user
                send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

                return Response("Success",status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


class minmax_room_viewset(viewsets.ReadOnlyModelViewSet):
    queryset = minmax_room.objects.all()
    serializer_class = minmax_room_serializer



#shops

class shop_filter(rest_filters.FilterSet):
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    room_filter = rest_filters.NumberFilter(field_name='total_rooms',lookup_expr='exact')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lt')
    washroom_filter = rest_filters.NumberFilter(field_name='washroom',lookup_expr='gte')
    balcony_filter = rest_filters.NumberFilter(field_name='balcony',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    discount = rest_filters.NumberFilter(field_name='net_discount',lookup_expr='gte')
    district1 = rest_filters.CharFilter(method='get_district',field_name='net_discount')

    city1 = rest_filters.CharFilter(method='get_city',field_name='net_discount')
    state1 = rest_filters.CharFilter(method='get_state',field_name='net_discount')
    country1 = rest_filters.CharFilter(method='get_country',field_name='net_discount')
    landmark1 = rest_filters.CharFilter(method='get_landmark',field_name='net_discount')
    pincode1 = rest_filters.CharFilter(method='get_pincode',field_name='net_discount')
    location1 = rest_filters.CharFilter(method='get_location',field_name='net_discount')

    def get_city(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(city__icontains=value)
        return queryset

    def get_district(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(district__icontains=value)
        return queryset

    def get_state(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(state__icontains=value)
        return queryset

    def get_country(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(country__icontains=value)
        return queryset

    def get_landmark(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(landmark__icontains=value)
        return queryset

    def get_pincode(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(pincode__icontains=value)
        return queryset

    def get_location(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(location__icontains=value)
        return queryset

    

    class Meta:
        model = shops
        fields = ['shop_cleaning','discount','gender','city1','state1','country1','landmark1','pincode1','location','cctv_building','AC','cooler','TV','building_guard','min_rating','separate_washroom','purified_water','floor_filter','room_filter','windows_filter','bookedtill_filter','water_facility','wifi','power_backup','electricity','category','min_price','max_price','trust_points_filter','booked']


    

            
class shop_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filterset_class = shop_filter
    search_fields = ['^category','^location','^city','^landmark','^state','^country','^pincode']
    ordering_fields = ['final_price','capacity','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = shops.objects.all()
    query_set = query_set.filter(verified=True)
    query_set = query_set.filter(pausebooking=False)
    queryset = query_set.filter(removed=False)
    serializer_class = shop_list_serializer

    




class my_shop_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        queryset = shops.personal_shops.get_seller_shops(request.user)
        queryset = queryset.filter(removed=False)
        serializer = shop_list_serializer(queryset,context={'request':request},many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None,format=None):
        queryset = shops.personal_shops.get_seller_shops(request.user)
        queryset = queryset.filter(removed = False)
        shop = get_object_or_404(queryset,pk=pk)
        serializer = shop_detail_serializer(shop,context={'request':request})
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def create(self,request,format=None):
        try:
            if request.user.is_seller and request.user.profile_completed and request.user.address_completed and request.user.bank_completed:

                print(request.data)
                
                seller_price = int(request.data["seller_price"])
                price = seller_price + ((seller_price*int(request.data["owner_discount"]))/100)

                queryset = seller_bank_details.objects.all()
                queryset = queryset.filter(user_id=request.user)
                bank = get_object_or_404(queryset,pk=request.user.pk)

                print(type(bank.currency))
                booked_till = datetime.date(2000,1,1)

                shop = shops(title=request.data["title"],bookedtill=booked_till,seller_id=request.user,price=price,net_discount=int(request.data["owner_discount"]),seller_price=seller_price,owner_discount=int(request.data["owner_discount"]),final_price=seller_price,photo1=request.data["photo1"],photo2=request.data["photo2"],photo3=request.data["photo3"],photo4=request.data["photo4"],photo5=request.data["photo5"],video=request.data["video"],
                owner=request.user.first_name+' '+request.user.last_name,location=request.data["location"].upper(),city=request.data["city"].upper(),state=request.data["state"].upper(),country=request.data["country"].upper(),landmark=request.data["landmark"].upper(),pincode=request.data["pincode"],currency=bank.currency,longitude=float(request.data["longitude"]),latitude=float(request.data["latitude"]),length=int(request.data["length"]),breadth=int(request.data["breadth"]),height=int(request.data["height"]),furniture=request.data["furniture"],category=request.data["category"],
                facility=request.data["facility"],description=request.data["description"],cctv_building=bool(request.data["cctv_building"]=='true'),building_guard=bool(request.data["building_guard"]=='true'),balcony=int(request.data["balcony"]),separate_washroom=bool(request.data["separate_washroom"]=='true'),windows=int(request.data["windows"]),fans=int(request.data["fans"]),floor_no=int(request.data["floor_no"]),
                cost_electricity=int(request.data["cost_electricity"]),cost_water=int(request.data["cost_water"]),purified_water=bool(request.data["purified_water"]=='true'),removable_purified_water=bool(request.data["removable_purified_water"]=='true'),cost_purified_water=int(request.data["cost_purified_water"]),
                washroom=int(request.data["washroom"]),contact=request.data["contact"],total_rooms=int(request.data["total_rooms"]),total_floors=int(request.data["total_floors"]),
                power_backup=bool(request.data["power_backup"]=='true'),district=request.data["district"].upper(),
                wifi=bool(request.data["wifi"]=='true'),cost_wifi=int(request.data["cost_wifi"]),removable_wifi=bool(request.data["removable_wifi"]=='true'),
                TV=bool(request.data["TV"]=='true'),cost_TV=int(request.data["cost_TV"]),removable_TV=bool(request.data["removable_TV"]=='true'),
                cooler=bool(request.data["cooler"]=='true'),cost_cooler=int(request.data["cost_cooler"]),removable_cooler=bool(request.data["removable_cooler"]=='true'),
                AC=bool(request.data["AC"]=='true'),cost_AC=int(request.data["cost_AC"]),removable_AC=bool(request.data["removable_AC"]=='true'),
                shop_cleaning=bool(request.data["shop_cleaning"]=='true'),cost_cleaning=int(request.data["cost_cleaning"]),nearby_station1=request.data["nearby_station1"],nearby_station2=request.data["nearby_station2"],distance1=float(request.data["distance1"]),distance2=float(request.data["distance2"]),shop_policy=request.data["shop_policy"],
                address_proof=request.data["address_proof"],gender=request.data["gender"])

                shop.save()

                print('success')
                return Response('success',status=status.HTTP_200_OK)
            else:
                return Response('error',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    def update(self, request,pk=None,format=None):
        
        try:
        
            queryset = shops.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)

            seller_price = int(request.data["seller_price"])
            our_price = seller_price + ((seller_price*room.commission)/100)
            price = our_price + ((our_price*(int(request.data["owner_discount"])+room.commission+room.company_discount+room.fake_discount))/100) 

            room.title=request.data["title"]  
            room.seller_price=seller_price  
            room.owner_discount=int(request.data["owner_discount"]) 
            room.net_discount=int(request.data["owner_discount"])+room.company_discount+room.fake_discount+room.commission
            room.price=price
            room.final_price=our_price
            room.price=price
            if(request.data["photo1"]!='undefined'):
                room.photo1=request.data["photo1"] 
            if(request.data["photo2"]!='undefined'):
                room.photo2=request.data["photo2"] 
            if(request.data["photo3"]!='undefined'):
                room.photo3=request.data["photo3"] 
            if(request.data["photo4"]!='undefined'):
                room.photo4=request.data["photo4"] 
            if(request.data["photo5"]!='undefined'):
                room.photo5=request.data["photo5"] 

            if(request.data["video"]!='undefined'):
                room.video=request.data["video"] 
            if(request.data["address_proof"]!='undefined'):
                room.address_proof=request.data["address_proof"] 
                        
            room.location=request.data["location"]                                
            room.longitude=float(request.data["longitude"])            
            room.latitude=float(request.data["latitude"])            
            room.length=int(request.data["length"])            
            room.breadth=int(request.data["breadth"])            
            room.height=int(request.data["height"])            
            room.furniture=request.data["furniture"]            
            room.category=request.data["category"]                       
            room.facility=request.data["facility"]   
            room.contact=request.data["contact"]     
            room.description=request.data["description"]            
            room.cctv_building=bool(request.data["cctv_building"]=='true')           
            room.building_guard=bool(request.data["building_guard"]=='true')            
            room.balcony=int(request.data["balcony"])            
            room.separate_washroom=bool(request.data["separate_washroom"]=='true')            
            room.windows=int(request.data["windows"])            
            room.fans=int(request.data["fans"])                     
            room.floor_no=int(request.data["floor_no"])            
            room.cost_electricity=int(request.data["cost_electricity"])            
            room.cost_water=int(request.data["cost_water"])            
            room.purified_water=bool(request.data["purified_water"]=='true')            
            room.removable_purified_water=bool(request.data["removable_purified_water"]=='true')            
            room.cost_purified_water=int(request.data["cost_purified_water"])            
                
            room.power_backup=bool(request.data["power_backup"]=='true')            
                       
            room.wifi=bool(request.data["wifi"]=='true')            
            room.cost_wifi=int(request.data["cost_wifi"])            
            room.removable_wifi=bool(request.data["removable_wifi"]=='true')            

            room.TV=bool(request.data["TV"]=='true')            
            room.cost_TV=int(request.data["cost_TV"])            
            room.removable_TV=bool(request.data["removable_TV"]=='true')  

            room.cooler=bool(request.data["cooler"]=='true')            
            room.cost_cooler=int(request.data["cost_cooler"])            
            room.removable_cooler=bool(request.data["removable_cooler"]=='true')   

            room.AC=bool(request.data["AC"]=='true')            
            room.cost_AC=int(request.data["cost_AC"]) 
            room.removable_AC=bool(request.data["removable_AC"]=='true')       
                                       
            room.gender=request.data["gender"]

                     
                     
            room.shop_cleaning=bool(request.data["shop_cleaning"]=='true')            
            room.cost_cleaning=int(request.data["cost_cleaning"])            
            room.nearby_station1=request.data["nearby_station1"]           
            room.nearby_station2=request.data["nearby_station2"]            
            room.distance1=float(request.data["distance1"])            
            room.distance2=float(request.data["distance2"])            
            room.shop_policy=request.data["shop_policy"]   

            room.location=request.data["location"].upper()    
            room.landmark=request.data["landmark"].upper() 
            room.pincode=request.data["pincode"]          

            room.save()

            print('success')



            return Response('success',status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        try:
            queryset = shops.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)
            room.removed = True
            room.save()

            subject = 'Shop Deleted'
            message = 'Your Shop has been deleted'
            recepient = request.user
            send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

            return Response("Deleted",status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self,request,pk=None):
        try:
            print('hy')
            queryset = shops.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)

            if room.pausebooking==True:

                room.pausebooking = False
                room.save()
                subject = 'Booking resumed'
                message = 'Bookings on your shop is resumed'
                recepient = request.user
                send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

                return Response("Success",status=status.HTTP_200_OK)

            if room.pausebooking==False:
        
                room.pausebooking = True
                room.save()
                subject = 'Booking paused'
                message = 'Bookings on your shops is paused'
                recepient = request.user
                send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

                return Response("Success",status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


class minmax_shop_viewset(viewsets.ReadOnlyModelViewSet):
    queryset = minmax_shop.objects.all()
    serializer_class = minmax_shop_serializer



# apartments


class apartment_filter(rest_filters.FilterSet):
    min_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='gte')
    max_price = rest_filters.NumberFilter(field_name='final_price',lookup_expr='lte')
    BHK_filter = rest_filters.NumberFilter(field_name='BHK',lookup_expr='exact')
    trust_points_filter = rest_filters.NumberFilter(field_name='trust_points',lookup_expr='gte')
    bookedtill_filter = rest_filters.DateFilter(field_name='bookedtill', lookup_expr='lte')
    min_rating = rest_filters.NumberFilter(field_name='avg_rating',lookup_expr='gte')
    floor_filter = rest_filters.NumberFilter(field_name='floor_no',lookup_expr='exact')
    room_filter = rest_filters.NumberFilter(field_name='total_rooms',lookup_expr='gte')
    beds_filter = rest_filters.NumberFilter(field_name='total_beds',lookup_expr='gte')
    AC_filter = rest_filters.NumberFilter(field_name='total_AC',lookup_expr='gte')
    cooler_filter = rest_filters.NumberFilter(field_name='total_cooler',lookup_expr='gte')
    TV_filter = rest_filters.NumberFilter(field_name='total_TV',lookup_expr='gte')
    geyser_filter = rest_filters.NumberFilter(field_name='total_geyser',lookup_expr='gte')
    washroom_filter = rest_filters.NumberFilter(field_name='washroom',lookup_expr='gte')
    windows_filter = rest_filters.NumberFilter(field_name='windows',lookup_expr='gte')
    balcony_filter = rest_filters.NumberFilter(field_name='balcony',lookup_expr='gte')
    discount = rest_filters.NumberFilter(field_name='net_discount',lookup_expr='gte')

    city1 = rest_filters.CharFilter(method='get_city',field_name='net_discount')
    state1 = rest_filters.CharFilter(method='get_state',field_name='net_discount')
    country1 = rest_filters.CharFilter(method='get_country',field_name='net_discount')
    landmark1 = rest_filters.CharFilter(method='get_landmark',field_name='net_discount')
    pincode1 = rest_filters.CharFilter(method='get_pincode',field_name='net_discount')
    location1 = rest_filters.CharFilter(method='get_location',field_name='net_discount')
    district1 = rest_filters.CharFilter(method='get_district',field_name='net_discount')

    def get_city(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(city__icontains=value)
        return queryset

    def get_state(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(state__icontains=value)
        return queryset
    def get_district(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(district__icontains=value)
        return queryset

    def get_country(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(country__icontains=value)
        return queryset

    def get_landmark(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(landmark__icontains=value)
        return queryset

    def get_pincode(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(pincode__icontains=value)
        return queryset

    def get_location(self,queryset,field_name,value,):
        if value:
            
            queryset = queryset.filter(location__icontains=value)
        return queryset

   
    

    class Meta:
        model = apartments
        fields = ['apartment_cleaning','discount','gender','geyser_filter','washroom_filter','bed_type','laundry','TV','geyser','purified_water','cooler','house_refridgerator','AC','apartment_type','sofa','floor_filter','room_filter','balcony_filter','washroom','cctv_building','building_guard','min_rating','bookedtill_filter','geyser','power_backup','TV','water_facility','electricity','category','location1','city1','state1','country1','landmark1','pincode1','min_price','max_price','BHK_filter','trust_points_filter','booked']


class apartment_viewset(viewsets.ReadOnlyModelViewSet):
    parser_classes=(MultiPartParser,FormParser)
    filter_backends=(rest_filters.DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter,)
    pagination_class = StandardResultsSetPagination
    filterset_class = apartment_filter

    search_fields = ['^category','^location','^city','^landmark','^state','^country','^pincode']
    ordering_fields = ['final_price','BHK','trust_points','avg_rating']
    ordering = ['-trust_points']

    query_set = apartments.objects.all()
    query_set = query_set.filter(verified=True)
    query_set = query_set.filter(pausebooking=False)
    queryset = query_set.filter(removed=False)
    serializer_class = apartment_list_serializer
 

class my_apartment_viewset(viewsets.ViewSet):
    
    authentication_classes = [authentication.JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    parser_classes=(MultiPartParser,FormParser)

    def list(self,request,format=None):
        queryset = apartments.personal_apartments.get_seller_apartments(request.user)
        queryset = queryset.filter(removed=False)
        serializer = apartment_list_serializer(queryset,context={'request':request},many=True)
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def retrieve(self,request,pk=None,format=None):
        queryset = apartments.personal_apartments.get_seller_apartments(request.user)
        queryset = queryset.filter(removed=False)
        apartment = get_object_or_404(queryset,pk=pk)
        serializer = apartment_detail_serializer(apartment,context={'request':request})
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def create(self,request,format=None):
        try:
            if request.user.is_seller and request.user.profile_completed and request.user.address_completed and request.user.bank_completed:
                    
                    


                print(request.data)
                
                seller_price = int(request.data["seller_price"])
                price = seller_price + ((seller_price*int(request.data["owner_discount"]))/100)

                print(bool(request.data["wifi"]=='true'))

                queryset = seller_bank_details.objects.all()
                queryset = queryset.filter(user_id=request.user)
                bank = get_object_or_404(queryset,pk=request.user.pk)

                print(type(bank.currency))
                print(float(request.data["distance1"]))

                booked_till = datetime.date(2000,1,1)

                room = apartments(title=request.data["title"],seller_id=request.user,net_discount=int(request.data["owner_discount"]),bookedtill=booked_till,price=price,seller_price=seller_price,owner_discount=int(request.data["owner_discount"]),final_price=seller_price,BHK=int(request.data["BHK"]),photo1=request.data["photo1"],photo2=request.data["photo2"],photo3=request.data["photo3"],photo4=request.data["photo4"],photo5=request.data["photo5"],photo6=request.data["photo6"],video=request.data["video"],
                owner=request.user.first_name+' '+request.user.last_name,location=request.data["location"].upper(),city=request.data["city"].upper(),state=request.data["state"].upper(),country=request.data["country"].upper(),landmark=request.data["landmark"].upper(),pincode=request.data["pincode"],currency=bank.currency,longitude=float(request.data["longitude"]),latitude=float(request.data["latitude"]),length=int(request.data["length"]),breadth=int(request.data["breadth"]),height=int(request.data["height"]),furniture=request.data["furniture"],category=request.data["category"],
                facility=request.data["facility"],contact=request.data["contact"],description=request.data["description"],cctv_building=bool(request.data["cctv_building"]=='true'),building_guard=bool(request.data["building_guard"]=='true'),balcony=int(request.data["balcony"]),windows=int(request.data["windows"]),fans=int(request.data["fans"]),bed_type=request.data["bed_type"],floor_no=int(request.data["floor_no"]),
                cost_electricity=int(request.data["cost_electricity"]),cost_water=int(request.data["cost_water"]),purified_water=bool(request.data["purified_water"]=='true'),removable_purified_water=bool(request.data["removable_purified_water"]=='true'),cost_purified_water=int(request.data["cost_purified_water"]),TV=bool(request.data["TV"]=='true'),removable_house_TV=bool(request.data["removable_house_TV"]=='true'),
                cost_TV=int(request.data["cost_TV"]),house_refridgerator=bool(request.data["house_refridgerator"]=='true'),removable_house_refridgerator=bool(request.data["removable_house_refridgerator"]=='true'),cost_refridgerator=int(request.data["cost_refridgerator"]),district=request.data["district"].upper(),
                power_backup=bool(request.data["power_backup"]=='true'),geyser=bool(request.data["geyser"]=='true'),removable_geyser=bool(request.data["removable_geyser"]=='true'),cost_geyser=int(request.data["cost_geyser"]),
                wifi=bool(request.data["wifi"]=='true'),cost_wifi=int(request.data["cost_wifi"]),removable_wifi=bool(request.data["removable_wifi"]=='true'),AC=bool(request.data["AC"]=='true'),cost_AC=int(request.data["cost_AC"]),removable_AC=bool(request.data["removable_AC"]=='true'),cooler=bool(request.data["cooler"]=='true'),cost_cooler=int(request.data["cost_cooler"]),removable_cooler=bool(request.data["removable_cooler"]=='true'),laundry=bool(request.data["laundry"]=='true'),cost_laundry=int(request.data["cost_laundry"]),
                apartment_cleaning=bool(request.data["apartment_cleaning"]=='true'),removable_laundry=bool(request.data["removable_laundry"]=='true'),cost_cleaning=int(request.data["cost_cleaning"]),nearby_station1=request.data["nearby_station1"],nearby_station2=request.data["nearby_station2"],distance1=float(request.data["distance1"]),distance2=float(request.data["distance2"]),apartment_policy=request.data["apartment_policy"],
                address_proof=request.data["address_proof"],washroom=int(request.data["washroom"]),total_rooms=int(request.data["total_rooms"]),total_floors=int(request.data["total_floors"]),total_beds=int(request.data["total_beds"]),total_TV=int(request.data["total_TV"]),total_AC=int(request.data["total_AC"]),total_cooler=int(request.data["total_cooler"]),total_geyser=int(request.data["total_geyser"]),
                apartment_type=request.data["apartment_type"],sofa=bool(request.data["sofa"]=='true'),gender=request.data["gender"])

                room.save()

                return Response('success',status=status.HTTP_200_OK)
            else:
                return Response('error',status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)


    def update(self, request,pk=None,format=None):
        try:
        
            queryset = apartments.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)

            seller_price = int(request.data["seller_price"])
            our_price = seller_price + ((seller_price*room.commission)/100)
            price = our_price + ((our_price*(int(request.data["owner_discount"])+room.commission+room.company_discount+room.fake_discount))/100) 

            room.title=request.data["title"]  
            room.seller_price=seller_price  
            room.owner_discount=int(request.data["owner_discount"]) 
            room.net_discount=int(request.data["owner_discount"])+room.company_discount+room.fake_discount+room.commission
            room.price=price
            room.final_price=our_price
            room.price=price
            if(request.data["photo1"]!='undefined'):
                room.photo1=request.data["photo1"] 
            if(request.data["photo2"]!='undefined'):
                room.photo2=request.data["photo2"] 
            if(request.data["photo3"]!='undefined'):
                room.photo3=request.data["photo3"] 
            if(request.data["photo4"]!='undefined'):
                room.photo4=request.data["photo4"] 
            if(request.data["photo5"]!='undefined'):
                room.photo5=request.data["photo5"] 
            if(request.data["photo6"]!='undefined'):
                room.photo5=request.data["photo6"] 
            if(request.data["video"]!='undefined'):
                room.video=request.data["video"] 
            if(request.data["address_proof"]!='undefined'):
                room.address_proof=request.data["address_proof"] 
                        
            room.location=request.data["location"]                                
            room.longitude=float(request.data["longitude"])            
            room.latitude=float(request.data["latitude"])            
            room.length=int(request.data["length"])            
            room.breadth=int(request.data["breadth"])            
            room.height=int(request.data["height"])            
            room.furniture = request.data["furniture"]
            room.contact=request.data["contact"]
            room.description=request.data["description"]            
            room.cctv_building=bool(request.data["cctv_building"]=='true')           
            room.building_guard=bool(request.data["building_guard"]=='true')            
            room.balcony=int(request.data["balcony"])           
            room.gender=request.data["gender"] 
                       
            room.windows=int(request.data["windows"])            
            room.fans=int(request.data["fans"])            
            room.bed_type=request.data["bed_type"]            
            room.floor_no=int(request.data["floor_no"])            
            room.cost_electricity=int(request.data["cost_electricity"])            
            room.cost_water=int(request.data["cost_water"])            
            room.purified_water=bool(request.data["purified_water"]=='true')            
            room.removable_purified_water=bool(request.data["removable_purified_water"]=='true')            
            room.cost_purified_water=int(request.data["cost_purified_water"])            
            room.TV=bool(request.data["TV"]=='true')            
            room.removable_house_TV=bool(request.data["removable_house_TV"]=='true')            
            room.cost_TV=int(request.data["cost_TV"])            
                 
            room.house_refridgerator=bool(request.data["house_refridgerator"]=='true')            
            room.removable_house_refridgerator=bool(request.data["removable_house_refridgerator"]=='true')            
            room.cost_refridgerator=int(request.data["cost_refridgerator"])            
           
            room.power_backup=bool(request.data["power_backup"]=='true')            
            room.geyser=bool(request.data["geyser"]=='true')            
            room.removable_geyser=bool(request.data["removable_geyser"]=='true')            
            room.cost_geyser=int(request.data["cost_geyser"])            
            room.wifi=bool(request.data["wifi"]=='true')            
            room.cost_wifi=int(request.data["cost_wifi"])            
            room.removable_wifi=bool(request.data["removable_wifi"]=='true')            
            room.AC=bool(request.data["AC"]=='true')            
            room.cost_AC=int(request.data["cost_AC"])            
            room.removable_AC=bool(request.data["removable_AC"]=='true')            
            room.cooler=bool(request.data["cooler"]=='true')            
            room.cost_cooler=int(request.data["cost_cooler"])            
            room.removable_cooler=bool(request.data["removable_cooler"]=='true')            
            room.laundry=bool(request.data["laundry"]=='true')            
            room.cost_laundry=int(request.data["cost_laundry"])
            room.removable_laundry=bool(request.data["removable_laundry"]=='true')              
   
            room.apartment_cleaning=bool(request.data["apartment_cleaning"]=='true')            
            room.cost_cleaning=int(request.data["cost_cleaning"])            
            room.nearby_station1=request.data["nearby_station1"]           
            room.nearby_station2=request.data["nearby_station2"]            
            room.distance1=float(request.data["distance1"])            
            room.distance2=float(request.data["distance2"])            
            room.apartment_policy=request.data["apartment_policy"] 

            room.washroom=int(request.data["washroom"])       
            room.total_rooms=int(request.data["total_rooms"])       
            room.total_floors=int(request.data["total_floors"])       
            room.total_beds=int(request.data["total_beds"])       
            room.total_TV=int(request.data["total_TV"])       
            room.total_AC=int(request.data["total_AC"])       
            room.total_cooler=int(request.data["total_cooler"])       
            room.total_geyser=int(request.data["total_geyser"])       
            room.apartment_type=request.data["apartment_type"]       
            room.sofa=bool(request.data["sofa"]=='true')   

            room.location=request.data["location"].upper()    
            room.landmark=request.data["landmark"].upper()   
            room.pincode=request.data["pincode"]        

            room.save()

            print('success')



            return Response('success',status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    def destroy(self,request,pk=None):
        try:
            queryset = apartments.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)
            room.removed = True
            room.save()

            subject = 'Apartment Deleted'
            message = 'Your Apartment has been deleted'
            recepient = request.user
            send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

            return Response("Deleted",status=status.HTTP_200_OK)

        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)

    def partial_update(self,request,pk=None):
        try:
            print('hy')
            queryset = apartments.objects.all()
            queryset = queryset.filter(seller_id = request.user)
            room = get_object_or_404(queryset,pk=pk)

            if room.pausebooking==True:

                room.pausebooking = False
                room.save()
                subject = 'Booking resumed'
                message = 'Bookings on your apartment is resumed'
                recepient = request.user
                send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

                return Response("Success",status=status.HTTP_200_OK)

            if room.pausebooking==False:
        
                room.pausebooking = True
                room.save()
                subject = 'Booking paused'
                message = 'Bookings on your apartment is paused'
                recepient = request.user
                send_mail(subject,message, EMAIL_HOST_USER, [recepient], fail_silently=False)

                return Response("Success",status=status.HTTP_200_OK)
        except:
            return Response('error',status=status.HTTP_400_BAD_REQUEST)
    
class minmax_apartment_viewset(viewsets.ReadOnlyModelViewSet):
    queryset = minmax_apartment.objects.all()
    serializer_class = minmax_apartment_serializer
