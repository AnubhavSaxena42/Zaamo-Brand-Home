import {Get, Put, Post, Delete} from './api.service';
import {WEBSERVER_BASE_URL} from '../core/constants';

class ContentService {
  _apiUrl = `${WEBSERVER_BASE_URL}`;

  //Get filters(Content Format, Content Source, Content Type)
  getFilters() {
    return new Promise((resolve, reject) => {
      Get(`${this._apiUrl}/get/content/filters/`, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
  //Get Content
  //Params content_source,content_format,limit,offset
  getContent(contentSource, contentFormat, limit, offset) {
    console.log(
      'Send Request for:' +
        ' Content Source: ' +
        contentSource +
        ' Content Format: ' +
        contentFormat,
    );
    return new Promise((resolve, reject) => {
      Get(`${this._apiUrl}/content/`, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
        params: {
          content_source: contentSource,
          content_format: contentFormat,
          limit: limit,
          offset: offset,
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  //Get Tagged Products
  //Params product_id,sku_id
  getTaggedProducts(productId, skuId) {
    return new Promise((resolve, reject) => {
      Get(`${this._apiUrl}/tag/content/`, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
        params: {
          product_id: productId,
          sku_id: skuId,
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  //Tag a product or collection on content
  //body [{id,product_id,sku_id(Variant ID),content_type}],brand_name for product
  //body [{content_id,collection_id,content_type}],collection:true,brand_name for collection
  tagProduct(tagData, brandName) {
    const requestObj = {
      data: tagData,
      brand_name: brandName,
    };
    console.log(requestObj);
    return new Promise((resolve, reject) => {
      Post(
        `${this._apiUrl}/tag/content/`,
        {
          data: tagData,
          brand_name: brandName,
        },
        {
          headers: {
            'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  //untags product from a content
  //Body sku_id,content_id,product_id
  untagProduct(untagData) {
    console.log('service untag called', untagData);
    return new Promise((resolve, reject) => {
      Post(
        `${this._apiUrl}/untag/content/`,
        {
          data: untagData,
        },
        {
          headers: {
            'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
            'Content-Type': 'application/json',
          },
        },
      )
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  //Get products from a particular brand
  //Params brand_name after(For pagination, send endCursor of previous response)
  getProducts(brandId, first, after) {
    console.log(brandId);
    return new Promise((resolve, reject) => {
      Get(`${this._apiUrl}/get/products/`, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
        params: {
          brand_id: brandId,
          after: after,
          first: first,
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  //Get Collections from a Store
  //params store_id
  getCollections(storeId, after) {
    return new Promise((resolve, reject) => {
      Get(`${this._apiUrl}/get/collections/`, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
        },
        params: {
          store_id: storeId,
          after: after,
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }

  //Mark/Unmark Content as Trash
  //Body ids,is_trash
  markTrash(trashData) {
    return new Promise((resolve, reject) => {
      Post(`${WEBSERVER_BASE_URL}/content/trash/`, trashData, {
        headers: {
          'Service-Token': '2900ba48-85f6-4929-b19d-0c0da14dbc14',
          'Content-Type': 'application/json',
        },
      })
        .then(res => resolve(res))
        .catch(err => reject(err));
    });
  }
}
const contentService = new ContentService();
Object.freeze(contentService);
export default contentService;
