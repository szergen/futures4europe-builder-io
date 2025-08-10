import { Label, Radio } from 'flowbite-react';

export type RadioButtonComponentProps = {
  groupLabel: string;
  name: string;
  labels: string[];
};

export const RadioButtonComponent: React.FC<RadioButtonComponentProps> = ({
  labels,
  name,
  groupLabel,
}) => {
  return (
    <fieldset className="flex max-w-md flex-col gap-4">
      <legend className="mb-4">{groupLabel}</legend>
      {labels.map((label, index) => (
        // eslint-disable-next-line react/jsx-key
        <div className="flex items-center gap-2">
          <Radio
            id={`${label.toLowerCase().replace(' ', '-')}`}
            name={name}
            value={label}
            defaultChecked={index === 0}
          />
          <Label htmlFor={`${label.toLowerCase().replace(' ', '-')}`}>
            {label}
          </Label>
        </div>
      ))}
    </fieldset>
  );
};

export default RadioButtonComponent;
