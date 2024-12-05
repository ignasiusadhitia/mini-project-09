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
import usersServices from '@/services/usersServices';

export default function DeleteConfirmation({ id, mutateKey }) {
  const { token } = useSelector((state) => state.auth);

  const handleDelete = async () => {
    try {
      const response = await usersServices.deleteUserById(token, id);
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
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
  id: PropTypes.string,
  mutateKey: PropTypes.string,
};
