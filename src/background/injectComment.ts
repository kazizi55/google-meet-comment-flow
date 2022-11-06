export const injectComment = async (message: string) => {
  const screenHeight = window.innerHeight;
  const screenWidth = window.innerWidth;

  const comment = document.createElement("span");

  comment.textContent = message;

  // NOTE: google slide full screen mode element
  const gSlideContentNode = document.querySelector(
    "body > div.punch-full-screen-element.punch-full-window-overlay"
  );

  /*
  NOTE: When the focused tab is on google slide full screen mode,
        target node is the specific div, whose z-index is max value
        as the same as the value of streamed comments

  SEE: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
  */
  const targetNode = gSlideContentNode || document.body;

  targetNode.appendChild(comment);

  const storedFontSizeMessage = await chrome.runtime.sendMessage({
    method: "getFontSize",
  });

  const letterSizeCoefficient = () => {
    switch (storedFontSizeMessage) {
      case "XS":
        return 0.25;
      case "S":
        return 0.5;
      case "M":
        return 1;
      case "L":
        return 2;
      case "XL":
        return 4;
      default:
        return 1;
    }
  };

  const letterSize = screenHeight * 0.05 * letterSizeCoefficient();
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

  const storedColorMessage = await chrome.runtime.sendMessage({
    method: "getColor",
  });

  comment.style["left"] = commentStyle["left"];
  comment.style["top"] = commentStyle["top"];
  comment.style["fontSize"] = commentStyle["fontSize"];

  comment.style["color"] = storedColorMessage || "black";

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
    chrome.runtime.sendMessage({ method: "deleteComment" })
  );

  streamCommentUI.onfinish = () => {
    targetNode.removeChild(comment);
  };
};
