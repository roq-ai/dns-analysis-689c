import { AnalysisResultInterface } from 'interfaces/analysis-result';
import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface DnsLogInterface {
  id?: string;
  log_data: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;
  analysis_result?: AnalysisResultInterface[];
  organization?: OrganizationInterface;
  _count?: {
    analysis_result?: number;
  };
}

export interface DnsLogGetQueryInterface extends GetQueryInterface {
  id?: string;
  log_data?: string;
  organization_id?: string;
}
