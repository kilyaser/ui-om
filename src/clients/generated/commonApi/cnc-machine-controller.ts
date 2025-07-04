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
  CreateMachineRequest,
  UiMachine,
  UpdateMachineRequest
} from './models'
import { apiInstance } from '../../../shared/api/instance';
import type { BodyType } from '../../../shared/api/instance';




/**
 * Обновить информацию по станку
 */
export const updateMachine = (
    updateMachineRequest: BodyType<UpdateMachineRequest>,
 ) => {
      
      
      return apiInstance<UiMachine>(
      {url: `/api/v1/ui/machines`, method: 'PUT',
      headers: {'Content-Type': 'application/json', },
      data: updateMachineRequest
    },
      );
    }
  


export const getUpdateMachineMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateMachine>>, TError,{data: BodyType<UpdateMachineRequest>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof updateMachine>>, TError,{data: BodyType<UpdateMachineRequest>}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof updateMachine>>, {data: BodyType<UpdateMachineRequest>}> = (props) => {
          const {data} = props ?? {};

          return  updateMachine(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type UpdateMachineMutationResult = NonNullable<Awaited<ReturnType<typeof updateMachine>>>
    export type UpdateMachineMutationBody = BodyType<UpdateMachineRequest>
    export type UpdateMachineMutationError = unknown

    export const useUpdateMachine = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof updateMachine>>, TError,{data: BodyType<UpdateMachineRequest>}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof updateMachine>>,
        TError,
        {data: BodyType<UpdateMachineRequest>},
        TContext
      > => {

      const mutationOptions = getUpdateMachineMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Создать станок
 */
export const createMachine = (
    createMachineRequest: BodyType<CreateMachineRequest>,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<UiMachine>(
      {url: `/api/v1/ui/machines`, method: 'POST',
      headers: {'Content-Type': 'application/json', },
      data: createMachineRequest, signal
    },
      );
    }
  


export const getCreateMachineMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createMachine>>, TError,{data: BodyType<CreateMachineRequest>}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof createMachine>>, TError,{data: BodyType<CreateMachineRequest>}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof createMachine>>, {data: BodyType<CreateMachineRequest>}> = (props) => {
          const {data} = props ?? {};

          return  createMachine(data,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type CreateMachineMutationResult = NonNullable<Awaited<ReturnType<typeof createMachine>>>
    export type CreateMachineMutationBody = BodyType<CreateMachineRequest>
    export type CreateMachineMutationError = unknown

    export const useCreateMachine = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof createMachine>>, TError,{data: BodyType<CreateMachineRequest>}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof createMachine>>,
        TError,
        {data: BodyType<CreateMachineRequest>},
        TContext
      > => {

      const mutationOptions = getCreateMachineMutationOptions(options);

      return useMutation(mutationOptions);
    }
    /**
 * Поиск станка по id
 */
export const getMachine = (
    machineId: string,
 signal?: AbortSignal
) => {
      
      
      return apiInstance<UiMachine>(
      {url: `/api/v1/ui/machines/${machineId}`, method: 'GET', signal
    },
      );
    }
  

export const getGetMachineQueryKey = (machineId: string,) => {
    return [`/api/v1/ui/machines/${machineId}`] as const;
    }

    
export const getGetMachineQueryOptions = <TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(machineId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMachineQueryKey(machineId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMachine>>> = ({ signal }) => getMachine(machineId, signal);

      

      

   return  { queryKey, queryFn, enabled: !!(machineId), ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetMachineQueryResult = NonNullable<Awaited<ReturnType<typeof getMachine>>>
export type GetMachineQueryError = unknown


export function useGetMachine<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMachine>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetMachine<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getMachine>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetMachine<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetMachine<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetMachineQueryOptions(machineId,options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



export const getGetMachineSuspenseQueryOptions = <TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(machineId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetMachineQueryKey(machineId);

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getMachine>>> = ({ signal }) => getMachine(machineId, signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetMachineSuspenseQueryResult = NonNullable<Awaited<ReturnType<typeof getMachine>>>
export type GetMachineSuspenseQueryError = unknown


export function useGetMachineSuspense<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options: { query:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetMachineSuspense<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetMachineSuspense<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }

export function useGetMachineSuspense<TData = Awaited<ReturnType<typeof getMachine>>, TError = unknown>(
 machineId: string, options?: { query?:Partial<UseSuspenseQueryOptions<Awaited<ReturnType<typeof getMachine>>, TError, TData>>, }

  ):  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetMachineSuspenseQueryOptions(machineId,options)

  const query = useSuspenseQuery(queryOptions) as  UseSuspenseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



/**
 * Удалить станок по id
 */
export const deleteMachine = (
    machineId: string,
 ) => {
      
      
      return apiInstance<void>(
      {url: `/api/v1/ui/machines/${machineId}`, method: 'DELETE'
    },
      );
    }
  


export const getDeleteMachineMutationOptions = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteMachine>>, TError,{machineId: string}, TContext>, }
): UseMutationOptions<Awaited<ReturnType<typeof deleteMachine>>, TError,{machineId: string}, TContext> => {
const {mutation: mutationOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof deleteMachine>>, {machineId: string}> = (props) => {
          const {machineId} = props ?? {};

          return  deleteMachine(machineId,)
        }

        


  return  { mutationFn, ...mutationOptions }}

    export type DeleteMachineMutationResult = NonNullable<Awaited<ReturnType<typeof deleteMachine>>>
    
    export type DeleteMachineMutationError = unknown

    export const useDeleteMachine = <TError = unknown,
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof deleteMachine>>, TError,{machineId: string}, TContext>, }
): UseMutationResult<
        Awaited<ReturnType<typeof deleteMachine>>,
        TError,
        {machineId: string},
        TContext
      > => {

      const mutationOptions = getDeleteMachineMutationOptions(options);

      return useMutation(mutationOptions);
    }
    