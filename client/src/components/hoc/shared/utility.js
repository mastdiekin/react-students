export const api = "http://localhost:5000/api";

export const checkValid = (value, rules) => {
  let isValid = true;

  if (!rules) {
    return true;
  }

  // if (rules.required) {
  //   isValid = value.trim() !== "" && isValid;
  // }

  if (rules.minLength) {
    isValid = value.length >= rules.minLength && isValid;
  }

  if (rules.maxLength) {
    isValid = value.length <= rules.maxLength && isValid;
  }

  return isValid;
};

export const backLocationOrCloseModal = (props) => {
  //если это подалка по url, то нужен props.returnBack={history}
  //если это обычная модалка у которой в props есть state, то нужно ее закрыть:
  // close = () => {
  //   this.setState({
  //     show: false,
  //   });
  // };
  return props.returnBack || !props.closed
    ? props.returnBack.goBack(
        props.returnBack.location.state.background.pathname
      )
    : props.closed();
};
