import axios from 'axios';
import queryString from 'query-string';
import { AnalysisResultInterface, AnalysisResultGetQueryInterface } from 'interfaces/analysis-result';
import { GetQueryInterface } from '../../interfaces';

export const getAnalysisResults = async (query?: AnalysisResultGetQueryInterface) => {
  const response = await axios.get(`/api/analysis-results${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAnalysisResult = async (analysisResult: AnalysisResultInterface) => {
  const response = await axios.post('/api/analysis-results', analysisResult);
  return response.data;
};

export const updateAnalysisResultById = async (id: string, analysisResult: AnalysisResultInterface) => {
  const response = await axios.put(`/api/analysis-results/${id}`, analysisResult);
  return response.data;
};

export const getAnalysisResultById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/analysis-results/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAnalysisResultById = async (id: string) => {
  const response = await axios.delete(`/api/analysis-results/${id}`);
  return response.data;
};
