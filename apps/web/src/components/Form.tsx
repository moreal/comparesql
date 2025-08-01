interface FormProps {
  setter: (sql: string) => void;
}

export function Form(props: FormProps) {
  let inputRef: HTMLInputElement;

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        props.setter(inputRef!.value);
      }}
    >
      <input ref={inputRef!} type="text" placeholder="Enter SQL query" />
      <button type="submit">
        Submit
      </button>
    </form>
  );
}
