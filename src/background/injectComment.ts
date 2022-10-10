export const injectComment = (message: string) => {
  const screen = document.body;
  const screenHeight = screen.offsetHeight;
  const screenWidth = screen.offsetWidth;

  const comment = document.createElement("span");

  comment.textContent = message;
  document.body.appendChild(comment);

  const letterSize = screenHeight * 0.05 * 1;
  comment.setAttribute("class", "google-meet-comment-flow");

  const footerHeight = 88;
  const topPosition = Math.floor(
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
  comment.style["color"] = "red";
  comment.style["position"] = "absolute";
  comment.style["zIndex"] = "2147483647";
  comment.style["whiteSpace"] = "nowrap";
  comment.style["lineHeight"] = "initial";

  const streamCommentUI = comment.animate(
    {
      left: `${-comment.offsetWidth}px`,
    },
    {
      duration: 6000,
      easing: "linear",
    }
  );

  // NOTE: delete data in localStorage so that same comments can be sent in a row
  streamCommentUI.ready.then(() =>
    chrome.runtime.sendMessage({ method: "deleteItem" })
  );
};
