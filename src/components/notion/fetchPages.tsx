import React from "react";
import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  PageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export const sortPostsByPublishedDate = <T extends { properties?: { Date?: { date?: { start?: string } } } }>(posts: T[]): T[] => {
  return posts.slice().sort((a, b) =>
    String(b?.properties?.Date?.date?.start || "").localeCompare(
      String(a?.properties?.Date?.date?.start || "")
    )
  );
};

export const fetchPages = async () => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_DATABASE_ID!,
    filter: {
      property: "Status",
      status: {
        equals: "Live",
      },
    },
  });

  return {
    ...response,
    results: sortPostsByPublishedDate(response.results.filter((result) => result.object === "page") as PageObjectResponse[]),
  };
};

export const fetchBySlug = async (slug: string) => {
  return await notion.databases
    .query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Slug",
        rich_text: {
          equals: slug,
        },
      },
    })
    .then((res) => res.results[0] as PageObjectResponse | undefined)
    .catch((err) => {
      console.log(err);
      return undefined;
    });
};

export const fetchPageBlocks = async (pageId: string) => {
  return await notion.blocks.children
    .list({
      block_id: pageId,
    })
    .then((res) => res.results as BlockObjectResponse[])
    .catch((err) => {
      console.log(err);
      return undefined;
    });
};
