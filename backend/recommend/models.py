from django.db import models

# Create your models here.


class Amazon(models.Model):
    # 상품 가격, asin, title, 키워드, 카테고리, (관련 상품)
    asin = models.CharField(max_length=100)
    price = models.CharField(max_length=100)
    keyword = models.CharField(max_length=100)
    category = models.CharField(max_length=100)

    def __str__(self):
        return self.keyword
