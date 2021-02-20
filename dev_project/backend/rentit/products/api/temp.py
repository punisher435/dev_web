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



            return Response('success', status=status.HTTP_201_CREATED)
        except:
            return Response('error', status=status.HTTP_400_BAD_REQUEST)