import { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { Typography } from '@/components/commons';
import { RichTextEditor } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormProvider, useFormContext } from '@/context/FormContext';
import portfoliosServices from '@/services/portfoliosServices';

const PortfolioForm = ({ isEdit }) => {
  const [previewBanner, setPreviewBanner] = useState(null);
  const {
    values,
    setValues,
    handleChange,
    resetForm,
    getFormData,
    purify,
    isSubmitting,
    setIsSubmitting,
  } = useFormContext();
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const { id: portfolioId } = useParams();

  const {
    data: portfolio,
    // eslint-disable-next-line no-unused-vars
    error,
    // eslint-disable-next-line no-unused-vars
    isLoading,
  } = useSWR(isEdit && portfolioId ? '/portfolios' : null, () =>
    portfoliosServices.fetchPortfolioById(portfolioId)
  );

  console.log(portfolio);

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const sanitizedData = {
      banner: values.banner,
      title: purify.sanitize(values.title),
      content: purify.sanitize(values.content),
    };

    const formData = getFormData();
    Object.keys(sanitizedData).forEach((key) =>
      formData.append(key, sanitizedData[key])
    );
    try {
      if (isEdit) {
        await portfoliosServices.updatePortfolioById(
          token,
          portfolioId,
          sanitizedData
        );
      } else {
        await portfoliosServices.addPortfolio(token, sanitizedData);
      }
      resetForm();
      navigate('/dashboard/portfolios');
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPreviewBanner(URL.createObjectURL(file));
      handleChange(event);
    }
  };

  useEffect(() => {
    if (portfolio) {
      setValues({
        banner: null,
        title: portfolio?.title,
        content: portfolio?.content,
      });
    }
  }, [portfolio, setValues]);

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <Typography as="h1" variant="subHeading">
        {isEdit ? 'Edit Portfolio' : 'Add New Portfolio'}
      </Typography>
      <form onSubmit={onSubmit}>
        <div className="space-y-6">
          <FormItem>
            <Label htmlFor="banner">Banner</Label>
            {previewBanner && (
              <div>
                <img alt="Preview Banner" src={previewBanner} width="100%" />
              </div>
            )}
            <Input
              accept="image/*"
              id="banner"
              name="banner"
              type="file"
              onChange={handleFileChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter title"
              type="text"
              value={values.title || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="content">Content</Label>
            <RichTextEditor
              label="Content"
              name="content"
              value={values.content || ''}
              onChange={handleChange}
            />
          </FormItem>

          <Button
            className={`w-full ${isSubmitting ? 'animate-pulse' : ''}`}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? 'Submitting...' : isEdit ? 'Update' : 'Submit'}
          </Button>
        </div>
      </form>
    </div>
  );
};

PortfolioForm.propTypes = {
  isEdit: PropTypes.bool,
};

const PortfoliosForm = ({ isEdit = false }) => {
  return (
    <FormProvider isMultipart>
      <PortfolioForm isEdit={isEdit} />
    </FormProvider>
  );
};

PortfoliosForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default PortfoliosForm;
