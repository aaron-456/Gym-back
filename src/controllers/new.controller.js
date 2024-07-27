const db = require('../../database/models/index');
const NewsService = require('../services/news.service');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/cachAsync');
const jwt = require('jsonwebtoken');
const { uploadImage } = require('../utils/imageUploader');

const newsService = new NewsService();

exports.findAllNews = catchAsync(async (req, res, next) => {
  const { name } = req.query;
  const news = await newsService.findAllNews(name);

  return res.status(200).json({
    news: news,
    queryUnable: name ? true : false,
    query: name,
  });
});

{
  // exports.createNews = catchAsync(async (req, res, next) => {
  //   const { news_title, news_subtitle, categoryId, news_content } = req.body;
  //   const token = req.headers.authorization.split(' ').pop();
  //   // Verifica y decodifica el token para obtener el user_id
  //   const tokenData = jwt.verify(token, process.env.JWT_SECRET);
  //   const user_id = tokenData.id;
  //   const imageFile = req.file;
  //   let imageUrl = null;
  //   if (imageFile) {
  //     const uniqueName = `${Date.now()}-${imageFile.originalname}`;
  //     // Utiliza la instancia de cliente S3 importada desde aws.js
  //     const s3 = new S3Client.S3();
  //     const params = {
  //       Bucket: process.env.AWS_BUCKET_NAME,
  //       Key: uniqueName, // Define un nombre único para el archivo
  //       Body: imageFile.buffer, // Utiliza el buffer proporcionado por Multer
  //     };
  //     const result = await s3.upload(params).promise();
  //     imageUrl = result.Location;
  //   }
  //   const news = await newsService.createNews({
  //     news_title,
  //     news_subtitle,
  //     user_id,
  //     news_content,
  //     img_url: imageUrl,
  //   });
  //   const newId = news.id;
  //   try {
  //     await db.relation_news_categorynews.create({
  //       //Se crea las relaciones en la tabla pibote
  //       news_id: newId,
  //       category_news_id: categoryId,
  //     });
  //   } catch (error) {
  //     return res.status(404).json({
  //       message: 'The news category does not exist',
  //     });
  //   }
  //   return res.status(201).json({
  //     news,
  //     categoryId,
  //   });
  // });
}

exports.createNews = [
  catchAsync(async (req, res, next) => {
    const { news_title, news_subtitle, categoryId, news_content } = req.body;

    const token = req.headers.authorization.split(' ').pop();

    // Verifica y decodifica el token para obtener el user_id
    const tokenData = jwt.verify(token, process.env.JWT_SECRET);
    const user_id = tokenData.id;

    if (!req.files.img_url) {
      return res.status(404).json({
        message: 'Please upload at least one image',
      });
    }

    const imageUrl = req.files.img_url
      ? await uploadImage(req.files.img_url[0], 'imagesNews')
      : null;

    const news = await newsService.createNews({
      news_title,
      news_subtitle,
      user_id,
      news_content,
      img_url: imageUrl,
    });

    const newId = news.id;

    try {
      await db.relation_news_categorynews.create({
        //Se agrega la relacion de news  con category en la tabla pibote
        news_id: newId,
        category_news_id: categoryId,
      });
    } catch (error) {
      return res.status(404).json({
        message: 'The news category does not exist',
      });
    }

    return res.status(201).json({
      news,
      categoryId,
    });
  }),
];

exports.findOneNews = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const news = await newsService.findOneNews(id);

  if (!news) {
    return next(new AppError('new not fount', 404));
  }
  return res.status(200).json({
    news,
  });
});

exports.updateNews = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { news_title, category_id, news_content, news_subtitle } = req.body;

  const news_ = await newsService.findOneNews(id);



  let newExtrainfo = null;

  if (req.files && req.files.img_url) {
    newExtrainfo = await uploadImage(req.files.img_url[0], 'imagesNews');
  }

  let updateInfoData

  if (newExtrainfo === null) {
    updateInfoData = {
      news_title,
      news_subtitle,
      category_id,
      news_content,
    };
  } else {
    updateInfoData = {
        news_title,
        news_subtitle,
        category_id,
        news_content,
        img_url: newExtrainfo,
    };
  }

  const newsUpdated = await newsService.updateNews(news_, updateInfoData);

  return res.status(200).json({
    newsUpdated,
  });
});

exports.deleteNews = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;

    const news = await newsService.findOneNews(+id);

    if (!news) {
      return res.status(404).json({
        message: 'The news not found!',
      });
    }

    await newsService.deleteNews(id);

    return res.status(200).json({
      message: 'The news and its related extra info have been deleted!',
    });
  } catch (error) {
    next(error);
  }
});

exports.publishNew = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const new_ = await newsService.findOneNews(id);

  if (!new_) {
    return res.status(404).json({
      message: 'The news not found!',
    });
  }

  await newsService.publishNew(new_);

  return res.status(200).json({
    message: 'Your news has been published!',
  });
});
