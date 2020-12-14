const AWS = require('aws-sdk');
const { uuid } = require('uuid');

const ARTICLES_TABLE = 'articles';
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const create = async ({ article }) => {
  const articleId = uuid();

  const newArticle = {
    articleId,
    ...article,
  }

  const params = {
    TableName: ARTICLES_TABLE,
    Item: newArticle
  }

  await dynamoDB.put(params).promise();

  return newArticle;
};

const get = async ({ articleId }) => {

  const params = {
    TableName: ARTICLES_TABLE,
    Key: {
      articleId
    }
  }

  const response = await dynamoDB.get(params).promise();

  return response.Item;
};

module.exports = {
  create,
  get
}