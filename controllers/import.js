const Product = require('../models/Product');
const Category = require('../models/Category');
const Shop = require('../models/Shop');
const Position = require('../models/Position');
const mongoose = require('mongoose');

/**
 * DELETE ALL PRODUCTS AND POSITIONS
 */
exports.deleteAllProductsAndPositions = async (req, res) => {
  try {
    Product.collection.drop();
    Position.collection.drop();
    return res
      .status(200)
      .json({ message: 'All products and collections removed' });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

/**
 * SAVE IMPORTED DATA TO SERVER
 */
exports.publish = async (req, res) => {
  // !!!!!!!!!! Везде TRY CATCH !!!!!!!!!!!!!!!
  const importedProducts = req.body.data;
  const appShops = await Shop.find();

  // const currentProduct = { ...req.body.data[0].product };
  // await AddCategoryToProduct(categories, currentProduct);

  // Вывод результата
  // return res.status(200).json({
  //   appShops,
  // });

  try {
    for (const item of importedProducts) {
      const currentProduct = item.product;
      await AddCategoryToProduct(currentProduct);
      const newProduct = new Product({
        ...currentProduct,
        _id: new mongoose.Types.ObjectId(),
      });
      const createdProduct = await newProduct.save();

      // =============================
      // ===== CREATE POSITIONS ======
      // =============================
      const currentShops = item.shops;
      if (currentShops && Object.keys(currentShops).length) {
        for (const shop of appShops) {
          const { key } = shop;
          if (key) {
            const currentPosition = currentShops[key];
            if (currentPosition) {
              const newPosition = new Position({
                productId: createdProduct._id,
                shopId: shop._id,
                article: currentPosition[key + 'Art'],
                price: currentPosition[key + 'Price'],
                link: currentPosition[key + 'Link'],
                _id: new mongoose.Types.ObjectId(),
              });
              await newPosition.save();
            }
          }
        }
      }
      // =============================
      // =============================
    }
  } catch (err) {
    return res.status(500).json({ error: err });
  }

  // Вывод результата
  // return res.status(200).json({
  //   importedProducts,
  // });

  // !!!! Проверять на обязательные поля - если нет, то не сохранять этот товар! - в ответе вернуть массив
  // товаров которые не соответствуют требованиям
  // 1) name !!!!
  // 2) category

  // !!!!! В ТАБЛИЦЕ НА ФРОНТЕ подсвечивать ячейки где ошибка !!!!
  // и Вывести сообщение что такие то товары не подходят

  /**
   * В цикле проходим весь массив
   * 1. если нет категории в базе - сохраняем категорию
   * 2. Схраняем продукт и получаем его айди
   * 3. Сохраняем ассортимент в магазины
   */

  // res
  //   .status(201)
  //   .json({ message: 'Product created', id: created._id });

  return res
    .status(201)
    .json({ message: 'Table imported successfully!' });
};

/**
 * Add category ID to the new product
 */
async function AddCategoryToProduct(product) {
  if (!product.category) return;
  const categories = await Category.find();
  const { category: currentProductCategoryName } = product;

  const foundCategory = categories.find(itemCategory => {
    return (
      itemCategory.name.toLowerCase() ===
      currentProductCategoryName.toLowerCase()
    );
  });

  product.category = foundCategory
    ? foundCategory._id
    : await createNewCategory(currentProductCategoryName);
}

/**
 * Create a new category
 */
async function createNewCategory(name) {
  // TRY CATCH ????
  const newCategory = new Category({
    name: name,
    comments: 'Создана автоматически',
    _id: new mongoose.Types.ObjectId(),
  });
  return await newCategory.save();
}
