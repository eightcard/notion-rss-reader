import { Client } from "https://deno.land/x/notion_sdk@v2.2.3/src/mod.ts";
import { FeedEntry } from "https://deno.land/x/rss@1.1.1/mod.ts";

export const addFeedItems = async (
  feedEntries: FeedEntry[],
) => {
  const notion = new Client({ auth: Deno.env.get("NOTION_KEY") });
  const databaseId = Deno.env.get("NOTION_READER_DATABASE_ID") || "";

  for (const item of feedEntries) {
    const { title, links, updated } = item;

    if (!title || title.value === undefined || !links || links.length == 0 || links[0].href === undefined || updated === undefined) {
      console.warn(`Skipping item with missing required fields: ${JSON.stringify(item, null, 2)}`);
      continue
    }

    const properties= {
      "Title": {
        type: "title" as const,
        title: [
          {
            type: "text" as const,
            text: {
              content: title.value,
            },
          },
        ],
      },
      "URL": {
        url: links[0].href,
      },
      "CreatedAt": {
        type: 'rich_text' as const,
        rich_text: [
          {
            type: 'text' as const,
            text: {
              content: updated.toISOString(),
            },
          },
        ],
      },
    };

    console.log(title.value);
    const retries = 4;
    const delay = 1000;
    for (let i = 0; i <= retries; i++) {
      try {
        await notion.pages.create({
          parent: { database_id: databaseId },
          properties,
        });
        break;
      } catch (error) {
        if (i < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        } else {
          console.error(error);
        }
      }
    }
  }
};
