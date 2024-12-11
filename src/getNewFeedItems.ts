import Parser from "npm:rss-parser@3.13.0";
import { timeDifference } from "./helpers.ts";

const parser = new Parser();

export const getNewFeedItems = async (feedUrl: string) => {
  const { items: newFeedItems } = await parser.parseURL(feedUrl);

  return newFeedItems.filter((feedItem) => {
    const { pubDate } = feedItem;

    if (!pubDate) return false;

    const publishedDate = new Date(pubDate).getTime() / 1000;
    const { diffInHours } = timeDifference(publishedDate);
    return diffInHours === 0;
  });
};
