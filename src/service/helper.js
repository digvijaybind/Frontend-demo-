export const SuccessHandler = (response) => response.data;

export const errorHandler = (error) => {
  throw error.response.data.message;
};
