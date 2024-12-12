import { getNewFeedItems } from "./getNewFeedItems.ts";
import { getFeedUrlList } from "./getFeedUrlList.ts";
import { addFeedItems } from "./addFeedItems.ts";

async function index() {
  const feedUrlList = await getFeedUrlList();
  for (const feedUrl of feedUrlList) {
    if (feedUrl) {
      try {
        const newFeedItems = await getNewFeedItems(feedUrl);
        await addFeedItems(newFeedItems);
      } catch (error) {
        console.error(error);
      }
    }
  }
}

index();
