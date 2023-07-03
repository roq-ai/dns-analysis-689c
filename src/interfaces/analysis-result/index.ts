import { DnsLogInterface } from 'interfaces/dns-log';
import { GetQueryInterface } from 'interfaces';

export interface AnalysisResultInterface {
  id?: string;
  result_data: string;
  dns_log_id: string;
  created_at?: any;
  updated_at?: any;

  dns_log?: DnsLogInterface;
  _count?: {};
}

export interface AnalysisResultGetQueryInterface extends GetQueryInterface {
  id?: string;
  result_data?: string;
  dns_log_id?: string;
}
