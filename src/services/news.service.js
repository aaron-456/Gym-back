const db = require('../../database/models/index');
const AppError = require('../utils/appError');
const { Op } = require('sequelize');

class NewsServices {
  async createNews(data) {
    const news_ = await db.news.create(data);
    return news_;
  }

  async findAllNews(query) {
    try {
      const newsWithCategories = await db.news.findAll({
        include: [
          {
            model: db.category_news,
            through: { attributes: [] },
          },
          {
            model: db.extraInfo,
            attributes: ['id', 'extra_title', 'extra_content', 'img_url'],
            // Utilizar subconsulta para filtrar las extraInfo por estado activo
            where: { status: 'active' },
            required: false, // Utilizar LEFT JOIN en lugar de INNER JOIN
          },
        ],
        where: {
          [Op.and]: [
            { status: 'active' },
            {
              [Op.or]: [{ news_title: { [Op.iLike]: `%${query}%` } }],
            },
          ],
        },
        order: [
          ['news_title', 'DESC'],
          ['news_subtitle', 'DESC'],
          ['news_content', 'DESC'],
          ['createdAt', 'DESC'],
        ],
      });

      if (!query) {
        newsWithCategories.queryUnable = 'false';
      }

      return newsWithCategories;
    } catch (error) {
      console.error('Error while fetching news:', error);
      throw error;
    }
  }

  async findOneNews(news_Id) {
    const news_ = await db.news.findOne({
      where: {
        status: 'active',
        id: news_Id,
      },
      include: [
        {
          model: db.category_news,
          through: {
            attributes: [],
          },
        },
        {
          model: db.users,
          attributes: ['name'],
        },
        {
          model: db.extraInfo,
          attributes: ['id', 'extra_title', 'extra_content', 'img_url'],
          where: { status: 'active' },
          required: false,
        },
      ],
    });

    return news_;
  }

  async updateNews(news_, newData) {
    return await news_.update(newData);
  }

  async deleteRelatedExtraNews(news_Id) {
    const extraNews = await db.extraInfo.findAll({
      where: {
        status: 'active',
        new_id: news_Id,
      },
    });

    await Promise.all(
      extraNews.map(async (extra) => {
        return await extra.update({
          status: 'disable',
        });
      })
    );
  }

  async deleteNews(news_Id) {
    const news_ = await this.findOneNews(news_Id);

    if (!news_) throw new AppError('The new was not found', 404);

    // Delete associated extraInfo records
    await this.deleteRelatedExtraNews(news_Id);

    // Disable the main news article
    return await news_.update({
      status: 'disable',
    });
  }

  async publishNew(new_) {
    return await new_.update(
      { published: true, publish_date: new Date() }, // Set publish_date to the current timestamp
      { where: { id: new_.id } }
    );
  }
}

module.exports = NewsServices;
