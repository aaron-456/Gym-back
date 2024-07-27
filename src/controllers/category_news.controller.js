const Category_newsServices = require('../services/category_news.service');
const catchAsync = require('../utils/cachAsync');

const category_newsServices = new Category_newsServices();

exports.findAllCategory_news = catchAsync(async (req, res, next) => {
  const category_news = await category_newsServices.findAllCategory_news();

  return res.status(200).json({
    category_news: category_news,
  });
});

exports.createCategory_news = catchAsync(async (req, res, next) => {
  const { name } = req.body;

  const existingCategory = await category_newsServices.getCategoryforName(name);

  if (existingCategory) {
    return res.status(400).json({
      message: 'The category already exists',
    });
  }

  const category_new = await category_newsServices.createCategory_news({ name });

  const categoryId = category_new.id;

  return res.status(201).json({
    category_new,
  });
});

exports.findOneCategory_news = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const category_new = await category_newsServices.findOneCategory_new(id);

  return res.status(200).json({
    category_new,
  });
});

exports.updateCategory_news = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;

  const category_new = await category_newsServices.findOneCategory_new(id);

  const category_newUpdated = await category_newsServices.updateCategory_news(
    category_new,
    {
      name,
    }
  );

  return res.status(200).json({
    category_newUpdated,
  });
});

exports.deleteCategory_news = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const category_new = await category_newsServices.findOneCategory_new(+id);

    if (!category_new) {
      return res.status(200).json({
        message: 'The category_news not found!',
      });
    }
    await category_newsServices.deleteCategory_news(category_new);

    return res.status(200).json({
      message: 'The category_news has been deleted!',
    });
  } catch (error) {
    next(error);
  }
});
