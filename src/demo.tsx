import { createContext, useContext } from "react";

const ScrollToFormContext = createContext((): boolean => true);

export const ParentNode = () => {
  let formEl: HTMLFormElement | null = null;
  let containerEl: HTMLElement | null = null;
  const scrollToForm = () => {
    if (!formEl || !containerEl) return false;
    const { offsetTop, offsetLeft } = formEl;
    containerEl.scrollTo(offsetLeft, offsetTop);
    return true;
  };
  const style = {
    height: "150vh",
  };
  const wrapStyle = {
    height: "100vh",
    width: "100vw",
    overflow: "auto",
  };
  return (
    <div ref={(el) => (containerEl = el)} style={wrapStyle}>
      <ScrollToFormContext.Provider value={scrollToForm}>
        <form
          ref={(el) => {
            formEl = el;
          }}
        >
          form
        </form>
        <div style={style}>占位</div>
        <ChildNode></ChildNode>
      </ScrollToFormContext.Provider>
    </div>
  );
};

export const ChildNode = () => {
  return (
    <>
      <DeepChildNode></DeepChildNode>
    </>
  );
};

export const DeepChildNode = () => {
  const onClick = useContext(ScrollToFormContext);
  return <button onClick={onClick}>滚动</button>;
};
