import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';

function useDynamicCrud(endpoint) {
  const queryClient = useQueryClient();

  // Read operation
  const readQueryKey = ['data', endpoint];
  const readQuery = useQuery(readQueryKey, () => axios.get(endpoint).then((res) => res.data));
    // Create operation
    const createMutation = useMutation((data) => axios.post(endpoint, data), {
      onMutate: async (newData) => {
        await queryClient.cancelQueries(readQueryKey);
  
        const snapshot = queryClient.getQueryData(readQueryKey);
  
        // Construct a new object with the updated data
        const updatedData = {
          ...snapshot,
          data: {
            ...snapshot.data,
            lectures: [...snapshot.lectures, newData],
          },
        };
  
        // Update the cache
        queryClient.setQueryData(readQueryKey, updatedData);
  
        return { snapshot };
      },
      onError: (error, newData, context) => {
        if (context?.snapshot) {
          queryClient.setQueryData(readQueryKey, context.snapshot);
        }
      },
    });

  // Update operation
  const updateMutation = useMutation((updatedData) => axios.put(endpoint, updatedData), {
    onMutate: (updatedData) => {
      // Snapshot the current data to enable rollback
      const snapshot = queryClient.getQueryData(readQueryKey);

      // Update the cache optimistically
      queryClient.setQueryData(
        readQueryKey,
        snapshot.map((item) => (item.id === updatedData.id ? updatedData : item))
      );

      // Return a context object that can be used to rollback
      return { snapshot };
    },
    onError: (error, updatedData, context) => {
      // Rollback to the previous data in case of an error
      if (context?.snapshot) {
        queryClient.setQueryData(readQueryKey, context.snapshot);
      }
    },
  });

  // Delete operation
  
  // Delete operation
  const deleteMutation = useMutation((id) => axios.delete(`${endpoint}/${id}`), {
    onMutate: async (id) => {
      // Snapshot the current data to enable rollback
      const snapshot = queryClient.getQueryData(readQueryKey);

      // Remove the deleted item from the cache optimistically
      queryClient.setQueryData(readQueryKey, {
        ...snapshot,
        data: {
          ...snapshot.data,
          lectures: snapshot.lectures.filter((item) => item._id !== id),
        },
      });

      // Return a context object that can be used to rollback
      return { snapshot };
    },
    onError: (error, id, context) => {
      // Rollback to the previous data in case of an error
      if (context?.snapshot) {
        queryClient.setQueryData(readQueryKey, context.snapshot);
      }
    },
    onSettled: () => {
      // Invalidate the read query to trigger a refetch after successful delete
      queryClient.invalidateQueries(readQueryKey);
    },
  });

  return {
    data: readQuery.data,
    isLoading: readQuery.isLoading,
    isError: readQuery.isError,
    createItem: createMutation.mutateAsync,
    updateItem: updateMutation.mutateAsync,
    deleteItem: deleteMutation.mutateAsync,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
}

export default useDynamicCrud;
