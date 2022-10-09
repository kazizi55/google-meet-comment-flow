// const choomameRoot = document.createElement("div");
// choomameRoot.id = "choomameRoot";
// choomameRoot.style.zIndex = "999";
// choomameRoot.style.position = "fixed";
// choomameRoot.style.top = "0";
// choomameRoot.style.left = "0";

// document.body.appendChild(choomameRoot);

// const root = createRoot(choomameRoot);
// root.render(
//   <Provider store={store}>
//     <ChakraProvider resetCSS={false} theme={theme}>
//       <App />
//     </ChakraProvider>
//   </Provider>
// );

// FIXME
export {};

// NOTE: elements
let prevThread: any;

const CLASS_OBJ = {
  thread: "z38b6",
  messages: "oIy2qc",
};

let observer = new MutationObserver((records) => {
  try {
    const thread = document.getElementsByClassName(CLASS_OBJ.thread)[0];

    if (prevThread != undefined && thread.isEqualNode(prevThread)) return;
    if (thread.getElementsByClassName("gYckH").length == 1) return;

    prevThread = thread.cloneNode(true);
    const messages = thread.getElementsByClassName(CLASS_OBJ.messages);
    const message = messages[messages.length - 1].innerHTML;

    // FIXME: スクリーンオブジェクトでかい‥。
    let screen = document.body;
    let screenHeight = screen.offsetHeight;
    let screenWidth = screen.offsetWidth;

    let comment = document.createElement("span");

    // let { msg, size, color } = getMessages(message);
    comment.textContent = message;
    document.getElementsByTagName("body")[0].appendChild(comment);

    let letterSize = screenHeight * 0.05 * 1;
    comment.setAttribute("class", "comment");

    const footerHeight = 88;
    let topPosition = Math.floor(
      (screenHeight - letterSize - footerHeight) * Math.random()
    );
    const commentStyle = {
      left: `${screenWidth}px`,
      top: `${topPosition}px`,
      fontSize: `${letterSize}px`,
    };

    comment.style["left"] = commentStyle["left"];
    comment.style["top"] = commentStyle["top"];
    comment.style["fontSize"] = commentStyle["fontSize"];
    comment.style["color"] = "white";
    comment.style["position"] = "absolute";
    comment.style["zIndex"] = "2147483647";
    comment.style["whiteSpace"] = "nowrap";
    comment.style["lineHeight"] = "initial";

    comment.animate(
      {
        left: `${-comment.offsetWidth}px`,
      },
      {
        duration: 6000,
        easing: "linear",
      }
    );
  } catch (e) {
    return;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  let elem = document.body;

  const OBSERVE_CONFIG = {
    attributes: true,
    subtree: true,
    childList: true,
    characterData: true,
  };

  observer.observe(elem, OBSERVE_CONFIG);
});
