type Props = {
  title: string;
  field?: React.ReactNode;
};

function FieldSection({ title, field }: Props) {
  return (
    <div style={{ gridArea: title }}>
      <h3>{title.charAt(0).toUpperCase() + title.slice(1)}</h3>
      {field}
    </div>
  );
}

export default FieldSection;
