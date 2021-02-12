try:

                if request.user not in coupon.used_by.all() and datetime.date.today()<=coupon.expiry_date and datetime.date.today()>=coupon.valid_from and room in coupon.coupoun_rooms.all():
                    
                    if price>=coupon.min_price:

                        if coupon.coupon_type=='discount':
                            temp = (price*coupon.off)/100

                            if coupon.max_off_price!=None:
                                if temp>coupon.max_off_price:
                                    temp=coupon.max_off_price
                            
                            price = price - temp;

                            savings = savings+temp
                            discount = discount+coupon.off

                        if coupon.coupon_type=='off_price':
                        
                            price = price - coupon.off;

                            savings = savings+coupon.off

                        return Response({price:price,savings:savings,discount:discount},status=status.HTTP_200_OK)

    
            except:
                return Response('Coupon not applicable',status=status.HTTP_400_BAD_REQUEST)

            

            
        except:
            return Response('Error',status=status.HTTP_400_BAD_REQUEST) 