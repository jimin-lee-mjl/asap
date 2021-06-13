import random
from faker import Faker
from faker.providers import BaseProvider

fake = Faker()

# Custom provider inherits from the BaseProvider
class CategoryProvider(BaseProvider):
    def classify(self):
        categories = ['top', 'bottom', 'outer', 'set', 'sport', 'etc', 'shoes', 'bag', 'accessories']
        # We select a random category from the list and return it
        return random.choice(categories)

# Add the CategoryProvider to our faker object
fake.add_provider(CategoryProvider)

# 호출 시 fake.classify() 
