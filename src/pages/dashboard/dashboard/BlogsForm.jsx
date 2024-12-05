import { useCallback, useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import useSWR from 'swr';

import { Typography } from '@/components/commons';
import { RichTextEditor } from '@/components/dashboard';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormProvider, useFormContext } from '@/context/FormContext';
import blogsServices from '@/services/blogsServices';

const ArticleForm = ({ isEdit }) => {
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
  const { id: articleId } = useParams();

  const {
    data: article,
    // eslint-disable-next-line no-unused-vars
    error,
    // eslint-disable-next-line no-unused-vars
    isLoading,
  } = useSWR(isEdit && articleId ? '/blogs' : null, () =>
    blogsServices.fetchArticleById(token, articleId)
  );

  const handleCheckboxChange = useCallback(
    (checked) => {
      handleChange({
        target: {
          name: 'published',
          value: checked,
        },
      });
    },
    [handleChange]
  );

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    const sanitizedData = {
      banner: values.banner,
      title: purify.sanitize(values.title),
      content: purify.sanitize(values.content),
      meta_title: purify.sanitize(values.meta_title),
      meta_desc: purify.sanitize(values.meta_desc),
      published: values.published,
    };

    const formData = getFormData();
    Object.keys(sanitizedData).forEach((key) =>
      formData.append(key, sanitizedData[key])
    );
    try {
      if (isEdit) {
        await blogsServices.updateArticleById(token, articleId, sanitizedData);
      } else {
        await blogsServices.addArticle(token, sanitizedData);
      }
      resetForm();
      navigate('/dashboard/blogs');
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
    if (article) {
      setValues({
        banner: null,
        title: article?.data.title,
        content: article?.data.content,
        meta_title: article?.data.meta_title,
        meta_desc: article?.data.meta_desc,
        published: article?.data.published,
      });
    }
  }, [article, setValues]);

  return (
    <div className="mx-auto w-full max-w-lg p-4">
      <Typography as="h1" variant="subHeading">
        {isEdit ? 'Edit Article' : 'Add New Article'}
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

          <FormItem>
            <Label htmlFor="meta_title">Meta Title for SEO</Label>
            <Input
              id="meta_title"
              name="meta_title"
              placeholder="Enter meta title"
              type="text"
              value={values.meta_title || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <Label htmlFor="meta_desc">Meta Description for SEO</Label>
            <Textarea
              id="meta_desc"
              name="meta_desc"
              placeholder="Enter meta description"
              type="text"
              value={values.meta_desc || ''}
              onChange={handleChange}
            />
          </FormItem>

          <FormItem>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={values.published || false}
                id="published"
                name="published"
                onCheckedChange={handleCheckboxChange}
              />
              <Label htmlFor="published">Published</Label>
            </div>
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

ArticleForm.propTypes = {
  isEdit: PropTypes.bool,
};

const BlogsForm = ({ isEdit = false }) => {
  return (
    <FormProvider isMultipart>
      <ArticleForm isEdit={isEdit} />
    </FormProvider>
  );
};

BlogsForm.propTypes = {
  isEdit: PropTypes.bool,
};

export default BlogsForm;
