# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#

### Create Suppliers ###

suppliers = []
10.times do |i|
  suppliers << Supplier.create(name: "Supplier #{i}")
end

### Create Components ###

components = []
15.times do |i|
  components << Component.create(name: "Component #{i}", price: i, supplier: suppliers.sample)
end

### Create Products ###

products = Product.create([
  {name: 'First Product',  price: 100},
  {name: 'Second Product', price: 200},
  {name: 'Third Product',  price: 300}
])

### Create Edges ###
c1 = components[0]
c2 = components[1]
c3 = components[2]

p1 = products[0]
p2 = products[1]
p3 = products[2]

ComponentToComponent.create([
  {component: p1.root_component, subcomponent: c1, product_id: p1.id},
  {component: p1.root_component, subcomponent: c2, product_id: p1.id},
  {component: p1.root_component, subcomponent: c3, product_id: p1.id}
])

ComponentToComponent.create([
  {component: p2.root_component, subcomponent: components[5], product_id: p2.id},
  {component: p2.root_component, subcomponent: components[6], product_id: p2.id},
  {component: components[5],     subcomponent: c3, product_id: p2.id}
])

ComponentToComponent.create([
  {component: p3.root_component, subcomponent: components[7], product_id: p3.id},
  {component: p3.root_component, subcomponent: components[8], product_id: p3.id},
  {component: p3.root_component, subcomponent: components[11], product_id: p3.id},
  {component: p3.root_component, subcomponent: components[12], product_id: p3.id},
  {component: components[7],     subcomponent: components[9], product_id: p3.id},
  {component: components[9],     subcomponent: components[10], product_id: p3.id},
  {component: components[11],    subcomponent: components[9], product_id: p3.id}
])


