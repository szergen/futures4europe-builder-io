import { Checkbox, Label } from 'flowbite-react';

export type CheckboxComponentProps = {
  id: string;
  defaultChecked?: boolean;
  label?: string;
  onChangeHandler?: (checked: boolean) => void;
  classNames?: string;
  checked?: boolean;
};

export const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  defaultChecked,
  label,
  onChangeHandler,
  classNames,
  checked,
}) => {
  return (
    <div className="flex max-w-md flex-col gap-4" id="checkbox">
      <div className="flex items-center gap-2">
        <Checkbox
          id="accept"
          defaultChecked={defaultChecked}
          onChange={(e) => {
            onChangeHandler && onChangeHandler(e.target.checked);
          }}
          className={classNames}
          checked={checked}
        />
        {label && (
          <Label htmlFor="accept" className="flex">
            {label}
          </Label>
        )}
      </div>
    </div>
  );
};

export default CheckboxComponent;
