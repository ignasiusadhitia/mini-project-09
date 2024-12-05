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

export default function Confirmation({
  id,
  mutateKey,
  actionHandler,
  entityName,
  customLabel,
  customTitle,
  customDescription,
  confirmButtonText,
}) {
  const { token } = useSelector((state) => state.auth);

  const handleAction = async () => {
    try {
      const response = await actionHandler(token, id);
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
          {customLabel || 'Take Action'}
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {customTitle ||
              `Are you sure you want to proceed with this action on the ${entityName}?`}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {customDescription ||
              `This action cannot be undone. It will affect the ${entityName} and its related data.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleAction}>
            {confirmButtonText || 'Confirm'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

Confirmation.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  mutateKey: PropTypes.string.isRequired,
  actionHandler: PropTypes.func.isRequired,
  entityName: PropTypes.string.isRequired,
  customLabel: PropTypes.string,
  customTitle: PropTypes.string,
  customDescription: PropTypes.string,
  confirmButtonText: PropTypes.string,
};
