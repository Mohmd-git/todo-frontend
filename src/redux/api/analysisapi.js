import { apiSlice } from "../backendApiRedux/apiSlice";

export const analysisApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAnalysis: builder.query({
      query: () => ({
        url: "/api/analysis/get-analysis", 
        method: "GET",
      }),
      providesTags: ["Todo"],
    }),
  }),
});

export const { useGetAnalysisQuery } = analysisApi;