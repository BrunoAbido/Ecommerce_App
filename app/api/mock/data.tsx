
import axios, { AxiosError } from 'axios';

const API_BASE_URL = 'https://8jcox47hg2.execute-api.us-east-2.amazonaws.com/dev/';

export async function fetchMostPopular() {
  try {
    const response = await axios.get(`${API_BASE_URL}/mostPopular`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar dados mais populares da API: ${(error as AxiosError).message}`);
  }
}

export async function fetchAllItems() {
  try {
    const response = await axios.get(`${API_BASE_URL}/items`);
    return response.data;
  } catch (error) {
    throw new Error(`Erro ao buscar todos os itens da API: ${(error as AxiosError).message}`);
  }
}
