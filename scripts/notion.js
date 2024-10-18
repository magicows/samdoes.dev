// @ts-check

const NotionParse = require('@kodaps/notion-parse');
const dotenv = require('dotenv');

dotenv.config();

const go = async () => {

  if (process.env.NOTION_API_KEY) {
    await NotionParse.parseNotion(process.env.NOTION_API_KEY, './src/content', [
      {
        databaseId: process.env.NOTION_DATABASE_ID || '',
        contentType: 'Portfolio'
      },
    ])
  }

};

go().then(() => {
  console.log('Done');
});