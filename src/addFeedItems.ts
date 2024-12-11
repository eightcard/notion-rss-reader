import { Client } from "https://deno.land/x/notion_sdk/src/mod.ts";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TODO = any;

export const addFeedItems = async (
  newFeedItems: {
    [key: string]: TODO;
  }[],
) => {
  const notion = new Client({ auth: Deno.env.get("NOTION_KEY") });
  const databaseId = Deno.env.get("NOTION_READER_DATABASE_ID") || "";

  for (const item of newFeedItems) {
    const { title, link, pubDate } = item;
    const domain = link?.match(/^https?:\/{2,}(.*?)(?:\/|\?|#|$)/);

    const properties: TODO = {
      Title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
      URL: {
        url: link,
      },
      Domain: {
        select: {
          name: domain ? domain[1] : null,
        },
      },
      "Created At": {
        rich_text: [
          {
            text: {
              content: pubDate,
            },
          },
        ],
      },
    };

    console.log(title);
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
