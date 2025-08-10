import { Label, Select } from 'flowbite-react';

export type SelectComponentProps = {};

export const SelectComponent: React.FC<SelectComponentProps> = () => {
  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="countries" value="Select your country" />
      </div>
      <Select id="countries" required>
        <option>United States</option>
        <option>Canada</option>
        <option>France</option>
        <option>Germany</option>
      </Select>
    </div>
  );
};

export default SelectComponent;
