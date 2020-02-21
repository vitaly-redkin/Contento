/**
 * Class to contain the content item properties.
 */
export class ContentItemModel {
  /**
   * Constructor.
   * @param one per field
   */
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly pageUrl: string,
    public readonly imageUrl: string,
    public readonly dismissed: boolean,
  ) {
   
  }
}
