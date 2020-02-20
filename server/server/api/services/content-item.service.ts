/**
 * Service for the content item end points.
 */
import L from '../../common/logger';

/**
 * Interface for the content item props.
 */
interface ContentItem {
  id: number;
  title: string;
  pageUrl: string;
  imageUrl: string;
  dismissed: boolean;
}

/**
 * Interface for the content item list end point result.
 */
interface ContentItemListResult {
  items: ContentItem[];
  pageNo: number;
  pageSize: number;
  totalItemCount: number;
}

/**
 * The total number of items to generate.
 */
const ITEM_COUNT = 100;

/**
 * Starting image ID in Picsum.
 */
const IMAGE_START_ID = 100;

/**
 * Picsum image URL prefix
 */
const IMAGE_URL_PREFIX = 'https://i.picsum.photos/id/';

// Generate content items
const contentItems: ContentItem[] = [];
for (let id = 0; id < ITEM_COUNT; id++) {
  const imageId: number = IMAGE_START_ID + id;
  contentItems.push({
    id: id,
    title: `This is a sample image with ID=${id}`,
    pageUrl: `${IMAGE_URL_PREFIX}${imageId}/800/600.jpg`,
    imageUrl: `${IMAGE_URL_PREFIX}${imageId}/200/100.jpg`,
    dismissed: false,
  });
}

/**
 * Service class.
 */
export class ContentItemService {
  /**
   * Returns a subset of the content items (limited by the page name and size).
   * @param pageNo number of page to return
   * @param pageSize page size
   */
  list(pageNo: number, pageSize: number): Promise<ContentItemListResult> {
    L.info(
      `Fetch content item list page (page_no=${pageNo}, page_size=${pageSize})`
    );
    const allContentItems: ContentItem[] = contentItems.filter(
      ci => !ci.dismissed
    );
    const items: ContentItem[] = allContentItems.slice(
      pageNo * pageSize,
      (pageNo + 1) * pageSize
    );
    return Promise.resolve({
      items,
      pageNo,
      pageSize,
      totalItemCount: allContentItems.length,
    });
  }

  /**
   * Returns the content item with the given id
   * @param id ID of the contenrt item to return
   */
  byId(id: number): Promise<ContentItem | undefined> {
    L.info(`Fetch content item with ID=${id}`);
    const result: ContentItem | undefined = contentItems.find(
      ci => ci.id === id
    );
    return Promise.resolve(result);
  }

  /**
   * Dismisses the content item with the given ID.
   * @param id ID of the content item to dismiss
   */
  dismiss(id: number): Promise<ContentItem | undefined> {
    L.info(`Dismiss content item with ID=${id}`);
    const contentItem: ContentItem | undefined = contentItems.find(
      ci => ci.id === id
    );
    if (contentItem) {
      contentItem.dismissed = true;
    }
    return Promise.resolve(contentItem);
  }

  /**
   * Resets all content items to the initial state.
   */
  reset(): Promise<void> {
    contentItems.forEach(ci => {
      ci.dismissed = false;
    });
    return Promise.resolve();
  }
}

export default new ContentItemService();
