/* eslint-disable */
import EmailInput from '../../src';


function randomEmail() {
  var result = '';
  var characters = 'abcdefghijklmnopqrstuvwxyz';
  var charactersLength = characters.length;
  for (var i = 0; i < 7; i++) {
    result += characters.charAt(Math.floor(Math.random() *
      charactersLength));
  }
  return `${result}@abc.com`;
}

document.addEventListener('DOMContentLoaded', function () {

  const container = document.querySelector('#email-inputs')

  const { addItem, getValue, setValue } = EmailInput(container, {
    inputTags: Array.from({ length: 2 }).map(
      (_, index) => "hello world " + (index + 1)
    ),
    removeOnBackspace: true
  }, {
    onRemoveItem: () => null, onAddItem: () => null, subscribe: (emails) => console.log(emails)
  });

  const addEmailBtn = document.querySelector('#add-email')
  const getEmailsCount = document.querySelector('#get-emails-count')

  addEmailBtn.onclick = () => {
    addItem(randomEmail())
  }

  getEmailsCount.onclick = () => {
    alert(`Valid: ${getValue().valid} Invalid: ${getValue().invalid}`)
  }

  //setValue(["email1, email2"])
});
