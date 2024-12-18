import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { mutate } from 'swr';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export default function DeleteConfirmation({
  id,
  mutateKey,
  deleteHandler,
  entityName,
  customDescription,
}) {
  const { token } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      const response = await deleteHandler(token, id);
      mutate(mutateKey);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          Delete
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you absolutely sure you want to delete this {entityName}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {customDescription ||
              `This action cannot be undone. This will permanently delete the ${entityName} and remove its data from our servers.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

DeleteConfirmation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mutateKey: PropTypes.string.isRequired,
  deleteHandler: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  customDescription: PropTypes.string,
};
