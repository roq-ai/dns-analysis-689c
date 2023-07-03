import * as yup from 'yup';

export const analysisResultValidationSchema = yup.object().shape({
  result_data: yup.string().required(),
  dns_log_id: yup.string().nullable().required(),
});
