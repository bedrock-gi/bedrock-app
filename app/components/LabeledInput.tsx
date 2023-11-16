interface Props {
  id: string;

  name: string;
  label: string;
  required: boolean;
}
const LabelledInput = ({ id, name, label, required }: Props) => {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block font-semibold">
        {label}
      </label>
      <input
        type="text"
        id={id}
        name={name}
        className="input input-bordered"
        required={required}
      />
    </div>
  );
};

export default LabelledInput;
