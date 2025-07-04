/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * order-manager
 * API order-manager
 * OpenAPI spec version: 1.0.0
 */
import {
  useMutation,
  useQuery,
  useSuspenseQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  MutationFunction,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  UseSuspenseQueryOptions,
  UseSuspenseQueryResult
} from '@tanstack/react-query'
import type {
  CreatePaymentRequest,
  PageRequest,
  PageUiPaymentShort,
  UiPayment,
  UiPaymentShort,
  UpdatePaymentRequest
} from './models'
import { apiInstance } from '../../../shared/api/instance';
import type { BodyType } from '../../../shared/api/instance';




/**
 * Обновить информацию по платежу
 */
export const updatePayment = (
    updatePaymentRequest: BodyType<UpdatePaymentRequest>,
 ) => {
      
      
      return apiInstance<UiPayment>(
      {url: `/api/v1/ui/payments`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updatePaymentRequest
    },
      );
    }
  


export const getUpdatePaymentMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updatePayment>>, TError,{data: BodyType<UpdatePaymentRequest>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof updatePayment>>, TError,{data: BodyType<UpdatePaymentRequest>}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updatePayment>>, {data: BodyType<UpdatePaymentRequest>}> = (props) => {
          const {data} = props ?? {};

          return  updatePayment(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdatePaymentMutationResult = NonNullable<Awaited<ReturnType<typeof updatePayment>>>
    export type UpdatePaymentMutationBody = BodyType<UpdatePaymentRequest>
    export type UpdatePaymentMutationError = unknown

    export const useUpdatePayment = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updatePayment>>, TError,{data: BodyType<UpdatePaymentRequest>}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof updatePayment>>,
        TError,
        {data: BodyType<UpdatePaymentRequest>},
        TContext
      > => {

      const mutationOptions = getUpdatePaymentMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Добавить платеж по заказу
 */
export const addPayment = (
    createPaymentRequest: BodyType<CreatePaymentRequest>,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<UiPayment>(
      {url: `/api/v1/ui/payments`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createPaymentRequest, signal
    },
      );
    }
  


export const getAddPaymentMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof addPayment>>, TError,{data: BodyType<CreatePaymentRequest>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof addPayment>>, TError,{data: BodyType<CreatePaymentRequest>}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof addPayment>>, {data: BodyType<CreatePaymentRequest>}> = (props) => {
          const {data} = props ?? {};

          return  addPayment(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type AddPaymentMutationResult = NonNullable<Awaited<ReturnType<typeof addPayment>>>
    export type AddPaymentMutationBody = BodyType<CreatePaymentRequest>
    export type AddPaymentMutationError = unknown

    export const useAddPayment = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof addPayment>>, TError,{data: BodyType<CreatePaymentRequest>}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof addPayment>>,
        TError,
        {data: BodyType<CreatePaymentRequest>},
        TContext
      > => {

      const mutationOptions = getAddPaymentMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Получить страницу платежей
 */
export const getPaymentPage = (
    pageRequest: BodyType<PageRequest>,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<PageUiPaymentShort>(
      {url: `/api/v1/ui/payments/page`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: pageRequest, signal
    },
      );
    }
  


export const getGetPaymentPageMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getPaymentPage>>, TError,{data: BodyType<PageRequest>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof getPaymentPage>>, TError,{data: BodyType<PageRequest>}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof getPaymentPage>>, {data: BodyType<PageRequest>}> = (props) => {
          const {data} = props ?? {};

          return  getPaymentPage(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type GetPaymentPageMutationResult = NonNullable<Awaited<ReturnType<typeof getPaymentPage>>>
    export type GetPaymentPageMutationBody = BodyType<PageRequest>
    export type GetPaymentPageMutationError = unknown

    export const useGetPaymentPage = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof getPaymentPage>>, TError,{data: BodyType<PageRequest>}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof getPaymentPage>>,
        TError,
        {data: BodyType<PageRequest>},
        TContext
      > => {

      const mutationOptions = getGetPaymentPageMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Получить все платежи по контрагенту
 */
export const findAllPaymentByCounterparty = (
    counterpartyId: string,
    pageRequest: BodyType<PageRequest>,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<PageUiPaymentShort>(
      {url: `/api/v1/ui/payments/counterparty/${counterpartyId}`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: pageRequest, signal
    },
      );
    }
  


export const getFindAllPaymentByCounterpartyMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof findAllPaymentByCounterparty>>, TError,{counterpartyId: string;data: BodyType<PageRequest>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof findAllPaymentByCounterparty>>, TError,{counterpartyId: string;data: BodyType<PageRequest>}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof findAllPaymentByCounterparty>>, {counterpartyId: string;data: BodyType<PageRequest>}> = (props) => {
          const {counterpartyId,data} = props ?? {};

          return  findAllPaymentByCounterparty(counterpartyId,data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type FindAllPaymentByCounterpartyMutationResult = NonNullable<Awaited<ReturnType<typeof findAllPaymentByCounterparty>>>
    export type FindAllPaymentByCounterpartyMutationBody = BodyType<PageRequest>
    export type FindAllPaymentByCounterpartyMutationError = unknown

    export const useFindAllPaymentByCounterparty = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof findAllPaymentByCounterparty>>, TError,{counterpartyId: string;data: BodyType<PageRequest>}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof findAllPaymentByCounterparty>>,
        TError,
        {counterpartyId: string;data: BodyType<PageRequest>},
        TContext
      > => {

      const mutationOptions = getFindAllPaymentByCounterpartyMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Получить платеж по id
 */
export const getPayment = (
    paymentId: string,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<UiPayment>(
      {url: `/api/v1/ui/payments/${paymentId}`, method: 'GET', signal
    },
      );
    }
  

export const getGetPaymentQueryKey = (paymentId: string,) => {
    return [`/api/v1/ui/payments/${paymentId}`] as const;
    }

    
export const getGetPaymentQueryOptions = <TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPaymentQueryKey(paymentId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPayment>>> = ({ signal }) => getPayment(paymentId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(paymentId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetPaymentQueryResult = NonNullable<Awaited<ReturnType<typeof getPayment>>>
export type GetPaymentQueryError = unknown


export function useGetPayment<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getPayment>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetPayment<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getPayment>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetPayment<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetPayment<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetPaymentQueryOptions(paymentId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetPaymentSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(paymentId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetPaymentQueryKey(paymentId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getPayment>>> = ({ signal }) => getPayment(paymentId, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetPaymentSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getPayment>>>
export type GetPaymentSuspenseQueryError = unknown


export function useGetPaymentSuspense<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetPaymentSuspense<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetPaymentSuspense<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetPaymentSuspense<TData = Awaited<ReturnType<typeof getPayment>>, TError = unknown>(
 paymentId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getPayment>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetPaymentSuspenseQueryOptions(paymentId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Удалить платеж
 */
export const deletePayment = (
    paymentId: string,
 ) => {
      
      
      return apiInstance<void>(
      {url: `/api/v1/ui/payments/${paymentId}`, method: 'DELETE'
    },
      );
    }
  


export const getDeletePaymentMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deletePayment>>, TError,{paymentId: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deletePayment>>, TError,{paymentId: string}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deletePayment>>, {paymentId: string}> = (props) => {
          const {paymentId} = props ?? {};

          return  deletePayment(paymentId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeletePaymentMutationResult = NonNullable<Awaited<ReturnType<typeof deletePayment>>>
    
    export type DeletePaymentMutationError = unknown

    export const useDeletePayment = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deletePayment>>, TError,{paymentId: string}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof deletePayment>>,
        TError,
        {paymentId: string},
        TContext
      > => {

      const mutationOptions = getDeletePaymentMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Полчить все платежи по заказу
 */
export const getAllPaymentByOrder = (
    orderId: string,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<UiPaymentShort[]>(
      {url: `/api/v1/ui/payments/orders/${orderId}`, method: 'GET', signal
    },
      );
    }
  

export const getGetAllPaymentByOrderQueryKey = (orderId: string,) => {
    return [`/api/v1/ui/payments/orders/${orderId}`] as const;
    }

    
export const getGetAllPaymentByOrderQueryOptions = <TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(orderId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAllPaymentByOrderQueryKey(orderId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllPaymentByOrder>>> = ({ signal }) => getAllPaymentByOrder(orderId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(orderId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAllPaymentByOrderQueryResult = NonNullable<Awaited<ReturnType<typeof getAllPaymentByOrder>>>
export type GetAllPaymentByOrderQueryError = unknown


export function useGetAllPaymentByOrder<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllPaymentByOrder>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAllPaymentByOrder<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getAllPaymentByOrder>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAllPaymentByOrder<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetAllPaymentByOrder<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAllPaymentByOrderQueryOptions(orderId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetAllPaymentByOrderSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(orderId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetAllPaymentByOrderQueryKey(orderId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getAllPaymentByOrder>>> = ({ signal }) => getAllPaymentByOrder(orderId, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetAllPaymentByOrderSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getAllPaymentByOrder>>>
export type GetAllPaymentByOrderSuspenseQueryError = unknown


export function useGetAllPaymentByOrderSuspense<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAllPaymentByOrderSuspense<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetAllPaymentByOrderSuspense<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetAllPaymentByOrderSuspense<TData = Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError = unknown>(
 orderId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getAllPaymentByOrder>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetAllPaymentByOrderSuspenseQueryOptions(orderId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



