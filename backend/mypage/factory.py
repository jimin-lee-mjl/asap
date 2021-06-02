import factory
from accounts.models import User
from recommend.models import Item, Keyword
from .models import OrderDetail


class UserFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = User

    email = 'testuser@test.com'
    password = 'hello123'
    address = 'Tamatea, Napier, NZ'
    postal_code = '04256'


class ItemFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Item

    asin = '1039746'
    title = 'blue cap'
    price = 10.00
    is_women = True
    category = 'top'


class OrderFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = OrderDetail

    total_price = 50.00
    first_name = 'Joe'
    last_name = 'Gordon'
    email = 'test@test.cpm'
    address = 'Napier, NZ'
    postal_code = '08665'
