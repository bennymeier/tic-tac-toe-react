export interface Field {
  id: string;
  selected: string;
  value: string;
}

export interface FieldProps {
  field: Field;
  onClick: (field: Field) => void;
}

const FieldComponent: React.FC<FieldProps> = (props) => {
  const { field, onClick } = props;
  const { id, selected, value } = field;
  return (
    <div
      className="field"
      data-field={id}
      data-selected={selected}
      data-value={value}
      key={id}
      onClick={() => onClick(field)}
    >
      {field.value}
    </div>
  );
};

export default FieldComponent;
