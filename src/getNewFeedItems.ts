import { parseFeed } from "https://deno.land/x/rss@1.1.1/mod.ts";
import { timeDifference } from "./helpers.ts";

export const getNewFeedItems = async (feedUrl: string) => {
  const response = await fetch(feedUrl);
  const xml = await response.text();
  const { entries } = await parseFeed(xml);

  return entries.filter((item) => {
    const pubDate = item.updated
    if (!pubDate) return false;

    const { diffInHours } = timeDifference(pubDate);
    return diffInHours === 0;
  });
};
