const mapping: Record<string, string> = {
  'analysis-results': 'analysis_result',
  'dns-logs': 'dns_log',
  organizations: 'organization',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
