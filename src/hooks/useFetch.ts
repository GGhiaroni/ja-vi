import { useEffect, useState } from "react";

interface FetchState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

export function useFetch<T>(url: string | null): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  useEffect(() => {
    if (!url) {
      setState({ data: null, loading: false, error: null });
      return;
    }

    const fetchData = async () => {
      setState({
        data: null,
        loading: true,
        error: null,
      });
      try {
        const response = await fetch(url);

        if (!response.ok) {
          const errorText = `Erro HTTP: ${response.status} - ${response.statusText}`;
          throw new Error(errorText);
        }

        const data: T = await response.json();

        setState({ data, loading: false, error: null });
      } catch (error) {
        let errorMessage = "Erro desconhecido ao buscar dados.";
        if (error instanceof Error) {
          errorMessage = error.message;
        }
        setState({ data: null, loading: false, error: errorMessage });
      }
    };
    fetchData();
  }, [url]);

  return state;
}
