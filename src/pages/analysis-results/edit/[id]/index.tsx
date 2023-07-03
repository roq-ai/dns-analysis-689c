import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
  Center,
} from '@chakra-ui/react';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useFormik, FormikHelpers } from 'formik';
import { getAnalysisResultById, updateAnalysisResultById } from 'apiSdk/analysis-results';
import { Error } from 'components/error';
import { analysisResultValidationSchema } from 'validationSchema/analysis-results';
import { AnalysisResultInterface } from 'interfaces/analysis-result';
import useSWR from 'swr';
import { useRouter } from 'next/router';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { DnsLogInterface } from 'interfaces/dns-log';
import { getDnsLogs } from 'apiSdk/dns-logs';

function AnalysisResultEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const { data, error, isLoading, mutate } = useSWR<AnalysisResultInterface>(
    () => (id ? `/analysis-results/${id}` : null),
    () => getAnalysisResultById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: AnalysisResultInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateAnalysisResultById(id, values);
      mutate(updated);
      resetForm();
      router.push('/analysis-results');
    } catch (error) {
      setFormError(error);
    }
  };

  const formik = useFormik<AnalysisResultInterface>({
    initialValues: data,
    validationSchema: analysisResultValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Edit Analysis Result
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        {formError && (
          <Box mb={4}>
            <Error error={formError} />
          </Box>
        )}
        {isLoading || (!formik.values && !error) ? (
          <Center>
            <Spinner />
          </Center>
        ) : (
          <form onSubmit={formik.handleSubmit}>
            <FormControl id="result_data" mb="4" isInvalid={!!formik.errors?.result_data}>
              <FormLabel>Result Data</FormLabel>
              <Input type="text" name="result_data" value={formik.values?.result_data} onChange={formik.handleChange} />
              {formik.errors.result_data && <FormErrorMessage>{formik.errors?.result_data}</FormErrorMessage>}
            </FormControl>
            <AsyncSelect<DnsLogInterface>
              formik={formik}
              name={'dns_log_id'}
              label={'Select Dns Log'}
              placeholder={'Select Dns Log'}
              fetcher={getDnsLogs}
              renderOption={(record) => (
                <option key={record.id} value={record.id}>
                  {record?.log_data}
                </option>
              )}
            />
            <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
              Submit
            </Button>
          </form>
        )}
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'analysis_result',
    operation: AccessOperationEnum.UPDATE,
  }),
)(AnalysisResultEditPage);
