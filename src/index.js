/* eslint-disable */
import { EMAI, EMAIL } from "./constants";

function EmailInput(
  element,
  { removeOnBackspace = true, inputTags = [] } = {},
  { onRemoveItem, onAddItem, subscribe } = {}
) {
  if (!element) {
    throw new TypeError("element need to an dom element");
  }

  let shouldDelete = false;

  element.classList.add("input-wrapper");

  const tags = document.createElement("div");

  tags.classList.add("flex-items");

  element.onclick = () => {
    input.focus();
  };

  tags.onclick = () => {
    input.focus();
  };

  const input = document.createElement("input");
  input.placeholder = "Add more people..."

  element.appendChild(tags);
  element.appendChild(input);

  function removeItem(index) {
    inputTags.splice(index, 1);
    renderTags();
    onRemoveItem && onRemoveItem(index);
    subscribe && subscribe(inputTags)
  }

  function renderTags() {
    // loop throught the input tags.
    inputTags.forEach((inputTag, index) => {
      // If already tag exists in the dom then check that dom. have the same content if not render it with the updated tag.
      if (tags.children[index]) {
        const spanChildren = tags.children[index].firstChild;
        if (spanChildren.innerText !== inputTag) {
          spanChildren.innerText = inputTag;
        }
        return;
      }

      // if required to create new element then create one dom element.
      // /div.tag-chip
      //    /span
      //    /button

      const tagContainer = document.createElement("div");

      tagContainer.classList.add("tag-chip");

      const title = document.createElement("span");

      if (EMAIL.test(inputTag)) {
        title.innerText = inputTag;
      } else {
        title.innerText = inputTag //TODO: show invalid email
      }

      const removeButton = document.createElement("button");
      removeButton.innerText = "X";
      removeButton.title = "Remove item";
      removeButton.onclick = () => {
        removeItem(index);
      };

      tagContainer.appendChild(title);
      tagContainer.appendChild(removeButton);

      tags.appendChild(tagContainer);
    });

    if (inputTags.length && shouldDelete && tags.lastChild) {
      tags.lastChild.classList.add("confirm-to-delete-item");
    } else if (tags.lastChild) {
      tags.lastChild.classList.remove("confirm-to-delete-item");
    }

    // remove item which have no inputTags
    for (let i = inputTags.length; i < tags.children.length; i++) {
      tags.removeChild(tags.children[i]);
    }
  }

  function addItem(content) {
    inputTags.push(content);
    renderTags();
    onAddItem && onAddItem(content);
    subscribe && subscribe(inputTags)
  }

  function confirmLastItemToDelete() {
    shouldDelete = true;
  }

  input.onkeyup = (e) => {
    const { target, keyCode } = e;
    // remove the last item if the textbox container nothing.
    // so when the there are tags and textbox contain nothing
    // and if you press backspace then it will remove the last item.
    if (keyCode === 8 && target.value === "" && removeOnBackspace) {
      if (!shouldDelete) {
        shouldDelete = true;
        renderTags();
      } else {
        inputTags.pop();
        shouldDelete = false;
        renderTags();
        subscribe && subscribe(inputTags)
      }
    }
    // when you press enter add item and render it
    else if ((keyCode === 13 && target.value !== "") || (keyCode === 188 && target.value !== "")) {
      const value = keyCode === 188 ? target.value.slice(0, -1) : target.value
      addItem(value);
      target.value = "";
      if (shouldDelete !== false) {
        shouldDelete = false;
        renderTags();
      }
    } else {
      shouldDelete = false;
      renderTags();
    }
  };

  renderTags();

  return {
    removeItem,
    addItem,
    getValue() {
      return inputTags.reduce((acc, cur) => {
        if (EMAIL.test(cur)) {
          acc.valid++
        } else {
          acc.invalid++
        }
        return acc
      }, { valid: 0, invalid: 0 });
    },
    setValue(tags) {
      if (!Array.isArray(tags)) {
        throw new TypeError("tags should be array");
      }

      inputTags = tags;
      renderTags();
    }
  };
}


export default EmailInput