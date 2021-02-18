
            room.washroom=int(request.data["washroom"])       
            room.total_rooms=int(request.data["total_rooms"])       
            room.total_floors=int(request.data["total_floors"])       
            room.total_beds=int(request.data["total_beds"])       
            room.total_TV=int(request.data["total_TV"])       
            room.total_AC=int(request.data["total_AC"])       
            room.total_cooler=int(request.data["total_cooler"])       
            room.total_geyser=int(request.data["total_geyser"])       
            room.apartment_type=request.data["apartment_type"]       
            room.sofa=bool(request.data["sofa"]=='true'
