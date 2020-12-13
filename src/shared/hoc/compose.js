/**
 * A light weight version of compose in REDUX
 */
function compose(...HOCs) {
  return (Component) => {
    let comp = Component;

    (HOCs || []).forEach((hoc) => {
      comp = hoc(comp);
    });

    return comp;
  };
}

export default compose;
