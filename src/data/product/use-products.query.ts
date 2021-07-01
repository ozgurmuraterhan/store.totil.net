import {
  QueryParamsType,
  ProductsQueryOptionsType,
  Product,
} from "@ts-types/custom.types";
import { CoreApi, ParamsType } from "@utils/api/core.api";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import { mapPaginatorData } from "@utils/data-mappers";
import { useInfiniteQuery } from "react-query";
const ProductService = new CoreApi(API_ENDPOINTS.PRODUCTS);
type PaginatedProduct = {
  data: Product[];
  paginatorInfo: any;
};
const fetchProducts = async ({
  queryKey,
  pageParam,
}: QueryParamsType): Promise<PaginatedProduct> => {
  const [_key, params] = queryKey;
  let fetchedData: any = {};
  if (pageParam) {
    const response = await ProductService.fetchUrl(pageParam);
    fetchedData = response.data;
  } else {
    const response = await ProductService.find(params as ParamsType);
    fetchedData = response.data;
  }
  const { data, ...rest } = fetchedData;
  return { data, paginatorInfo: mapPaginatorData({ ...rest }) };
};

const useProductsQuery = (options: ProductsQueryOptionsType) => {
  return useInfiniteQuery<PaginatedProduct, Error>(
    [API_ENDPOINTS.PRODUCTS, options],
    fetchProducts,
    {
      getNextPageParam: ({ paginatorInfo }) => paginatorInfo.nextPageUrl,
    }
  );
};

export { useProductsQuery, fetchProducts };
