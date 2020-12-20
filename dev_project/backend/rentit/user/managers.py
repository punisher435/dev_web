from django.db import models

class profile_queryset(models.QuerySet):
    def get_user_profile(self,email):
        return self.filter(user_id=email)



class profile_manager(models.Manager):
    def get_queryset(self):
        return profile_queryset(self.model,using=self._db)
    
    def get_user_profile(self,email):
        return self.get_queryset().get_user_profile(email)