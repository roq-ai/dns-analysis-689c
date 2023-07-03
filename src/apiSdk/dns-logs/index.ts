import axios from 'axios';
import queryString from 'query-string';
import { DnsLogInterface, DnsLogGetQueryInterface } from 'interfaces/dns-log';
import { GetQueryInterface } from '../../interfaces';

export const getDnsLogs = async (query?: DnsLogGetQueryInterface) => {
  const response = await axios.get(`/api/dns-logs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createDnsLog = async (dnsLog: DnsLogInterface) => {
  const response = await axios.post('/api/dns-logs', dnsLog);
  return response.data;
};

export const updateDnsLogById = async (id: string, dnsLog: DnsLogInterface) => {
  const response = await axios.put(`/api/dns-logs/${id}`, dnsLog);
  return response.data;
};

export const getDnsLogById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/dns-logs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteDnsLogById = async (id: string) => {
  const response = await axios.delete(`/api/dns-logs/${id}`);
  return response.data;
};
