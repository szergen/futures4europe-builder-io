import { Label, Textarea } from 'flowbite-react';

export type TextAreaComponentProps = {
  label?: string;
  placeholder?: string;
  helperText?: string;
};

export const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  label,
  placeholder,
  helperText,
}) => {
  return (
    <div className="max-w-md">
      {label && (
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Your message" />
        </div>
      )}
      <Textarea
        id="comment"
        placeholder={placeholder ? placeholder : undefined}
        required
        rows={4}
        helperText={helperText ? <>{helperText}</> : undefined}
      />
    </div>
  );
};

export default TextAreaComponent;
