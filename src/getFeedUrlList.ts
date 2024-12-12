import { Client, isFullPage } from "https://deno.land/x/notion_sdk/src/mod.ts";

export const getFeedUrlList = async () => {
  const notion = new Client({ auth: Deno.env.get("NOTION_KEY") });
  const databaseId = Deno.env.get("NOTION_FEEDER_DATABASE_ID") || "";

  const response = await notion.databases.query({
    database_id: databaseId,
  });

  return response.results.flatMap((result) => {
    if (!isFullPage(result)) return [];
    if (result.properties.Link.type !== 'url') throw new Error('Link property is not a URL');
    return result.properties.Link.url || [];
  });
};
