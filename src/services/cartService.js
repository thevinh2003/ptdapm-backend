import db from "../models/index.js";

const cartService = {
  getAllCart: () => {
    return new Promise((resolve, reject) => {
      db.ShoppingCart.findAll({
        include: [
          {
            model: db.Product,
            attributes: [
              "id",
              "ProductName",
              "Description",
              "Price",
              "PhotoLink",
            ],
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getCartByUser: (userId) => {
    return new Promise((resolve, reject) => {
      // db.ShoppingCart.findOne({
      //   include: [
      //     {
      //       model: db.Product,
      //       through: { 
      //         model: db.CartDetail,  
      //         attributes: ['id', 'Size', 'createdAt', 'Quantity', 'Color'],
      //         order: [['id', 'DESC']]
      //       },
      //       attributes: [
      //         "id",
      //         "ProductName",
      //         "Description",
      //         "Price",
      //         "PhotoLink",
      //       ],
      //     },
      //   ],
      //   where: {
      //     UserID: userId,
      //   },
      // })
      
      db.CartDetail.findAll({
        attributes: ['id', 'ProductID', 'Size', 'Color', 'Quantity', 'createdAt', 'updatedAt'],
        include: [
          {
            model: db.ShoppingCart,
            attributes: ['id'],
            where: {
              UserID: userId
            },
          },
          {
            model: db.Product,
          }
        ],
        order: [['id', 'DESC']]
      })
      .then(resolve)
      .catch(reject);
    });
  },

  getCartProductByUser: (userId, data) => {
    return new Promise((resolve, reject) => {
      db.ShoppingCart.findOne({
        include: [
          {
            model: db.Product,
            where: {
              id: {
                [db.Sequelize.Op.in]: data,
              },
            },
            attributes: [
              "id",
              "ProductName",
              "Description",
              "Price",
              "PhotoLink",
            ],
          },
        ],
        where: {
          UserID: userId,
        },
      })
        .then(resolve)
        .catch(reject);
    });
  },

  addCart: ({ userId }) => {
    return new Promise(async (resolve, reject) => {
      db.ShoppingCart.create({ UserID: userId })
      .then(resolve)
      .catch(reject)
    })
  },
  addCartDetail: ({cartId, ProductID, Size, Quantity, Color}) => {
    return new Promise(async (resolve, reject) => {
      db.CartDetail.create({
        CartID: cartId,
        ProductID: +ProductID,
        Size,
        Quantity,
        Color,
      })
        .then(resolve)
        .catch(reject);
    })
  },
  removeCartDetail: ({ cartDetailId }) => {
    return new Promise((resolve, reject) => {
      db.CartDetail.destroy({
        where: { id: +cartDetailId },
      })
      .then(resolve)
      .catch(reject);
    });
  },
  removeAllCart: (data) => {
    return new Promise((resolve, reject) => {
      db.CartDetail.destroy({
        where: {
          id: data,
        },
      })
      .then(resolve)
      .catch(reject);
    });
  },
  incrementProduct: ({ cartDetailId }) => {
    return new Promise((resolve, reject) => {
      db.CartDetail.update(
        { Quantity: db.Sequelize.literal('"Quantity" + 1') },
        { where: { id: +cartDetailId } }
      )
        .then(resolve(true))
        .catch(reject(false));
    });
  },
  decrementProduct: ({ cartDetailId }) => {
    return new Promise((resolve, reject) => {
      db.CartDetail.update(
        { Quantity: db.Sequelize.literal('"Quantity" - 1') },
        { where: { id: +cartDetailId } }
      )
        .then(resolve(true))
        .catch(reject(false));
    });
  },
  getCartById: () => {
    return new Promise((resolve, reject) => {
      db.ShoppingCart.findAll({
        include: [
          {
            model: db.Product,
            attributes: [
              "id",
              "ProductName",
              "Description",
              "Price",
              "PhotoLink",
            ],
          },
        ],
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getCartByUserId: (id) => {
    return new Promise((resolve, reject) => {
      db.ShoppingCart.findOne({
        where: { UserID: id},
        raw: true
      })
        .then(resolve)
        .catch(reject);
    });
  },
  getCartDetail: (id) => {
    return new Promise((resolve, reject) => {
      db.CartDetail.findOne({
        where: { id },
        include: {
          model: db.Product,
          attributes: ['StockQuantity']
        },  
        nest: true,
        raw: true
      })
        .then(resolve)
        .catch(reject);
    });
  },
  checkCartDetail: ({ProductID, Size, id}) => {
    return new Promise((resolve, reject) => {
      db.CartDetail.findOne({
        attributes: ['id'],
        where: { 
          ProductID,
          Size
        },
        include: [
          {
            model: db.ShoppingCart,
            where: {
              UserID: id
            },
          }
        ],
        raw: true
      })
        .then(resolve)
        .catch(reject);
    });
  },
};

export default cartService;
