import { Container } from "./sytels";

export function Tag({ title, ...rest }) {
  return <Container {...rest}>{title}</Container>;
}
