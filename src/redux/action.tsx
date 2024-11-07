
export const ThemeChanger = (value: any) => async (dispatch: any) => {
  dispatch({
    type: "ThemeChanger",
    payload: value
  });
};

export const AddToCart = (id: number) => async (dispatch: any) => {
  dispatch({
    type: "ADD_TO_CART",
    payload: id
  });
};
export const ProductReduxData = (id: number) => async (dispatch: any) => {
  dispatch({
    type: "PRODUCT",
    payload: id
  });
};
