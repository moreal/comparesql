export function SqlResultView(
  props: { result: string },
) {
  return <textarea readOnly>{props.result}</textarea>;
}
