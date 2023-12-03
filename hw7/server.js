const express = require('express');
const app = express();
const { PrismaClient } = require('./prisma/generated/client');
const prisma = new PrismaClient();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
  });


//Presentational layer


app.get('/customers/:customerId/orders', async (req, res) => {
  const customerId = Number(req.params.customerId);
    let orders = await getCustomerOrders(customerId);
    
    if(orders === null){
      res.status(404).json({ error: 'Customer with such id not found' });
    }else{
      let totalCost = await getTotalCost(orders);
      let response = {
        orders: orders.map(order => ({
          id: order.id,
          customerId: order.customerId,
          employeeId: order.employeeId,
          address: order.orderAddress,
          deliveryCost: order.deliveryCost,
          orderDate: order.orderDate,
          totalCost: order.totalCost,
        })),
        totalCost: totalCost,
      };
    
      res.status(200).json(response);
    }
})

app.patch('/employees/:employeeId', async (req, res) => {
  let employeeId = Number(req.params.employeeId);
  let updatedEmployee = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      middleName: req.body.middleName,
      position: req.body.position
  }
  let result = await updateInstance('Employee', employeeId, updatedEmployee);
  if(result == null){
    res.status(404).json({ error: 'Employee with such id not found' });
  }else{
    res.status(200).json(result);
  }
})

app.delete('/orders/:orderId', async (req, res) => {
  let orderId = Number(req.params.orderId);
  let deletedOrder = await deleteOrder(orderId);
  if(deletedOrder === null){
    res.status(404).json({ error: 'Order with such id not found' });
  }else{
    res.status(200).json(deletedOrder);
  }
})

app.post('/products', async (req, res) => {
  let newProduct = {
    "name": req.body.name,
    "category": req.body.category,
    "amount": Number(req.body.amount),
    "price": Number(req.body.price)
  };
  let createdProduct = await createProduct(newProduct);
  if(createdProduct === null){
    res.status(403).json({ error: 'Invalid category' });
  }else{
    res.status(200).json(createdProduct);
  }
})











//Business logic layer


async function getTotalCost(orders){
    let sum = 0;
    if(orders.length < 1){
      console.log(`Length:${orders.length}`);
      return sum;
    }
    for(let order of orders){
      let orderId = order.id;
      let orderPrice = await getOrderPrice(orderId);
      order.totalCost = orderPrice;
      sum = sum + orderPrice;
    }
    return sum;
}

async function getOrderPrice(orderId){
  let sum = 0;
  let delivery = Number(await getAttributeById("order", orderId, "deliveryCost"));
  let orderProducts = await getOrderProducts(orderId);
  for(let orderProduct of orderProducts){
    let orderProductId = orderProduct.id;
    let productId = orderProduct.productId;
    let orderProductPrice = await getAttributeById("orderProduct", orderProductId, "amount") * await getAttributeById("product", productId, "price");
    sum = sum + orderProductPrice;
  }
  return sum + delivery;
}


async function deleteOrder(orderId){
  let exists = await CheckIfExists("Order", orderId);
  if(exists){
    await deleteManyByQuery("OrderProduct", {orderId: orderId});
    let deletedOrder = await deleteById("Order", orderId);
    return deletedOrder;
  } else {
    return null;
  }
}


async function createProduct(obj) {
  let categoryId = await FindByName('category', obj.category);

  if (typeof categoryId === 'number') {
    // Check if the category exists
    let existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
      },
    });

    if (!existingCategory) {
      return null; // Category does not exist
    }

    obj.category = { connect: { id: categoryId } };
    let createdInstance = await createInstance('Product', obj);
    return createdInstance;
  } else {
    return null; // Invalid category
  }
}



// Data layer

async function getCustomerOrders(custId){
  try {
    let orders = await prisma.order.findMany({
      where: {
        customerId: custId,
      },
    });
    
    if(orders.length === 0){
      let customer = await prisma.customer.findUnique({
        where: {
          id: custId,
        },
      });
      if(customer === null){
        return null;
      }
    }
    return orders;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
};

async function getOrderProducts(orderId){
  try {
    let orderProducts = await prisma.orderProduct.findMany({
      where: {
        orderId: orderId,
      },
    });
    return orderProducts;
  } catch (error) {
    console.error('Error fetching orders:', error);
    return null;
  }
};


async function getAttributeById(model, id, attribute) {
  try {
    
    if (id != undefined) {
      let instance = await prisma[model].findUnique({
        where: {
          id: id,
        },
      });
      
      if (instance === null) {
        console.log(`No ${model} found with id ${id}`);
        return null;
      }
      
      return instance[attribute];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching ${model}:`, error);
    return null;
  }
}

async function updateInstance(model, id, updatedInstance){
  try {
    let updatedOrder = await prisma[model].update({
      where: {
        id: id
      },
      data: {
        firstName: updatedInstance.firstName,
        lastName: updatedInstance.lastName,
        middleName: updatedInstance.middleName,
        position: updatedInstance.position
      }
    });
    return updatedOrder;
  } catch (error) {
    console.error('Error updating order:', error);
    return null;
  }
}



async function deleteById(model, id){
  try {
    let deletedInstance = await prisma[model].delete({
      where: {
        id: id,
      },
    })
    return deletedInstance;
  } catch (error) {
    console.error('Error deleting:', error);
    return null;
  }
}

async function deleteManyByQuery(model, query){
  await prisma[model].deleteMany({
    where: query,
  })
}

async function CheckIfExists(model, id){
  try{
    let instance = await prisma[model].findUnique({
      where: {
        id: id,
      },
    });
    if(instance === null){
      return false;
    }
    return true;
  }catch (error) {
    console.error('Error deleting:', error);
    return false;
  }
}

async function FindByName(model, name){
  try{
    let instance = await prisma[model].findFirst({
      where: {
        name: name,
      },
    });
    if(instance === null){
      return false;
    }
    console.log(instance);
    return instance.id;
  }catch (error) {
    console.error('Error deleting:', error);
    return false;
  }
}

async function createInstance(model, instance) {
  try {
    console.log(instance);
    let newInstance = await prisma[model].create({
      data: instance,
    });
    return newInstance;
  } catch (error) {
    console.error('Error creating instance:', error);
    return null;
  }
}
