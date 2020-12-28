import FieldComponent, { Field } from "./Field";

export interface FieldContainerProps {
  fields: Field[];
  gameFinished: boolean;
  onClick: (field: Field) => void;
}

const FieldContainer: React.FC<FieldContainerProps> = (props) => {
  const { gameFinished, fields, onClick } = props;
  return (
    <section className={`board ${gameFinished ? "disabled" : ""}`}>
      {fields.map((field) => {
        return (
          <FieldComponent field={field} onClick={onClick} key={field.id} />
        );
      })}
    </section>
  );
};

export default FieldContainer;
