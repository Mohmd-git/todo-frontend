import axios from "axios";
const API_BASEQUERY = import.meta.env.VITE_BACKEND_URL;

const api = axios.create({
  baseURL: API_BASEQUERY,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createTodo = async (formData) => {
  try {
    const response = await api.post("/api/todo/create-todo", formData);
   return response.data;

  } catch (error) {
    console.log("error in creating task", error.message);
  }
};



export const updateTodo = async (id, formData) => {
  try {
    const response = await api.put(`/api/todo/update-todolist/${id}`, formData);
    // console.log("response", response);
    
    return response?.data;
  } catch (error) {
    console.log("Error updating task", error.message);
  }
};

export const getTodo = async () => {
  try {
    const response = await api.get("/api/todo/get-todolist");
    // console.log("Fetch Data", response?.data?.gettodolist);

    return response?.data;
  } catch (error) {
    console.log("Error in fetching task", error.message);
  }
};

export const deleteTodoById = async (id) => {
  try {
    const response = await api.delete(`/api/todo/delete-todolist/${id}`)

    // console.log("delete by id", response);
    
    return response?.data
  } catch (error) {
        console.log("Error in deleteing task by id", error.message);
  }
}

export const deleteTodoAll = async () => {
  try {
    const response = await api.delete(`/api/todo/delete-todoall`);
    // console.log("delete data from it", data);

    return response?.data;
  } catch (error) {
    console.log("Error deleting task", error.message);
  }
};

const todoService = {
  createTodo,
  updateTodo,
  getTodo,
  deleteTodoById,
  deleteTodoAll,
};

export default todoService;
