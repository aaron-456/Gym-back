const db = require('../../database/models/index');
const catchAsync = require('../utils/cachAsync');

exports.findAllCarousel = catchAsync(async (req, res, next) => {
  const carousel = await db.carousel.findAll({
    include: [
      {
        model: db.news,
        include: [{ model: db.category_news, attributes: ['name'] }],
      },
    ],
  });
  return res.status(200).json({
    carousel,
  });
});

exports.createCarousel = catchAsync(async (req, res, next) => {
  const { new_id } = req.body;

  const new_ = await db.news.findByPk(new_id);

  if (!new_) {
    return res.status(404).json({
      message: 'He news does not exist, please enter a valid news',
    });
  }

  const addcarousel = await db.carousel.create({ new_id: new_id });

  return res.status(201).json({
    message: 'The news was added to the carousel successfully!!',
    addcarousel,
  });
});

exports.deleteAccordionFindOne = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const newInCarousel = await db.carousel.findByPk(id);

  if (!newInCarousel) {
    return res.status(404).json({
      message: 'This news is not added to this carousel',
    });
  }

  const deleteCarruselId = await db.carousel.destroy({
    where: {
      id: id,
    },
  });

  return res.status(200).json({
    message: 'News added to the carousel has been successfully deleted',
  });
});
