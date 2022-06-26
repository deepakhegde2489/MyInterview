from django.db import models
from django.contrib.auth.models import (
        AbstractBaseUser, BaseUserManager, PermissionsMixin)

class UserManager(BaseUserManager):
    def create_user(self, email, password=None,address=None,is_admin=None):
        if not email:
            raise ValueError('Users must have an email address')
        user = self.model(
            user=self.normalize_email(email),
            address = address,
            is_admin =is_admin
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_student(self, email, password,address=None,is_admin = None):
        user = self.create_user(
            email,
            password=password,
            address = address,
            is_admin = is_admin
        )
        user.save(using=self._db)
        return user

class MyUser(AbstractBaseUser, PermissionsMixin):

    user = models.EmailField(max_length=254, unique=True)
    address = models.CharField(max_length=254)
    is_admin = models.BooleanField()

    objects = UserManager()

    USERNAME_FIELD = 'user'

