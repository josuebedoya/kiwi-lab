type ResApi = {
  success: boolean;
  data?: any;
  error?: any;
  message?: string;
  status?: number;
}

// Generic API response function
const resApi = ({data, error, ...rest}: ResApi) => {
  return new Response(JSON.stringify({
    data: data ?? [],
    error: error ?? null,
    success: !!error,
    message: rest?.message,
    status: rest?.status
  }))
}

export default resApi;