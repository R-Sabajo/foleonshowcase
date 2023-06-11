import qs from 'qs';

export const filterQuery = (
  page: number,
  limit: number,
  field: string,
  type: string,
  value: string | number,
  orderbyField: string,
  orderbyType: string,
  orderbyDirection: string
) => {
  let query = qs.stringify(
    {
      page: page,
      limit: limit,
      query: [
        {
          field: field,
          type: type,
          value: typeof value === 'number' ? value : `%${value}%`,
        },
      ],
      'order-by': [
        {
          field: orderbyField,
          type: orderbyType,
          direction: orderbyDirection,
        },
      ],
    },
    { encodeValuesOnly: true }
  );
  return query;
};
