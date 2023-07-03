import * as yup from 'yup';

export const dnsLogValidationSchema = yup.object().shape({
  log_data: yup.string().required(),
  organization_id: yup.string().nullable().required(),
});
