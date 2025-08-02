interface FormProps {
  setter: (sql: string) => void;
}

export function Form(props: FormProps) {
  let textareaRef: HTMLTextAreaElement;

  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      props.setter(textareaRef!.value);
    }
  };

  function updateValue() {
    props.setter(textareaRef!.value);
  }

  function onSubmit(e: SubmitEvent) {
    e.preventDefault();
    updateValue();
  }

  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <textarea
        ref={textareaRef!}
        rows={8}
        placeholder="Enter SQL query... (Ctrl+Enter to submit)"
        style={{
          width: "80rem",
          "max-width": "80vw",
          "font-family": "monospace",
          "font-size": "14px",
          resize: "vertical",
        }}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" onClick={() => updateValue()}>
        Submit
      </button>
    </form>
  );
}
