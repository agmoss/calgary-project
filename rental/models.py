from django.db import models

class RentalData(models.Model):
    ref_id = models.CharField(primary_key=True, max_length=255)
    userid = models.IntegerField(db_column='userId', blank=True, null=True)  # Field name made lowercase.
    _id = models.IntegerField(db_column = 'id',blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    price = models.FloatField(blank=True, null=True)
    _type = models.CharField(db_column = 'type',max_length=255, blank=True, null=True)
    sq_feet = models.DecimalField(max_digits=10, decimal_places=0, blank=True, null=True)
    availability = models.CharField(max_length=255, blank=True, null=True)
    avdate = models.CharField(max_length=255, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    rented = models.CharField(max_length=255, blank=True, null=True)
    thumb = models.CharField(max_length=255, blank=True, null=True)
    thumb2 = models.CharField(max_length=255, blank=True, null=True)
    slide = models.CharField(max_length=255, blank=True, null=True)
    link = models.CharField(max_length=255, blank=True, null=True)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    marker = models.CharField(max_length=255, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    address_hidden = models.IntegerField(blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    province = models.CharField(max_length=255, blank=True, null=True)
    intro = models.CharField(max_length=255, blank=True, null=True)
    community = models.CharField(max_length=255, blank=True, null=True)
    quadrant = models.CharField(max_length=255, blank=True, null=True)
    phone = models.CharField(max_length=255, blank=True, null=True)
    phone_2 = models.CharField(max_length=255, blank=True, null=True)
    preferred_contact = models.CharField(max_length=255, blank=True, null=True)
    website = models.CharField(max_length=255, blank=True, null=True)
    email = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)
    bedrooms = models.IntegerField(blank=True, null=True)
    den = models.CharField(max_length=255, blank=True, null=True)
    baths = models.IntegerField(blank=True, null=True)
    cats = models.IntegerField(blank=True, null=True)
    dogs = models.IntegerField(blank=True, null=True)
    utilities_included = models.CharField(max_length=255, blank=True, null=True)
    position = models.CharField(max_length=255)
    retrieval_date = models.CharField(max_length=255)

    def __str__(self):
        return self.ref_id

    class Meta:
        managed = False
        db_table = 'rental_data'