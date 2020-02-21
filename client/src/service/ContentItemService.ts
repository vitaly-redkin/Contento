import { BaseService, EmptyPayload, SuccessHandler, ErrorHandler, EmptyResult } from './BaseService';
import { ContentItemModel } from '../models/ContentItemModel';

/**
 * COntent item endpoints common prefix.
 */
const PREFIX = '/content-item'

/**
 * Class to make conetent item API calls.
 */
export class ContentItemService extends BaseService {
    /**
     * Fetches the portion of the content items.
     * 
     * @param pageNo number of the content item list page to fetch
     * @param pageSize size of the page to fetch
     * @param onSuccess function to call on success
     * @param onError function to call on error
     */
    public fetchContentItems(
        pageNo: number,
        pageSize: number,
        onSuccess: SuccessHandler<ContentItemListResult>,
        onError: ErrorHandler
    ): void {
        this.callApi<EmptyPayload, ContentItemListResult>(
            `${PREFIX}?page_no=${pageNo}&page_size=${pageSize}`,
            'GET',
            null,
            onSuccess,
            onError
        );
    }

    /**
     * Fetches an information about the particular content item.
     * 
     * @param id ID of the content item to return the data for
     * @param onSuccess function to call on success
     * @param onError function to call on error
     */
    public getContentItemById(
        id: number,
        onSuccess: SuccessHandler<ContentItemModel>,
        onError: ErrorHandler
    ): void {
        this.callApi<EmptyPayload, ContentItemModel>(
            `${PREFIX}/${id}`,
            'GET',
            null,
            onSuccess,
            onError
        );
    }

    /**
     * Dismisses the content item with the given ID.
     * 
     * @param id ID of the content item to dismiss
     * @param onSuccess function to call on success
     * @param onError function to call on error
     */
    public dismisContentItemById(
        id: number,
        onSuccess: SuccessHandler<ContentItemModel>,
        onError: ErrorHandler
    ): void {
        this.callApi<EmptyPayload, ContentItemModel>(
            `${PREFIX}/${id}`,
            'DELETE',
            null,
            onSuccess,
            onError
        );
    }

    /**
     * Dismisses the content item with the given ID.
     * 
     * @param id ID of the content item to dismiss
     * @param onSuccess function to call on success
     * @param onError function to call on error
     */
    public resetContentItems(
        onSuccess: SuccessHandler<EmptyResult>,
        onError: ErrorHandler
    ): void {
        this.callApi<EmptyPayload, EmptyResult>(
            `${PREFIX}/reset`,
            'POST',
            null,
            onSuccess,
            onError
        );
    }
}

/**
 * Interface for the content item list end point result.
 */
export interface ContentItemListResult {
    items: ContentItemModel[];
    pageNo: number;
    pageSize: number;
    totalItemCount: number;
}
  