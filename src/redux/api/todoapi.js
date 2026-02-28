import { apiSlice } from "../backendApiRedux/apiSlice";

const TODO_API = "/api/todo"; 

export const todoApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    getTodos: builder.query({
      query: () => ({
        url: `${TODO_API}/get-todolist`,
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),

    createTodo: builder.mutation({
      query: (data) => ({
        url: `${TODO_API}/create-todo`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),

    updateTodo: builder.mutation({
      query: ({ id, data }) => ({
        url: `${TODO_API}/update-todolist/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Todo"],
    }),

    deleteTodo: builder.mutation({
      query: (id) => ({
        url: `${TODO_API}/delete-todolist/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Todo"],
    }),

    getTodoById: builder.query({
      query: (id) => ({
        url: `${TODO_API}/get-todo/${id}`,
        method: "GET",
      }),
    }),

    getHistory: builder.query({
      query: () => ({
        url: `${TODO_API}/get-history`,
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),

  }),
});

export const {
  useGetTodosQuery,
  useCreateTodoMutation,
  useUpdateTodoMutation,
  useDeleteTodoMutation,
  useGetTodoByIdQuery,
  useGetHistoryQuery,
} = todoApi;