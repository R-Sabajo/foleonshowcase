import qs from 'qs';

export const filterQuery = (
  page: number,
  limit: number,
  field: string,
  type: string,
  value: string,
  orderbyField: string,
  orderbyType: string,
  orderbyDirection: string
) => {
  let query = qs.stringify({
    page: page,
    limit: limit,
    query: [
      {
        field: field,
        type: type,
        value: `%${value}%`,
      },
    ],
    'order-by': [
      {
        field: orderbyField,
        type: orderbyType,
        direction: orderbyDirection,
      },
    ],
  });
  return query;
};
