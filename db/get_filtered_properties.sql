select *
from properties
where property_owner_fk = ${account_id} and property_desired_rent > ${rentFilter}