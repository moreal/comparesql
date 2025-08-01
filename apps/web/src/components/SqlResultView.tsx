export function SqlResultView(
  props: { result: string },
) {
  return (
    <span
      style={{
        "white-space": "pre-wrap",
      }}
    >
      {props.result}
    </span>
  );
}
