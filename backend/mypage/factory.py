import factory
from accounts.models import User
from recommend.models import Item
from .models import OrderDetail


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    username = factory.Faker('name')
    email = factory.Faker('email')
    password = factory.Faker('password')
    address = factory.Faker('address')
    postal_code = factory.Faker('zipcode')


class ItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Item

    asin = factory.Faker('zipcode')
    title = factory.Faker('name')
    price = factory.Faker('pydecimal', positive=True)
    is_women = factory.Faker('pybool')
    category = 'etc'


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OrderDetail

    total_price = factory.Faker('pydecimal', positive=True)
    first_name = factory.Faker('first_name')
    last_name = factory.Faker('last_name')
    email = factory.Faker('email')
    address = factory.Faker('address')
    postal_code = factory.Faker('zipcode')
